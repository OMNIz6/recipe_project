import { Component } from "react";
import './FormComponent.css';
import { Link } from "react-router-dom";
import AuthServices from "../services/auth/AuthServices";

export default class RegisterComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            username : "",
            email : "",
            password : "",
            merror: "" 
        }
    }
    handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        
        this.setState({
            [inputName] : inputValue
        })
    }
    handleSubmit = (event) =>{
        event.preventDefault();

        const regRequest = Object.assign({}, this.state);
        
        AuthServices.registerUser(regRequest)
        .then(
            response =>{
                window.location.href= "/login"
            }
        ).catch(error => {
            this.setState({
                merror : error.response.data
            })
            
        });
    }

    render(){
        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Signup with Foodie</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-item">
                            <input type="username" name="username" 
                                className="form-control" placeholder="Username"
                                value={this.state.username} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="email" name="email" 
                                className="form-control" placeholder="Email"
                                value={this.state.email} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="password" name="password" 
                                className="form-control" placeholder="Password"
                                value={this.state.password} onChange={this.handleInputChange}  required/>
                        </div>
                        <div className="form-item">
                            <input type="password" name="cpassword" 
                                className="form-control" placeholder="Confirm Password"
                                 required/>
                        </div>
                        <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                        <div className="form-item">
                            <button type="submit" className="btn-block" >Sign Up</button>
                        </div>
                        <div className="form-item ferror">
                            {this.state.merror.message}
                        </div>
                    </form>             
                    
                </div>
            </div>
        );
    }
}