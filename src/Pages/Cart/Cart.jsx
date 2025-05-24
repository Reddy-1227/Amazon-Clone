import React from "react";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import styles from "./cart.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../components/DataProvider/DataProvider";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 0;
  const tax = subTotal > 0 ? Math.round(subTotal * 0.05 * 100) / 100 : 0;
  const total = subTotal + delivery + tax;

  return (
    <Layout>
      <div className={styles.cartPageGrid}>
        {/* Left: Cart Items */}
        <div className={styles.cartItemsSection}>
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <div className={styles.emptyCartMsg}>Your cart is empty.</div>
          ) : (
            cart.map((item) => (
              <div className={styles.cartItemCard} key={item.id}>
                <div className={styles.cartItemImgWrap}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.cartItemImg}
                  />
                </div>
                <div className={styles.cartItemInfo}>
                  <div className={styles.cartItemTitle}>{item.title}</div>
                  <div className={styles.cartItemPrice}>${item.price}</div>
                  {item.size && (
                    <div className={styles.cartItemSize}>Size: {item.size}</div>
                  )}
                  <div className={styles.cartItemActions}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() =>
                        dispatch({
                          type: "INCREASE_CART_ITEM",
                          payload: item.id,
                        })
                      }
                    >
                      +
                    </button>
                    <span className={styles.cartItemQty}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() =>
                        item.quantity > 1
                          ? dispatch({
                              type: "DECREASE_CART_ITEM",
                              payload: item.id,
                            })
                          : dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item.id,
                            })
                      }
                    >
                      -
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                      }
                      aria-label="Delete item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginLeft: "auto",
                      }}
                    >
                      <FaTrashAlt size={18} color="#e53935" />
                      <span style={{ color: "#e53935", fontWeight: 500 }}>
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Right: Summary */}
        <div className={styles.cartSummarySection}>
          <div className={styles.cartPromoBanner}>
            <span>
              Congrats! You're eligible for <b>Free Delivery</b>.<br />
              Use code <b>TESFAMICHAEL12</b> for 22% discount.
            </span>
          </div>
          <hr className={styles.cartDivider} />
          <div className={styles.cartPromoInputRow}>
            <input className={styles.cartPromoInput} placeholder="Promocode" />
            <button className={styles.cartPromoBtn}>Apply</button>
          </div>
          <div className={`${styles.cartSummaryRow} ${styles.subtotal}`}>
            <span>Sub-Total</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className={styles.cartSummaryRow}>
            <span>Delivery</span>
            <span>${delivery.toFixed(2)}</span>
          </div>
          <div className={styles.cartSummaryRow}>
            <span>Tax</span>
            <span>(5%) + ${tax.toFixed(2)}</span>
          </div>
          <hr className={styles.cartDivider} />
          <div className={styles.cartSummaryTotalRow}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className={styles.cartCheckoutBtn}>Proceed to Payment</button>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Cart;
