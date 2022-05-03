import { Component } from 'react';
import './FormComponent.css';
import { Link } from "react-router-dom";
import AuthServices from '../services/auth/AuthServices';

export default class LoginComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            username : "",
            password : "", 
            merror:""
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state.username);
        const loginRequest = Object.assign({}, this.state);
        AuthServices.loginUser(loginRequest)
        .then((response) => {

            AuthServices.saveLogin(response.data.username, response.data.token, response.data.role);
            this.setState({
                merror : "success"
            })
            window.location.href= "/"
        }).catch(error => {
            this.setState({
                merror : "Email and Password doesn't match"
            })
        });
    }
    handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        
        this.setState({
            [inputName] : inputValue
        })
    }

    render(){
        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Login to Foodie</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-item">
                            <input type="username" name="username" 
                                className="form-control" placeholder="username"
                                value={this.state.username} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="password" name="password" 
                                className="form-control" placeholder="Password"
                                value={this.state.password} onChange={this.handleInputChange}  required/>
                        </div>

                        <span className="login-link">Don't have an account? <Link to="/register">Sign Up!</Link></span>
                        <div className="form-item">
                            <button type="submit" className="btn-block" >Login</button>
                            
                        </div>
                        <div className="form-item ferror">
                            {this.state.merror}
                        </div>
                    </form>             
                    
                </div>
            </div>
        );
    }
}