// Orders API for Amazon Clone using Prisma
const express = require("express");
const prisma = require("./prisma/client");
const router = express.Router();

// Create a new order (called from payment endpoint, requires Firebase auth)
const { authenticateFirebaseToken } = require("./authMiddleware");
router.post("/orders", authenticateFirebaseToken, async (req, res) => {
  console.log("Order endpoint hit. Body:", req.body);
  try {
    // Clear any existing prepared statements to avoid conflicts
    await prisma.$executeRaw`DEALLOCATE ALL;`;

    // userId is now taken from the verified Firebase token
    const firebaseUid = req.firebaseUid;
    const {
      totalAmount,
      paymentStatus,
      shippingDetails,
      items,
      email,
      name,
      discount,
      subTotal,
      promoCode,
    } = req.body;
    if (!firebaseUid || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Missing required order data." });
    }

    // Ensure user exists in DB, create if not
    let user = await prisma.user.findUnique({
      where: { firebaseUid: firebaseUid },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: firebaseUid,
          email: email || `${firebaseUid}@unknown.com`,
          name: name || null,
          password: "firebase_auth", // Required field
        },
      });
    }
    // Store shippingDetails as JSON string in address field
    const order = await prisma.order.create({
      data: {
        userId: user.id, // using the generated UUID, not the Firebase UID
        total: totalAmount,
        status: paymentStatus,
        address: shippingDetails ? JSON.stringify(shippingDetails) : "",
        discount: discount ?? 0,
        subTotal: subTotal ?? 0,
        promoCode: promoCode ?? "",
        items: {
          create: items.map((item) => ({
            productId: String(item.productId),
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image || null,
          })),
        },
      },
      include: { items: true },
    });
    res.status(201).json(order);
  } catch (err) {
    console.error("[ORDER CREATE ERROR]", err);
    res
      .status(500)
      .json({ error: "Failed to create order", details: err.message });
  }
});

// Get all orders for the authenticated user
router.get("/orders", authenticateFirebaseToken, async (req, res) => {
  try {
    const firebaseUid = req.firebaseUid;

    // Find user by Firebase UID first
    const user = await prisma.user.findUnique({ where: { firebaseUid } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (err) {
    console.error("[ORDER FETCH ERROR]", err);
    res
      .status(500)
      .json({ error: "Failed to fetch orders", details: err.message });
  }
});

module.exports = router;
