import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { createRecipe } from '../redux/actions';
import s from './styles/Create.module.css'

//if (!/^(http[s]?)/.test(value))
export function validate(inputState) {
    let errors = {};
    if (!inputState.title) {
        errors.title = 'A Title is required';
    } else if(!/^[a-zA-Z\s]+$/.test(inputState.title)){
        errors.title = 'Please do not use numbers or any special character';
    }
    if (!inputState.summary) {
      errors.summary = 'A Summary is required';
    }
    if (inputState.healthScore > 100) {
        errors.healthScore = 'The Health Score can not be greater than 100';
    }
    if (!inputState.image) {
        errors.image = 'Use an url image to share how it looks (opcional)';
    } else if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpeg|jpg|png)/.test(inputState.image)){
        errors.image = 'Please, use a valid url of an image in jpg or png format.'
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
        healthScore:"50",
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
            errors.healthScore);
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
        history.push('/home')
    }

    return(
        <div className={s.supercontainer}>
            <Link to="/home"><button className={s.back}>Go Back!</button></Link>
            <div className={s.container}>
                <h3 className={s.title}>Share with us your favorite Recipe!</h3>
                <form className={s.topform} onSubmit={(e) => handleCreate(e)}>
                    <input className={s.onsubmit} type={"submit"} value={"Submit here when done"} disabled={ensabledSubmit()}/>
                    <div className={s.combodiv}>
                        <label className={s.combolable}>Title: </label>
                        <input className={s.comboinput} name="title" value={inputState.title} onChange={(e) => handleChange(e)}/>
                        {errors.title && (<p className={s.warning}>{errors.title}</p>)}
                    </div>
                    <div className={s.combodiv}>
                        <label className={s.combolable}>Summary: </label>
                        <textarea className={s.areas} type="text" name="summary" value={inputState.summary} onChange={(e) => handleChange(e)}/>
                        {errors.summary && (<p className={s.warning}>{errors.summary}</p>)}
                    </div>
                    <p className={s.combotitle}>Choose bettwen the diets that apply to your recipe:</p>
                    <ul>
                    {diets.map((diets, index) => {
                        return (
                            <li className={s.diets} key={index}>
                                <div>
                                <input
                                    className={s.check}
                                    type="checkbox"
                                    id={index}
                                    name={diets.name}                         
                                    value = {diets.name}
                                    onChange = {(e) => handleCheckbox(e)}
                                />
                                <label className={s.lablel} key={index}>{diets.name}</label>
                            </div>
                            </li>
                        );
                    })}
                    </ul>
                    <div className={s.combodiv}>
                        <label className={s.combolable}>Health Score: </label>
                        <input className={s.range} type="range" min="0" max="100" name="healthScore" value={inputState.healthScore} onChange={(e) => handleChange(e)}/>
                        <label className={s.combolable}>{inputState.healthScore}</label>
                        {errors.healthScore && (<p className={s.warning}>{errors.healthScore}</p>)}
                    </div>
                    <div className={s.combodiv}>
                        <label className={s.combolable}>URL Image: </label>
                        <input className={s.comboinput} name="image" value={inputState.image} onChange={(e) => handleChange(e)}/>
                        {errors.image && (<p className={s.warning}>{errors.image}</p>)}
                    </div>
                </form>
                <form onSubmit={(e) => handleStep(e)}>
                    <p className={s.combotitle}>Describe one by one the steps: </p>
                    <div className={s.combostep}>
                        <textarea className={s.areastep} name="step" value={inputState.step} onChange={(e) => handleChange(e)}/>
                        <input className={s.stepsub} name="steps" type={"submit"} value={`Save Step #${inputState.steps.length+1}`}/>
                    </div>
                    <ol>
                    {inputState.steps.map((step, index)=>{
                        return (
                            <li className={s.combolable} key={index}>
                                <label className={s.combolable}>{step}</label>
                                <button
                                    className={s.stepsub} 
                                    value={step}
                                    onClick={(e)=>onDelete(e)}
                                >X</button>
                            </li>
                        )
                    })}
                    </ol>
                </form>
            </div>
        </div>
    )
}