import React from "react";
import { Route , BrowserRouter} from "react-router-dom";

import Home from "./Home";
import Filter from "./Filter";
import FilterDetail from './FilterDetail';
import Header from "./Header";


const Router = () =>{
    return(
    <BrowserRouter>
        <Route path="*" component={Header}/>
        <Route exact path ="/" component ={Home}/>
        <Route exact path ="/home" component ={Home}/>
        <Route  path ="/filter" component ={Filter}/>
        <Route  path ="/filterdetail/" component ={FilterDetail}/>

    </BrowserRouter>
    )
}

export default Router;
