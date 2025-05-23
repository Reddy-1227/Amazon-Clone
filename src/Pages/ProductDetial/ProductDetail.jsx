import React from "react";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import styles from "./productdetail.module.css";

const ProductDetail = () => {
  return (
    <Layout>
      <div className={styles.productDetailWrapper}>
        <h2>Product Detail</h2>
        {/* Product details here */}
      </div>
      <Footer />
    </Layout>
  );
};

export default ProductDetail;
