import React from "react";
import styles from "./category.module.css";

const CategoryCard = ({ title, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{title}</div>
      <img src={image} alt={title} className={styles.cardImage} />
    </div>
  );
};

export default CategoryCard;
