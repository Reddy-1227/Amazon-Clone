import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import styles from "./productDetail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import productBaseURL from "../../API/endPoints";
import PriceFormat from "../../components/Product/PriceFormat";
import Spinner from "../../components/Spinner";
import Rating from "@mui/material/Rating";

const SIZES = ["S", "M", "L", "XL", "XXL"];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("XL");
  const imgRef = useRef(null);

  // Framer Motion 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Make the tilt less sensitive for a slower, smoother effect
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const handleMouseMove = (e) => {
      const rect = img.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      x.set(px * 2 - 1); // -1 to 1
      y.set(py * 2 - 1); // -1 to 1
    };
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
    img.addEventListener("mousemove", handleMouseMove);
    img.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      img.removeEventListener("mousemove", handleMouseMove);
      img.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [product, x, y]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productBaseURL}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div
          style={{
            minHeight: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div
          style={{
            minHeight: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Product not found.</p>
        </div>
      </Layout>
    );
  }

  const { image, title, category, rating = {}, price, description } = product;
  const reviews = rating.count || 0;
  const rate = rating.rate || 0;
  const oldPrice = price * 1.7;
  const discount = "60% OFF";
  const isClothing =
    (category || "").toLowerCase() === "men's clothing" ||
    (category || "").toLowerCase() === "women's clothing";

  return (
    <Layout>
      <div
        className={
          product ? `${styles.detailWrapper} animate` : styles.detailWrapper
        }
      >
        <div className={styles.imgSection}>
          <motion.img
            ref={imgRef}
            src={image}
            alt={title}
            className={
              product?.image
                ? `${styles.productImg} img-style`
                : styles.productImg
            }
            style={{
              rotateX,
              rotateY,
              transition: "box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              boxShadow: "0 8px 32px rgba(20,40,80,0.12)",
            }}
            draggable={true}
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.title}>{title}</div>
          <div className={styles.category}>{category}</div>
          <div className={styles.ratingRow}>
            <Rating value={rate} precision={0.1} readOnly size="medium" />
            <span className={styles.ratingValue}>{rate}</span>
            <span className={styles.reviews}>({reviews} reviews)</span>
          </div>
          <div className={styles.priceRow}>
            <span className={styles.price}>
              <PriceFormat value={price} />
            </span>
            <span className={styles.oldPrice}>
              <PriceFormat value={oldPrice} />
            </span>
            <span className={styles.discount}>{discount}</span>
          </div>
          {/* Only show size options for clothing categories */}
          {isClothing && (
            <div className={styles.sizeRow}>
              <span>Choose a size</span>
              {SIZES.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeBtn} ${
                    selectedSize === size ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          )}
          <div className={styles.actionRow}>
            <button className={styles.buyBtn}>Buy Now</button>
            <button className={styles.addBtn}>
              <span role="img" aria-label="cart">
                🛒
              </span>{" "}
              Add
            </button>
          </div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default ProductDetail;
