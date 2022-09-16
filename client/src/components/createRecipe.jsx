import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createRecipe}  from '../../actions';

const createRecipe = () =>{
    const [inputState, setinputState]= useState({
        title: "",
        summary: "",
        diet: [],
        healthScore:"",
        image:"",
        steps:[],
        qntty:""
    });
    
    const handleChange = function(e){
        setinputState(
            {...inputState, 
                [e.target.name]: e.target.value}
        )
    }
    return (
        <div>
            <h3>Share with us your favorite Recipe</h3>
            <form onSubmit={handleSubmit}>
            <label>Title:</label><input name='title' type='text' value={input.title} onChange={handleChange}/>
            <label>Summary:</label><input name='summary' type='text' value={input.summary} onChange={handleChange}/>
            <label>Choose the diets that apply to your recipe:</label>
            {diets.map((diet, index) => {
                return (
                    <li key={index}>
                        <div className="section">
                        <input
                            type="checkbox"
                            id={`checkbox-${index}`}
                            name={diet}
                            checked={checkedState[index]}
                            onChange={() => handleChange(index)}
                        />
                        <label htmlFor={`checkbox-${index}`}>{diet}</label>
                    </div>
                    </li>
                );
            })}
            <label>Health Score:</label><input name='healthScore' type='number' value={input.healthScore} onChange={handleChange}/>
            <label>URL Image:</label><input name='image' type='text' value={input.image} onChange={handleChange}/>
            <label>How many steps does it have?</label><input name='qntty' type='text' value={input.qntty} onChange={handleChange}/>
            <label>Steps:</label><input name='step' type='text' value={input.step} onChange={handleChange}/>
            {inputState.steps && inputState.steps.length > 0 && inputState.steps.map((step, i) => 
                <div key={i} className="col">
                    <div className="textareaHeader">
                        <div className="rowStep">
                            <h1 className="numStep">{`${i+1}`}</h1>
                        </div>
                    </div>                
                    <textarea
                        ref={(ref) => (stepsRef.current[i] = ref)}
                        id={i}
                        placeholder="Write a new step..."
                        name="steps"
                        value={`${step}`}
                        className="textarea"
                        onChange={(e)=> handleStepInput(e)}>
                    </textarea>
                </div>)}
             
            </form>
        </div>
    )
}