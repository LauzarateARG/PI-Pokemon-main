import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
export default function NavBar(){
    return(
        <div className={styles.nav}>
            <div className={styles.logo}>
            <Link to="/home"> Pokemons </Link>
            </div>
            <div className={styles.link}>
            <Link to="/home/Pokemon"> Crear Pokemon </Link>
            </div>
        </div>
    )
}