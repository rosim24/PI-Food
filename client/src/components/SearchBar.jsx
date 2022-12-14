import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import s from './styles/SearchBar.module.css'

import { getRecipes, filterByDiet, filterBySource, searchByName } from "../redux/actions";

export default function SearchBar ({handleOrder, setCurrentPage}) {
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
        setCurrentPage(1)
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
        <div className={s.bar}>
            <div className={s.titlecontainer}>
                <Link to='/' ><h1 className={s.title}>FOOD-ish</h1></Link>
                <div className={s.head}>
                    <div className={s.div}>
                        <input className={s.input} type="text" placeholder="Find by name" value={name} onChange={e => setName(e.target.value)}/>
                        <button className={s.searchbutton} onClick={e => runSearchByName(e)}> &#8227;</button>
                    </div>
                    <div className={s.searchcontainer}>
                        <button className={s.reload} onClick={e =>handleResetClick(e)}>Show All</button>                
                        <Link to= '/create' className={s.link}>Create your own Recipe</Link>
                    </div>
                </div>
            </div>
            <div className={s.bottombar}>
                <div className={s.combo}>
                    <label className={s.combolabel} >Order By:</label>
                    <select className={s.comboselect} name = "prueba" onChange={e => handleOrder(e)}>
                        <option value='non'>None</option>
                        <option value='asc'>A to Z</option>
                        <option value= 'desc'>Z to A</option>
                        <option value= 'fit'>Healthier</option>
                        <option value= 'fat'>Less Healthy</option>
                    </select>
                </div>
                <div className={s.combo}>
                    <label className={s.combolabel} >Filter By: </label>
                    <select className={s.comboselect} onChange={e => handleDietSelect(e)}>
                        <option key={diets.length} value='All'>All</option>
                        {diets.map((diet, idx) =>{
                            return(
                                <option key={idx} value={diet.name}>{diet.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className={s.combo}>
                    <label className={s.combolabel} >Show From: </label>
                    <select className={s.comboselect} onChange={(e) => handleSourceSelect(e)}>
                        <option value="all">All</option> 
                        <option value="api">Api</option>
                        <option value="db">Created</option>
                    </select>
                </div>
            </div>
        </div>
    )
}