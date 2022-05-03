import {API_BASE_URL, ACCESS_TOKEN, Axioinstance} from "../util/Util"
import { Component } from "react";

class AuthService extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this)
    }
    registerUser(regRequest){
        return Axioinstance.post(API_BASE_URL + "/auth/register/",regRequest)
    }
    loginUser(loginRequest){
        return Axioinstance.post(API_BASE_URL + "/auth/login/", loginRequest)
    }
    saveLogin(username, token) {
        console.log("login successful")
        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem('authenticatedUser', username);
        // sessionStorage.setItem('authenticatedUser', username)
        //this.setupAxiosInterceptors(this.createJWTToken(token))
        
    }
    

    isAuthenticated(){
        if(localStorage.getItem(ACCESS_TOKEN)){
            return true;
        }else{
            return false;
        }
    }

    getRole(){
        return localStorage.getItem('userRole')
    }

    logout() {
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem(ACCESS_TOKEN);
        console.log(this.isAuthenticated());
        window.location.href= "/login"
    }
}
export default new AuthService();