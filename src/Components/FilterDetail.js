import React from "react";
import axios from "axios"; 
import { ImageSlider } from './ImageSlider'; 
import '../Styles/Details.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import queryString from 'query-string';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

class FilterPage extends React.Component{
    constructor(){
        super();
        this.state={
            restaurants:[],
            restaurantName:'',
            gallaryIsOpen:false,
            menu:[],
            quantity:0,
            count:{},
            counter: 0,
            clicked: false,
            subtotal:0

        }
    }
    componentDidMount(){
        const {restaurants,restaurantName} = this.state;
        const qs = queryString.parse(this.props.location.search);
        const {restaurant} = qs;

        axios({
            method:'GET',
            url:`http://localhost:3300/restById/${restaurant}`,
            headers:{"Content-type": "application/json"}
        })
        .then(
           
             response =>
                // console.log(response.data.Restaurant[0]["name"])
            this.setState ({
                restaurants:response.data.Restaurant,
                restaurantName:response.data.Restaurant[0]["name"]
            })
        ).catch(
            err=>(console.log(err))
        )

        
        // console.log(restaurants);
    }
    gallaryOpen = ()=>{
        const {gallaryIsOpen,restaurantName} = this.state;

        this.setState({
            gallaryIsOpen:true  
        })
        axios({
            method:'GET',
            url:`http://localhost:3300/menu/${restaurantName}`,
            headers:{"Content-type": "application/json"}
        })
        .then(
            response =>
            this.setState ({
                menu:response.data.Menu,
            })
        ).catch(
            err=>(console.log(err))
        ) 
    }

    closeModal = ()=>{
        this.setState({
            gallaryIsOpen:false ,
            subtotal:0
        }) 
    }

    additems = (index, operatortype) => {
        const {subtotal} = this.state;
        let total =0;
        let indexes =[];
        indexes.push(index);
 
       const items = [...this.state.menu];
       const item = items[0].item[index];
       if(operatortype == 'add'){
            item.quantity +=1;
       }else{
            item.quantity -=1;
       }

       items[0].item[index]= item;

       total +=item.quantity * item.price;
        
       this.setState({
            menu:items,subtotal:total
       })
    }
    
    render(){
        const {restaurants, gallaryIsOpen,menu,count,subtotal}= this.state;
    // console.log(menu);
        return(
        <div>
            <div>
                <div className='detail'>
                 <div className='slider'>
                    <ImageSlider />
                    <br />
                    <div className='d-flex justify-content-between'>
                        {restaurants.map((item)=>{
                           return(
                            <h1 className='line text-start'>{item.name}</h1>
                           ) 
                        })}
                        <button className='btn-outline-danger bttn' onClick={this.gallaryOpen}>Place Online Order</button>
                    </div>
                  </div>
                  
                <div className=''>
                    <Tabs>
                        <TabList className="d-flex flex-row">
                            <Tab style={{ backgroundColor: "aqua" }}><h3 style={{ color: "red" }}>Overview</h3></Tab>
                            <Tab style={{ backgroundColor: "aqua" }}><h3 style={{ color: "red" }}>Contact</h3></Tab>
                        </TabList>
                        <TabPanel>
                            <h3 style={{ color: "orange", fontWeight: "bolder" }} >Overview:</h3>
                            <h6 style={{ width: "50%", margin: "auto" }}>Previous Next
                                View Larger Image<br></br>
                                The restaurant industry is one of the largest components of the hospitality industry and is focused on providing food services where customers are able to order food and eat it on the premises
                                <br />
                                {restaurants.map((val)=>{
                                    return(
                                        <div>
                                        <h5>Rating:{val.rating_text}</h5>
                                        <h5>City:{val.city}</h5>
                                        </div>
                                    )
                                })}
                                
                            </h6>
                        </TabPanel>
                        <TabPanel>
                            {restaurants.map((value)=>{
                                return(
                                    <div>
                                        <h3 style={{ color: "orange", fontWeight: "bolder" }}>Phone number</h3>
                                        <h6>{value.contact_number}</h6>
                                        <br />
                                        <h3 style={{ color: "orange", fontWeight: "bolder" }}>{value.name}</h3>
                                        <h6>{value.locality}</h6>
                                    </div>
                                )
                            })}
                           
                        </TabPanel>
                    </Tabs>
                    <br />
                </div>
            </div>
        </div>

        <Modal isOpen={gallaryIsOpen} style={customStyles}>
        <button onClick={()=>this.closeModal()} style={{marginLeft:"95%"}}>X</button>
            {menu.map((e) => {
                return <div>
                    
                    <h1 style={{ color: 'rgb(128, 0, 0)' }} className='fw-bold'>{e.name.toUpperCase()}</h1>
                    <hr className='foods' />
                    <div style={{ width: '100%', borderRadius: '8px' }}>

                    <div >
                        {e.item.map((a,index) =>
                        (
                            <span className='d-flex justify-content-between p-2' key={index}>
                                <p style={{ fontSize: '13px' ,width:"70%"}} className='px-4'>
                                    <h3 style={{ color: 'rgb(255, 69, 0)' }} className='fw-bold'>{a.name}</h3> 
                                    {a.desc}  
                                </p>
                                <div className='d-flex justify-content-evenly px-4' style={{ width: '180px', border: 'none' }}>
                                    <button className='btn btn-outline-warning fs-6 fw-bold' onClick={() => this.additems(index,'subract')} >-</button>
                                    <button className='fw-bold fs-6 text-center btn btn-outline-success'>{a.quantity}</button>
                                    <button className='btn btn-outline-warning fs-6 fw-bold' onClick={() => this.additems(index,'add')}>+</button>
                                </div>
                                <h4 className='py-3' style={{ color: 'rgb(255, 69, 0)',width:"68px" }}>&#8377; {a.price}</h4>
                            </span>
                        )
                        )}
                        <div className="total fw-bold">Sub Total:{subtotal}
                            <button  className="btn btn-danger" style={{marginLeft:"70%",backgroundColor:"red"}}>Pay Now</button>
                        </div>
                    </div>
                    </div>
                </div>
            }
            )}
            </Modal>
            {/* <Modal isOpen={paymentModal} style={customStyles}>
            <CheckOut amount={quantity} id={id} />
            </Modal> */}

    </div>
        )
    }
}

export default FilterPage;