import './Header.css'
import { Component } from 'react';
import AuthServices from '../services/auth/AuthServices';
import { Link } from "react-router-dom";
export default class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            keyword : '',
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
    onSearch = () =>{
        window.location.href= "/recipes/search/" + this.state.keyword
    }
    render() {
    return (
        <header className="header-con">
            <div className="logo-con">
                <div className="logo-holder">
                <Link to="/home">
                    <p className='logo text-center'>Foodie</p>
                </Link>
                </div>
                    
            </div> 
            <div class="search-con">
                <div class="search">
                    <input type="text" name="keyword" class="searchTerm" placeholder="Find a Recipe (by name or by ingredient)"
                        value={this.state.password} onChange={this.handleInputChange}/>

                        <button onClick={this.onSearch} type="submit" class="searchButton">
                            <i class="fa fa-search"></i>
                        </button>
                </div>
            </div>        
            <button onClick={AuthServices.logout} className="btn-out" >Log out</button>   
        </header>
    )
    }
}