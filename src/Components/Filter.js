import React from "react";
import queryString from 'query-string';
import axios from "axios"; 
import Header from "./Header";
import { Link } from "react-router-dom"
import '../Styles/Filter.css';

class Filter extends React.Component{
    constructor(){
        super();
            this.state={
                mealtype:'',
                mealtypeId:'',
                locations:[],
                selectedLocation : '', 
                restaurants:[],
                filteredrestaurant:[],
                cusineid:[],
                restaurantsPerPage:2,
                currentPage:1,
                pageCount:undefined,
                length:undefined,
                sort:1,
                lcost:undefined,
                hcost:undefined,
                currentRestaurants:[]

            }
    }
  
    componentDidMount(){
        let queries = queryString.parse(this.props.location.search);
        let mealType = queries.mealType;
        let mealtypeId = queries.mealtype_id;
        
        this.setState({
            mealtype:mealType,
            mealtypeId:mealtypeId,
            locationdata:[],
            restaurants:[],
            currentPage:1,
            restaurantsPerPage:3,
            sort:1,
            pageCount:undefined,
            cusineid:[],
            lcost:undefined,
            hcost:undefined
        });

        const {cusineid,sort,lcost,hcost,currentPage,restaurantsPerPage,restaurants} = this.state;

        const req ={
            mealtype_id: Number(mealtypeId),
            location_id: '',
            cuisine_id: cusineid,
            sort: sort,
            lcost: lcost,
            hcost:hcost,
            currentPage:1,
            restaurantsPerPage:3
        };
        axios({
            method: "POST",
           url: "http://localhost:3300/filter",
           data: req,
           headers:{"Content-type": "application/json"},
          
           })
           .then((response) => {
               this.setState({
                restaurants:response.data.restaurant
               })
           })
            .catch(
               (err) => {console.log(err)}
           );
        
        axios({
            method:'GET',
            url:`http://localhost:3300/getAllLocations`,
            headers:{"Content-type": "application/json"}
        })
        .then(
            response =>
            this.setState ({
                locations:response.data.Locations,
            })
        ).catch(
            err=>(console.log(err))
        )

       
    }

    // fetchPagination = () => {
    //     const {currentPage,restaurantsPerPage,restaurants} = this.state;

    //     console.log(restaurants)
        

    //     this.setState({
    //         length:length
    //     })
    // }

     handlePageChange = (pageNumber) => {
       this.setState({
        currentPage:pageNumber
       })
    };

    handleLocationChange =(e)=>{
        const location_id = e.target.value;
        this.setState({
            selectedLocation:location_id, restaurantlist:true
        });
        setTimeout(() => this.filterRestaurants() , 0);
    }

    filterRestaurants = () =>{

        const {mealtypeId,selectedLocation,sort,lcost,hcost,cusineid} = this.state;

        const req = {
            mealtype_id : mealtypeId,
            location_id :selectedLocation,
            cuisine_id: cusineid,
            sort: Number(sort),
            lcost: lcost,
            hcost: hcost
        };

        axios({
             method: "POST",
            url: "http://localhost:3300/filter",
            data: req,
            headers:{"Content-type": "application/json"},
           
            })
            .then((response) => {
                this.setState({
                    restaurants:response.data.restaurant
                })
            })
             .catch(
                (err) => {console.log(err)}
            );      
    }

    handleCuisineChange = (cuisineId) =>{
        const {cuisine,mealtypeId,cusineid} = this.state;

        const index = cusineid.indexOf(cuisineId);

        if(index == -1){
            cusineid.push(cuisineId)
            this.setState({
                cusineid:cusineid   
            })
           
        }else{
            cusineid.splice(index,1)
            this.setState({
                cusineid:cusineid   
            })
        }
        setTimeout(() => this.filterRestaurants() , 0);    
    }

    handleCost = (lowcost,highcost) => {
        let higcost = highcost;
        let locost = lowcost;
    
        const {lcost,hcost} = this.state;

        this.setState({
            lcost:locost,hcost:higcost
        })
        setTimeout(() => this.filterRestaurants() , 0);
    }

    searchSort = (e)=>{
        
        const sortOrder = e.target.value;
        const {sort} = this.state;
        this.setState({
            sort: sortOrder
        })
        setTimeout(() => this.filterRestaurants() , 0);
    }

    handleDetail =(e)=>{
        this.props.history.push(`/filterdetail?restaurant=${e._id}`);
    }

    

    render(){
       
        const {mealtype,locations,restaurants,currentPage,restaurantsPerPage} = this.state;
        // console.log(restaurants);
        const indexOfLastRestaurant = currentPage * restaurantsPerPage;
        const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
        const length = restaurants.length > 0 ? Math.ceil(restaurants.length / restaurantsPerPage):0;
        const currentRestaurants = restaurants.length > 0 ? restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant) : 0;     
        
       
        return(
            <div>
                <div>
            </div>
            <h2>{mealtype}</h2>
            <div style={{
                marginLeft:"50px",
                fontSize: "12px",
                display:"flex"
            }}>
           
                <div className="sidebar">
                <h3>Filters</h3>
                    <h4>Select Location</h4>
                    <select id="cities" onChange={(e)=>this.handleLocationChange(e)}>
                           <option>Select</option>
                            {locations.map((location) =>{
                                return(<option value={location.location_id}>{location.name},{location.city}</option>);
                            })   
                            }
                        </select>
                        <h4>Cuisins</h4>
                        <input type="checkbox" name="cus"  value ="North Indian" onChange={()=>this.handleCuisineChange(1)}/> North Indian<br/>
                        <input type="checkbox" name="cus2" value ="South Indian" onChange={()=>this.handleCuisineChange(2)}/> South Indian<br/>
                        <input type="checkbox" name="cus3" value ="Chinese" onChange={()=>this.handleCuisineChange(3)} /> Chinese<br/>
                        <input type="checkbox" name="cus4" value ="Fast Food" onChange={()=>this.handleCuisineChange(4)}/> Fastfood<br/>
                        <input type="checkbox" name="cus5" value ="Street food" onChange={()=>this.handleCuisineChange(5)}/> Street food<br/>
                        <h4>Price</h4>
                        <input type="radio" name="pr" onChange={() => this.handleCost(0, 500) }/> Less than 500<br/>
                        <input type="radio" name="pr" onChange={() => this.handleCost(500, 1000)}/> 500 to 1000<br/>
                        <input type="radio" name="pr" onChange={() => this.handleCost(1000, 1500)} /> 1000 to 1500<br/>
                        <input type="radio" name="pr" onChange={() => this.handleCost(1500, 2000)} /> 1500 to 2000<br/>
                        <input type="radio" name="pr" onChange={() => this.handleCost(2000, 5000)}/> Above 2000<br/>

                        <h4>Sort</h4>
                        <input type="radio" name="sor" value={1} onClick={this.searchSort}/> Price Low to High<br/>
                        <input type="radio" name="sor" value={-1} onClick={this.searchSort}/> Price High to Low<br/>
                        
            </div>
            <div className="mainbar">       
                     {currentRestaurants.length > 0 ?currentRestaurants.map((item,index) =>{
                            return(
                                <div className="box-container" onClick={() => this.handleDetail(item)}>
                                    <img src={item.image} className="side-image"/>
                                    <h4 className="bar-heading">{item.name}</h4>
                                    <h5 className="bar-place">{item.locality}, {item.city}</h5>
                                    <p className="place-description">Shop for your day with cakes and candles</p>
                                    &nbsp;
                                    <hr/>
                                    <h6>CUISINS:{item.cuisine.map(cuisineitem => { return `${cuisineitem.name} `}) } </h6>
                                    {/* {cuisine} */}
                                    <h6>COST FOR TWO: {item.min_price}</h6>
                                </div>
                            )
                        }): <h1 style={{ color: "red" }}>No Result Found...</h1>
                    }
                   {  currentRestaurants.length > 0 ?
                    
                            <div className="pagination">
                            {Array.from({ length }).map((_, index) => (
                                <p key={index}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''} btn border-primary btn-light`}
                                    onClick={() => this.handlePageChange(index + 1)}
                                >
                                    <span className="page-link">{index + 1}</span>
                                </p>
                            ))}
                        </div>
                        // <div className="pagination">
                        //     <a href="#">&laquo;</a>
                        //     <a href="#" class="active">1</a>
                        //     <a href="#" >2</a>
                        //     <a href="#">3</a>
                        //     <a href="#">4</a>
                        //     <a href="#">5</a>
                        //     <a href="#">&raquo;</a>
                        // </div> 
                        :null
                }  
                    </div>  
                </div>
            </div>
        )
    }
}
export default Filter;