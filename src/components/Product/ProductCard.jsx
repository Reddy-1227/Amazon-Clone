import React from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import PriceFormat from "./PriceFormat";
import styles from "./productCard.module.css";

const ProductCard = ({ product }) => {
  const { id, image, title, category, rating = {}, price } = product;
  const reviews = rating.count || 0;
  const rate = rating.rate || 0;
  const oldPrice = price * 1.7;
  const discount = "60% OFF";
  const displayTitle = title.length > 50 ? title.slice(0, 50) + "..." : title;

  return (
    <div className={styles.card}>
      <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
        <div className={styles.imgWrapper}>
          <img src={image} alt={title} className={styles.img} />
          <button className={styles.viewBtn}>View product</button>
          <button className={styles.addToCartBtn}>
            <span className={styles.cartIcon}>🛒</span> Add to cart
          </button>
        </div>
      </Link>
      <div className={styles.info}>
        <h3 className={styles.title}>{displayTitle}</h3>
        <div className={styles.category}>{category}</div>
        <div className={styles.ratingRow}>
          <Rating value={rate} precision={0.1} readOnly size="small" />
          <span className={styles.ratingValue}>{rate}</span>
          <span className={styles.reviewsSmall}>({reviews} reviews)</span>
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
      </div>
    </div>
  );
};

export default ProductCard;
