import React from 'react'
import './App.css';
import Landing from './components/Landing'
import DetailedRecipe from './components/DetailedRecipe'
import Home from './components/Home'
import CreateRecipe from './components/createRecipe';

import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/create' component={CreateRecipe} />
          <Route path='/recipe/:id' component={DetailedRecipe} />
      </React.Fragment>
    </BrowserRouter>
  )
}

export default App;
