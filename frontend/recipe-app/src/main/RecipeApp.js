import { Component } from "react";
import { Route, Navigate, Routes, Outlet} from 'react-router-dom';

import AuthServices from './services/auth/AuthServices';

import RegisterComponent from "./pages/RegisterComponent";
import LoginComponent from "./pages/LoginComponent";
import Header from './pages/Header'
import Home from './pages/Home'
import Recipe from "./pages/Recipe";
import AddRecipe from "./pages/AddRecipe";
import SerchRecipes from "./pages/SerchRecipes";
import EditRecipe from "./pages/EditRecipe";

export default class JumpstartApp extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render (){
        
        return(
            <Routes>dasfasfasd
                <Route path="/login" element={<LoginComponent/>}/>
                <Route path="/register" element={<RegisterComponent/>}/>
                <Route exact path='/'  element={<PrivateRoute />}>
                    <Route exact path='/'   element={<Navigate to="/home" />}/>
                    <Route exact path='/home'   element={<Home />}/>
                    <Route exact path={"/recipe/:id"}   element={<Recipe />}/>
                    <Route exact path='/add'   element={<AddRecipe />}/>
                    <Route exact path={"/recipes/search/:keyword"}   element={<SerchRecipes />}/>
                    <Route exact path={"/recipe/edit/:id"}   element={<EditRecipe />}/>
                </Route>
            </Routes>
            )
    }
}
const PrivateRoute = () => {
    let auth = AuthServices.isAuthenticated(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ?
        <div className="content-body">
            <Header/>
            <div className="content-con">
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>      
    : <Navigate to="/login" />;
}