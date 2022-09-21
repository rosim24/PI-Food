import React from "react";
import { Link } from "react-router-dom";

export default function Landing(){
    return (
        <div>
            <h1>Welcome to Foody SPA</h1>
            <h3>Share with everyone your favorite recipe and find thousands of ideas for all your meals</h3>
            <Link to='/home'>
                <button>Let's cook</button>
            </Link>
        </div>
    )
}