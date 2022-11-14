import React from "react";
import s from './styles/Paging.module.css'

export default class PagingBar extends React.Component{
    render(){
        const {totalRecipes, recipesPerPage, currentPage, handlePage, handlePrev, handleNext} = this.props
        const bar = [];
        for(let i = 1; i <= Math.ceil(totalRecipes/recipesPerPage); i++){
            bar.push(i)
        };
    return(
        <ul className={s.list}>
            <button className={s.btn} onClick={() => handlePrev()}>&#5130;</button>
            {bar && bar.map(e => (
                <li key = {e} className={s.element}>
                    <button className={e === currentPage ? s.current : s.btn} onClick={() => handlePage(e)}>{e}</button>
                </li>
            ))}
            <button className={s.btn} onClick={() => handleNext()}>&#5125;</button>
        </ul>
    )
}}