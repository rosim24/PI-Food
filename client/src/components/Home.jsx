import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getRecipes, getDiets, orderRecipes } from "../redux/actions";
import RecipeCard from "./RecipeCard";
import PagingBar from "./PagingBar";
import SearchBar from "./SearchBar";
import s from './styles/Home.module.css'

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState("");
    const qttyPerPage = 9;
    let sliceRecipe = qttyPerPage*currentPage;
    let firstRecipe = sliceRecipe-qttyPerPage;
    let currentRecipes = allRecipes.slice(firstRecipe,sliceRecipe);

    useEffect (()=>{
        dispatch(getRecipes());
        dispatch(getDiets());
    }, [dispatch]);

    function handlePage(number){
        setCurrentPage(number);
    }

    function handlePrev(){
        setCurrentPage((prev)=>(prev-1))
    }

    function handleNext(){
        setCurrentPage((prev)=>(prev+1))
    }

    function handleOrder(e){
        e.preventDefault();
        dispatch(orderRecipes(e.target.value))
        setCurrentPage(1);
        setOrder(e.target.value)
    }

    return(
        <div className={s.supercontainer}>
            <SearchBar handleOrder = {handleOrder} setCurrentPage={setCurrentPage}/>
            <PagingBar  totalRecipes={allRecipes.length} 
                        recipesPerPage={qttyPerPage}
                        currentPage = {currentPage} 
                        handlePage={handlePage}
                        handleNext={handleNext}
                        handlePrev={handlePrev}/>
            <div className={s.container}>
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