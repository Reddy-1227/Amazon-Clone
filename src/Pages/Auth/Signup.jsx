import React from "react";
import Layout from "../../components/Layout";
import styles from "./auth.module.css";

const Signup = () => {
  return (
    <Layout>
      <div className={styles.authWrapper}>
        <h2>Sign Up</h2>
        {/* Add your styled form here */}
      </div>
    </Layout>
  );
};

export default Signup;
