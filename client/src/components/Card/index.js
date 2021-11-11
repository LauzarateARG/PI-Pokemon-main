import React from "react";
import style from "./style.module.css";

export default function Card({name,img,type,createInDB}){
    return (
    <div className={style.card}>
        <h3>{name}</h3>
        <img className={createInDB ? style.imgDb: style.img} src={img} alt="img not found"/>
        <h4>{ type } </h4>
    </div>
    )
}