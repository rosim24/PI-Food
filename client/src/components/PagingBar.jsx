import React from "react";

export default class PagingBar extends React.Component{
    render(){
        const {totalRecipes, recipesPerPage, handlePage} = this.props
        const bar = [];
        for(let i = 1; i <= Math.ceil(totalRecipes/recipesPerPage); i++){
            bar.push(i)
        };
    return(
        <ul>
            {bar && bar.map(e => (
                <li key = {e}>
                    <button onClick={() => handlePage(e)}>{e}</button>
                </li>
            ))}
        </ul>
    )
}}