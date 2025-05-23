import React from "react";
import styles from "./cart.module.css";

const Cart = () => {
  return (
    <div className={styles.cartWrapper}>
      <h2>Your Cart</h2>
      {/* Cart items and summary here */}
    </div>
  );
};

export default Cart;
