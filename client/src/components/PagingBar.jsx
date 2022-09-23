import React from "react";
import s from './styles/Paging.module.css'

export default class PagingBar extends React.Component{
    render(){
        const {totalRecipes, recipesPerPage, handlePage} = this.props
        const bar = [];
        for(let i = 1; i <= Math.ceil(totalRecipes/recipesPerPage); i++){
            bar.push(i)
        };
    return(
        <ul className={s.list}>
            {bar && bar.map(e => (
                <li key = {e} className={s.element}>
                    <button className={s.btn} onClick={() => handlePage(e)}>{e}</button>
                </li>
            ))}
        </ul>
    )
}}