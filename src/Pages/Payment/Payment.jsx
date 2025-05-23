import React from "react";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import styles from "./payment.module.css";

const Payment = () => {
  return (
    <Layout>
      <div className={styles.paymentWrapper}>
        <h2>Payment</h2>
        {/* Payment form and summary here */}
      </div>
      <Footer />
    </Layout>
  );
};

export default Payment;
