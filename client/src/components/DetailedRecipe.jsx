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
                    <Link to='/home'><button className={s.back}>Go Back!</button></Link>
                    <div className={s.container}>
                        <h2 className={s.title}>{title}</h2>
                        <p className={s.combotitle}>Summary:</p>
                        <div className={s.fix}>
                        <p className={s.combocont}>{summary}</p>
                        <img className={s.img} alt={title} src={image} width="356px" height="237px"/>
                        </div>
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
                        {!steps && (<p className={s.combocont}>"Not Provided"</p>)}
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
    

