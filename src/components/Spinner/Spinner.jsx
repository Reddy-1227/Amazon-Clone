import React from "react";
import spinner from "../../assets/Images/loading.gif";
import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <img src={spinner} alt="Loading..." className={styles.spinnerImg} />
    </div>
  );
}

export default Spinner;
