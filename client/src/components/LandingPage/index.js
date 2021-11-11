import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

function landingPage() {
  return (
    <div className={styles.bk}>
      <div className={styles.contain}>
      <span className={styles.title}>
        <h1> Bienvenido </h1>
      </span>
      <span>
        <Link to="/home">
          <button className={styles.btn}> Ingresar </button>
        </Link>
      </span>
      </div>
    </div>
  );
}

export default landingPage;
