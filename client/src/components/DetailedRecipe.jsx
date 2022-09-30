import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { searchById, clearRecipe, deleteRecipe } from "../redux/actions";
import s from './styles/Detailed.module.css'

export class DetailedRecipe extends React.Component{
    componentDidMount(){
        this.props.searchById(this.props.match.params.id)
    }
    componentWillUnmount(){
        this.props.clearRecipe()
    }
    onDelete(e){
        this.props.deleteRecipe(e.target.value)
        this.props.history.push('/home')
    }
    onEdit(e){
        this.props.history.push('/create', {...this.props.recipe, id: e.target.value})
    }

    render(){
        const {title, summary, healthScore, image, diets, steps} = this.props.recipe
        const id = this.props.match.params.id
        return(
            <div className={s.disp}>
                <div className={s.header}>
                    <Link to='/home'><button className={s.back}>Go Back!</button></Link>
                    {isNaN(id) && (<div className={s.dbtn}>
                        <button value={id} className={s.db} onClick={(e) => this.onDelete(e)}>Delete</button>
                        <button value={id} className={s.db} onClick={(e) => this.onEdit(e)}>Edit</button>
                    </div>)}
                </div>
                <div className={s.container}>
                    {title ? (<h2 className={s.title}>{title}</h2>): (<h2 className={s.title}>"...Loading..."</h2>)}
                    <p className={s.combotitle}>Summary:</p>
                    <div className={s.fix}>
                    <p className={s.combocont}>{summary}</p>
                    {imange ? (<img className={s.img} alt={title} src={image} width="356px" height="237px"/>) : (<img className={s.img} alt={title} src='https://apuntococina.com/wp-content/uploads/2017/07/mise-en-place.jpg' width="356px" height="237px"/>)}
                    </div>
                    <p className={s.healthScore}>The Health Score of this Recipe is: {healthScore ? healthScore : "Not set"}</p>
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
                    {!steps && (<p className={s.noSteps}>Not Provided</p>)}
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
        clearRecipe: () => dispatch(clearRecipe()),
        deleteRecipe: id => dispatch(deleteRecipe(id)),
    }
};
    
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailedRecipe));
    

