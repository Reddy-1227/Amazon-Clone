import React from "react";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import styles from "./auth.module.css";

const Signin = () => {
  return (
    <Layout>
      <div className={styles.authWrapper}>
        <h2>Sign In</h2>
        {/* Add your styled form here */}
      </div>
      <Footer />
    </Layout>
  );
};

export default Signin;
