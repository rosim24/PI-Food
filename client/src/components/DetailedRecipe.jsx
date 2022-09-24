import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { searchById } from "../redux/actions";
import s from './styles/Detailed.module.css'

export class DetailedRecipe extends React.Component{
    componentDidMount(){
        this.props.searchById(this.props.match.params.id)
    }    
    render(){
        const {title, summary, healthScore, image, diets, steps} = this.props.recipe
        return(
            <div className={s.disp}>
                <div className={s.bar}><Link to='/home'><button className={s.back}>Go Back!</button></Link><img className={s.img} src={image} width="111px" height="82px"/></div>
                <div className={s.container}>
                    <h2 className={s.title}>{title}</h2>
                    <p className={s.combotitle}>Summary:</p>
                    <p className={s.combocont}>{summary}</p>
                    <p className={s.healthScore}>The Health Score of this Recipe is: {healthScore ? healthScore : "not set"}</p>
                    <p className={s.combotitle}>This Recipe works for:</p>
                    <div className={s.diets}>
                    {
                        diets && diets.map((d, idx) =>(
                            <Fragment key={idx}>
                                <label>&#9829; {d}</label>
                            </Fragment>
                        ))
                    }
                    </div>
                    <p className={s.combotitle}>Let's do it! Follow these steps:</p>
                    <ol className={s.steps}>
                    {
                    steps && steps.map((s, idx) =>(
                        <Fragment key={idx}>
                            <li>{s}</li>
                        </Fragment>
                    ))
                    }
                    </ol>
                </div>
            </div>
        )
    }   
};

const mapStateToProps = (state) => {
    return {
        recipe: state.recipe,
    }
};
    
const mapDispatchToProps = (dispatch) => {
    return {
        searchById: id => dispatch(searchById(id)),
    }
};
    
export default connect(mapStateToProps, mapDispatchToProps)(DetailedRecipe);
    

