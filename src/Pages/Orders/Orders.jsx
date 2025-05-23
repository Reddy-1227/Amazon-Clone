import React from "react";
import Layout from "../../components/Layout";
import styles from "./orders.module.css";

const Orders = () => {
  return (
    <Layout>
      <div className={styles.ordersWrapper}>
        <h2>Your Orders</h2>
        {/* Orders list here */}
      </div>
    </Layout>
  );
};

export default Orders;
