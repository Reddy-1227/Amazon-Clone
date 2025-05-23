import React from "react";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import styles from "./results.module.css";

const Results = () => {
  return (
    <Layout>
      <div className={styles.resultsWrapper}>
        <h2>Results</h2>
        {/* Search results here */}
      </div>
      <Footer />
    </Layout>
  );
};

export default Results;
