import React from "react";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import Category from "../../components/Category";
import Product from "../../components/Product";
import Footer from "../../components/Footer";

function Landing() {
  return (
    <>
      <Layout>
        <Hero />
        <Category />
        <Product />
        <Footer />
      </Layout>
    </>
  );
}

export default Landing;
