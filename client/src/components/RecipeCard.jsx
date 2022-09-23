import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import s from './styles/Recipe.module.css'

export default class RecipeCard extends React.Component{  
    render(){
        const {id, title, healthScore, image, diets} = this.props.recipe
        return(
            <div className={s.container}>
            <Link to={`/recipe/${id}`} className={s.link}>
            <div className={s.titlecontainer}>
                <label className={s.title}>{title}</label>
                <label className={s.scorecontainer}>
                    <img src="https://static.vecteezy.com/system/resources/previews/000/632/290/non_2x/star-icon-symbol-sign-vector.jpg" className={s.img}/>
                    <label className={s.score}> {healthScore} </label>
                </label>
            </div>
            <div className={s.imgcontainer}><img className={s.rcpimg} alt={title} src={image} width="312" height="231"/></div>
            <div className={s.dietcontainer}>
            {
            diets && diets.map((d, idx) =>(
                    <Fragment key={idx}>
                        <label className={s.diet}>&#10004; {d}</label>
                    </Fragment>
                ))
            }
            </div>
            </Link>
            </div>
        )
    }
}