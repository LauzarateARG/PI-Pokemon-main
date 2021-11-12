import React from "react";
import style from "./style.module.css";

export default function Card({ name, img, type, createInDB }) {
  return (
    <div className={style.card}>
      <div className={style.title}>
        <h3>{name}</h3>
      </div>
      <div className={style.imgCon}>
        <img
          className={createInDB ? style.imgDb : style.img}
          src={img}
          alt="img not found"
        />
      </div>
      <div className={style.types}>
        <h4>
          {createInDB
            ? type.map((el) => el.name + " ")
            : type.map((el) => " " + el + " ")}{" "}
        </h4>
      </div>
    </div>
  );
}
