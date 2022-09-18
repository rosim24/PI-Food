import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { getRecipes, filterByDiet, filterBySource, orderRecipes, searchByName } from "../redux/actions";

export default function SearchBar ({handleOrder}) {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const [name, setName] = useState("");

    function handleResetClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function runSearchByName(e){
        e.preventDefault();
        dispatch(searchByName(name))
        setName("")
    }

    function handleDietSelect(e){
        e.preventDefault();
        dispatch(filterByDiet(e.target.value))
    }

    function handleSourceSelect(e){
        e.preventDefault();
        dispatch(filterBySource(e.target.value))  
    }

    return(
        <div>
            <h1>Food SPA</h1>

            <input type="text" placeholder="Find by name" value={name} onChange={e => setName(e.target.value)}></input><button onClick={e => runSearchByName(e)}>Search</button>
            <Link to= '/create'>Create your own Recipe</Link>

            <button onClick={e =>handleResetClick(e)}>Reload All</button>
            <div>
                <select name = "prueba" onChange={e => handleOrder(e)}>
                    <option value='non'>Order</option>
                    <option value='asc'>A to Z</option>
                    <option value= 'desc'>Z to A</option>
                    <option value= 'fit'>Healthier</option>
                    <option value= 'fat'>Less Healthy</option>
                </select>
                <select onChange={e => handleDietSelect(e)}>
                    <option key={diets.length} value='All'>All</option>
                    {diets.map((diet, idx) =>{
                        return(
                            <option key={idx} value={diet.name}>{diet.name}</option>
                        )
                    })}
                </select>
                <select onChange={(e) => handleSourceSelect(e)}>
                    <option value="all">All</option> 
                    <option value="api">Api</option>
                    <option value="db">Created</option>
                </select>
            </div>
        </div>
    )
}