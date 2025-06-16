import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "./orders.module.css";
import orderNowGif from "../../assets/Images/order-now.gif";
import { db } from "../../Utility/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import OrderMap from "./OrderMap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(data);
      } catch (err) {
        setOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className={styles.ordersWrapper}>
        <h2>Your Orders</h2>
        {orders.length === 0 && !loading ? (
          <div className={styles.orderNowGifWrap}>
            <img
              src={orderNowGif}
              alt="Order Now"
              className={styles.orderNowGifFull}
            />
          </div>
        ) : (
          <div className={styles.orderNowGifWrap}>
            <img
              src={orderNowGif}
              alt="Order Now"
              className={styles.orderNowGif}
            />
          </div>
        )}
        <div className={styles.ordersList}>
          <div className={styles.orderMap}>
            <OrderMap address={null} />
          </div>
          {loading ? (
            <div style={{ textAlign: "center", color: "#888", marginTop: 24 }}>
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: "center", color: "#888", marginTop: 24 }}>
              No orders found.
            </div>
          ) : (
            orders.map((order) => (
              <div className={styles.orderCard} key={order.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <b>Order ID:</b> {order.id}
                  </div>
                  <div style={{ fontSize: 13, color: "#888" }}>
                    {order.createdAt && order.createdAt.seconds
                      ? new Date(
                          order.createdAt.seconds * 1000
                        ).toLocaleString()
                      : ""}
                  </div>
                </div>
                <div style={{ margin: "8px 0 4px 0" }}>
                  <b>Status:</b> {order.status || "Processing"}
                </div>
                <div style={{ margin: "8px 0 4px 0" }}>
                  <b>Shipping:</b> {order.shippingDetails?.name},{" "}
                  {order.shippingDetails?.address},{" "}
                  {order.shippingDetails?.country},{" "}
                  {order.shippingDetails?.pincode},{" "}
                  {order.shippingDetails?.contact}
                </div>
                <div style={{ margin: "8px 0 4px 0" }}>
                  <b>Items:</b>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {order.cart?.map((item, idx) => (
                      <li key={idx}>
                        {item.title} x {item.quantity} ($
                        {(item.price * item.quantity).toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ margin: "8px 0 4px 0" }}>
                  <b>Total:</b> ${order.totalAmount?.toFixed(2) || "0.00"}
                </div>
                <div className={styles.orderMap}>
                  <OrderMap address={order.shippingDetails?.address} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
