import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Category from "./components/Category/Category";
import Product from "./components/Product/Product";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Category />
      <Product />
      <Footer />
    </>
  );
}

export default App;
