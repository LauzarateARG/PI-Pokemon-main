import React from 'react'
import img from "../../assets/img"
import style from "./style.module.css"

export default function index() {
    return (
        <div className={style.loading}>
            <img  src={img.gifLoading} />
        </div>
    )
}
