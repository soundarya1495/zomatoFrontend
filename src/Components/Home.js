import React from 'react';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';
import axios from "axios";
import '../Styles/Home.css';

class Home extends React.Component{

    constructor(){
        super();
        this.state={
            location :[],
            mealtypes:[]
        }
    }

    componentDidMount(){
            axios({
                    method:'GET',
                    url : 'http://localhost:3300/getAllLocations',
                    headers:{"Content-type": "application/json"}
                })
                .then(response =>
                    // alert(response)
                    this.setState ({
                        location:response.data.Locations
                    })
                ).catch(
                    err=>(console.log(err))
                )

                axios({
                    method:'GET',
                    url : 'http://localhost:3300/getAllMealtype',
                    headers:{"Content-type": "application/json"}
                })
                .then(response =>
                    this.setState ({
                        mealtypes:response.data.Mealtypes
                    })
                ).catch(
                    err=>(console.log(err))
                )

    }

     
    render(){
        const {location , mealtypes} = this.state;
        console.log(location)
        return(
            <div>
                <Wallpaper locationData = {location}/>
                <QuickSearch mealtypeData = {mealtypes}/>
            </div>
        )
    }
}

export default Home;