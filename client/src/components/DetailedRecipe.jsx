import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { searchById } from "../redux/actions";

export class DetailedRecipe extends React.Component{
    componentDidMount(){
        this.props.searchById(this.props.match.params.id)
    }    
    render(){
        const {title, summary, healthScore, image, diets, steps} = this.props.recipe
        return(
            <Fragment>
                <Link to='/home'><button>Go Back!</button></Link>
                <h2>{title}</h2>
                <p>Summary:</p>
                <p>{summary}</p>
                <p>The Health Score of this Recipe is: {healthScore}</p>
                <p>This Recipe works for:</p>
                <div>
                {
                    diets && diets.map((d, idx) =>(
                        <Fragment key={idx}>
                            <label>{d}</label>
                        </Fragment>
                    ))
                }
                </div>
                <p>Let's do it! Follow these steps:</p>
                <ol>
                {
                steps && steps.map((s, idx) =>(
                    <Fragment key={idx}>
                        <li>{s}</li>
                    </Fragment>
                ))
                }
                </ol>                
            </Fragment>
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
    

