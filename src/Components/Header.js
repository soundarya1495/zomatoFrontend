import React from "react";
import '../Styles/Filter.css';
import Modal from 'react-modal';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { withRouter } from 'react-router-dom';



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


class Header extends React.Component{

    constructor(){
        super();
        this.state={
            backgroundcolor:"",
            display:"none",
            loginModalisOpen: false,  
            isLoggedIn:false,
            loggedInUser:undefined
        }
    }
  

    componentDidMount(){
        const path = this.props.history.location.pathname;
        this.setAttribute(path);
        
    };
    setAttribute = (path)=>{
        let bg='';
        let display='';
            if(path == '/' || path == '/home'){
                bg="black";
                display='none';
            }else{
                bg="coloured";
                display='inline-block';
            }
    
            this.setState({
                backgroundcolor :bg,
                display:display
            });

    }

    handleLogin =()=>{
        this.setState({loginModalisOpen:true})
    }
    
    closeModal = () => {
        this.setState({loginModalisOpen:false})
    };
    
    handleGoogleLogin = (credentialResponse) =>{        
        var obj = jwtDecode(credentialResponse.credential);
        this.setState({
            isLoggedIn:true,
            loggedInUser:obj.name,
            loginModalisOpen:false
        })
    }
    handleLogout = ()=>{
        this.setState({
            isLoggedIn:false,
            loggedInUser:undefined,
        })
    }

    navigate = (path)=> {
        this.props.history.push(path);
    }
   

    render(){
        const { backgroundcolor , display , loginModalisOpen, isLoggedIn ,loggedInUser} = this.state;
        return(
            <div>
            <div className="margin" style={{backgroundColor:backgroundcolor}}>
                <div className="Headerlogo" style={{display:display}} onClick={() => this.navigate('/home')}>e!</div>
            {!isLoggedIn ?
			<div className="buttons">
				<button className="loginbuttF" onClick={this.handleLogin}> Login</button>
				<button className="createbuttF"> Create an account</button>
			</div>
            :<div className="buttons">
            <button className="loginbuttF" > {loggedInUser}</button>
            <button className="loginbuttF" onClick={this.handleLogout}> Log out</button>
           </div>
            }
		    </div>
                    <Modal
                isOpen={loginModalisOpen}
                style={customStyles}
                >
                    <div>
                        <h2>Login</h2>
                        <input type="text" placeholder="Email" style={{padding:"10px 10px",margin:"5px 0"}}/><br></br>
                        <input type = "text" placeholder="Password" style={{padding:"10px 10px",margin:"5px 0"}} />
                        <div>
                            <button >Login</button>
                            <button onClick={this.closeModal} >Cancel</button>
                        </div>
                        <div>
                        <GoogleOAuthProvider clientId="21866110819-uuscasf84d23l5v9hnvpk1hunvh9o7tv.apps.googleusercontent.com">

                        <GoogleLogin
                            onSuccess=
                                {this.handleGoogleLogin}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            />;
                            </GoogleOAuthProvider>

                        </div>

                       
                    </div>
                
                </Modal>
            </div>

       
        )
    }
}

export default withRouter(Header);