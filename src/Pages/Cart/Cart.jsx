import React from "react";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import styles from "./cart.module.css";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <Layout>
      <div className={styles.cartWrapper}>
        <h2>Your Cart</h2>
        <nav>
          <Link to="/" style={{ color: "#007185", marginRight: "16px" }}>
            Home
          </Link>
          <Link to="/orders" style={{ color: "#007185", marginRight: "16px" }}>
            Orders
          </Link>
          <Link to="/auth/signin" style={{ color: "#007185" }}>
            Sign In
          </Link>
        </nav>
        {/* Cart items and summary here */}
      </div>
      <Footer />
    </Layout>
  );
};

export default Cart;
