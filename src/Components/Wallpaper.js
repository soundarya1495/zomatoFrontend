import React from 'react';
import Header from "./Header";
import axios from "axios";
import { withRouter } from 'react-router-dom';


class Wallpaper extends React.Component{
    constructor(){
        super();
        this.state={
            city_Id:'',
            restaurants:[],
            rest_name:'',
            suggestions :[],
        }
    }
    handleChange = (event)=>{
        event.preventDefault();
        let cityId = event.target.value;
        this.setState({city_Id: event.target.value});

        axios({
            method:'GET',
            url:`http://localhost:3300/getAllRestaurantByLocation/${cityId}`,
            headers:{"Content-type": "application/json"}
        })
        .then(response =>
            this.setState ({
                restaurants:response.data.Restaurant
            })
        ).catch(
            err=>(console.log(err))
        )
    }

 
    handleChangeres = (event)=>{

        let resName = event.target.value;
        const {restaurants} = this.state;
          const suggestions = restaurants.filter(item =>
                item.name.toLowerCase().includes(resName.toLowerCase())
            );
            console.log(suggestions);
            this.setState({ suggestions,resName })
    }
    showsuggestions = () =>{
        const {suggestions, resName} = this.state;
        // console.log(suggestions);
        if(suggestions.length == 0 && resName == undefined){
            return null;
        }
        if(suggestions.length > 0 && resName == ''){
            return null;
        }
        if(suggestions.length == 0 && resName){
            return <ul>
                <li className='drops' >No search results found</li>
            </ul>;
        }
        return(
            <ul>
                {
                    suggestions.map((item,index) => <li className='drops' key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name} - ${item.locality},${item.city}`}</li>)
                }
            </ul>
        )

    }
    selectingRestaurant = (resObj) =>{
        this.props.history.push(`/filterdetail?restaurant=${resObj._id}`);
    }

    render(){
        const {locationData} = this.props;
        const {restaurants} = this.state;

        // console.log(restaurants);
        return(
            <div>
                <div className="container-fluid">
                {/* <Header/> */}
                <div className="bg-image" style={{
                            backgroundImage: "url('assets/banner-transformed.jpeg')",
                            height: "400px",
                            width:"100%",
                            backgroundRepeat: "no-repeat",
                        }}>
                    
                    <div className="text-center logo">e!</div>
                    <div className="text-center headertext">Find the best restaurants , cafes and bars</div>
                    <div className="row searchoption">
                    <div className="col-sm-12 col-lg-6 col-md-12">
                        <select className="locationbox"  onChange={this.handleChange}>
                        {/* <select> */}
                           <option>Select</option>
                            {locationData.map((location) =>{
                                return(<option value={location.city} key={location.location_id}>{location.name},{location.city}</option>);
                            })   
                            }
                    
                        </select>
                        </div>
                        <div className="col-sm-12 col-lg-6 col-md-12 searchbox" id="suggestbox">
                        <i className="bi bi-search SearchIcon"></i>
                        <input id="query" type="text" className="searchinput"  placeholder="Search restaurants" onChange={this.handleChangeres} />
                        {this.showsuggestions()}
                      
                        </div>
                    </div>
                    </div>
                </div>
              

            </div>
        )
    }
}

export default withRouter(Wallpaper);