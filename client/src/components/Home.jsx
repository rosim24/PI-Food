import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { getRecipes, getDiets, filterByDiet } from "../redux/actions";
import RecipeCard from "./RecipeCard";
import PagingBar from "./PagingBar";

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const diets = useSelector((state) => state.diets)
    const [currentPage, setCurrentPage] = useState(1);
    const qttyPerPage = 9;
    let sliceRecipe = qttyPerPage*currentPage;
    let firstRecipe = sliceRecipe-qttyPerPage;
    let currentRecipes = allRecipes.slice(firstRecipe,sliceRecipe);

    useEffect (()=>{
        dispatch(getRecipes());
        dispatch(getDiets());
    }, [dispatch]);

    function handleResetClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleDietSelect(e){
        e.preventDefault();
        dispatch(filterByDiet(e.target.value))
    }

    function handlePage(number){
        setCurrentPage(number);
    }

    return(
        <div>
            <Link to= 'create'>Create your own Recipe</Link>
            <h1>Food SPA</h1>
            <button onClick={e =>{handleResetClick(e)}}>Reload All</button>
            <div>
                <select>
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
                <select>
                    <option value="all">All</option> 
                    <option value="api">Api</option>
                    <option value="created">Created</option>
                </select>
                <PagingBar  totalRecipes={allRecipes.length} 
                            recipesPerPage={qttyPerPage} 
                            handlePage={handlePage}/>
                {
                currentRecipes && currentRecipes.map(r =>(
                    <RecipeCard key = {r.id} 
                                recipe= {r} />
                ))
              }
                                
            </div>
        </div>
    )
}