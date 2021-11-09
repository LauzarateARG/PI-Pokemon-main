import React from "react";

export default function Card({name,img,type}){
    return (
    <div>
        <h3>{name}</h3>
        <img src={img} alt="img not found"/>
        <h4>{type}</h4>
    </div>
    )
}