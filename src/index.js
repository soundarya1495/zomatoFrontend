import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route , BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import Home from './Components/Home';
import Filter from './Components/Filter'; 

import FilterPage from './Components/FilterDetail';

import Router from './Components/Routing';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <Router />
    </BrowserRouter>
);



