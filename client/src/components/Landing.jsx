import React from "react";
import { Link } from "react-router-dom";
import s from './styles/Landing.module.css'

export default function Landing(){
    return (
        <div className={s.land}>
            <div className={s.box}>
            <h1 className={s.title}>FOOD-ish</h1>
            <h3 className={s.info}>Share with everyone your favorite recipe and find thousands of ideas for all your meals</h3>
            <Link to='/home'>
                <button className={s.button}>Let's cook</button>
            </Link>
            </div>
        </div>
    )
}