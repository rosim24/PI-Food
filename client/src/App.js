import React from 'react'
import './App.css';
import Landing from './components/Landing'
//import NavBar from '../src/components/NavBar'
import Home from './components/Home'

import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
