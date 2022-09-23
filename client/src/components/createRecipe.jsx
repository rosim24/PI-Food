import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createRecipe } from '../redux/actions';
//if (!/^(http[s]?)/.test(value))
export function validate(inputState) {
    let errors = {};
    if (!inputState.title) {
      errors.title = 'A Title is required';
    } 
    if (!inputState.summary) {
      errors.summary = 'A Summary is required';
    }
    if (inputState.healthScore > 100) {
        errors.healthScore = 'The Health Score can not be greater than 100';
    }
    if (!inputState.image) {
        errors.image = 'Use an url image to share how it looks (opcional)';
      }
    if (inputState.diets.length<1) {
        errors.image = 'You must choose at least one';
      }
  
    return errors;
  };

export default function CreateRecipe () {
    const diets = useSelector(state => state.diets);
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputState, setinputState]= useState({
        title: "",
        summary: "",
        diets: [],
        healthScore:"",
        image:"",
        steps: [],
        step:"",
    });
    const[errors, setErrors] = useState({});

    function handleChange(e){
        setinputState({...inputState, [e.target.name]: e.target.value});
        setErrors(validate({...inputState,[e.target.name]: e.target.value}));
    }
    
    function handleCheckbox (e){
        if(e.target.checked){
            setinputState({...inputState, diets: [...inputState.diets, e.target.name]})
        }else if(!e.target.checked){
            setinputState({...inputState, diets: inputState.diets.filter(d => d !== e.target.name)})
        }

    }

    function handleStep(e){
        e.preventDefault();
        setinputState((prev) =>({...prev, steps: [...inputState.steps, inputState.step]}))
        setinputState((prev)=>({...prev, step: ""}))
    }

    function onDelete(e){
        e.preventDefault();
        setinputState({...inputState, steps: inputState.steps.filter(s => s !== e.target.value)})
    }

    function ensabledSubmit(){
        return (
            !inputState.title ||
            !inputState.summary ||
            errors.title ||
            errors.summary ||
            errors.healthScore ||
            errors.diets);
    }
    
    function handleCreate(e){
        e.preventDefault();
        let recipe = {
            title: inputState.title,
            healthScore: inputState.healthScore,
            summary: inputState.summary,
            steps: inputState.steps,
            image: inputState.image,
            diets: inputState.diets
        }
        dispatch(createRecipe(recipe));
        alert(`You added ${inputState.title} successfully!`);
        history.push('/home')
    }

    return(
        <div>
            <Link to="/home"><button>Back to Home</button></Link>
            <h3>Share with us your favorite Recipe</h3>
            <form onSubmit={(e) => handleCreate(e)}>
                <input type={"submit"} value={"Submit here when done"} disabled={ensabledSubmit()}/>
            <label>Title: </label><input name="title" value={inputState.title} onChange={(e) => handleChange(e)}></input>
            {errors.title && (<p>{errors.title}</p>)}
            <label>Summary: </label><textarea type="text" name="summary" value={inputState.summary} onChange={(e) => handleChange(e)}/>
            {errors.summary && (<p>{errors.summary}</p>)}
            <p>Choose bettwen the diets that apply to your recipe:</p>
            {errors.diets && (<p>{errors.diets}</p>)}
            <div>
            {diets.map((diets, index) => {
                return (
                    <li key={index}>
                        <div className="section">
                        <input
                            type="checkbox"
                            id={index}
                            name={diets.name}                         
                            value = {diets.name}
                            onChange = {(e) => handleCheckbox(e)}
                        />
                        <label key={index}>{diets.name}</label>
                    </div>
                    </li>
                );
            })}
            </div>
            <label>Health Score: </label><input name="healthScore" value={inputState.healthScore} onChange={(e) => handleChange(e)}/>
            {errors.healthScore && (<p>{errors.healthScore}</p>)}
            <label>URL Image: </label><input name="image" value={inputState.image} onChange={(e) => handleChange(e)}/>
            {errors.image && (<p>{errors.image}</p>)}
            </form>
            <form onSubmit={(e) => handleStep(e)}>
            <label>Describe one by one the steps: </label><textarea name="step" value={inputState.step} onChange={(e) => handleChange(e)}/><input name="steps" type={"submit"} value={`Save Step #${inputState.steps.length+1}`}/>
            <ol>
            {inputState.steps.map((step, index)=>{
                return (
                    <li key={index}>
                        <label>{step}</label><button value={step} onClick={(e)=>onDelete(e)}>X</button>
                    </li>
                )
            })}
            </ol>
            </form>
        </div>
    )
}