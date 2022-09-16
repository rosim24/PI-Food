import React, { Fragment } from "react";
import { Link } from 'react-router-dom';

export default class RecipeCard extends React.Component{  
    render(){
        const {id, title, healthScore, image, diets} = this.props.recipe
        return(
            <Fragment>
            <Link to={`/recipes/${id    }`}>
            <p>{title}</p>
            <p> {healthScore} </p>
            <img alt="recipe" src={image}/>
            {
            diets && diets.map((d, idx) =>(
                    <Fragment key={idx}>
                        <img alt="icon" src="https://w7.pngwing.com/pngs/651/254/png-transparent-dietary-supplement-computer-icons-diet-concept-others-miscellaneous-angle-food-thumbnail.png" width="15" height="15"/>
                        <label>{d}</label>
                    </Fragment>
                ))
            };
            </Link>
            </Fragment>
        )
    }
}