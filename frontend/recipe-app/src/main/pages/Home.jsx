import { Component } from 'react';
import { Link } from "react-router-dom";

import './Home.css'
import RecipeService from '../services/recipe/RecipeService';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            recipes : [],
        }
    }
    componentDidMount(){
        RecipeService.getRecipes()
            .then((response) => {
                this.setState({
                    recipes: response.data
                });
            
        }).catch(function(e) {
            console.log('ERROR ', e);
          })
    }
    render(){
        return (
            <>
                <Link to="/add"><button className="btn-add" >Add Recipe</button> </Link>
                <div className="recipe-container">
                {this.state.recipes.map(recipe => 
                    <div className='recipe-card'>
                        <div className='recipe-card-image-holder'><img className='recipe-card-image' src={recipe.img} alt="" /></div>
                        <Link to={`/recipe/${recipe.id}`}>
                        <div className='recipe-card-title-holder'>
                            <h2 className='recipe-card-title'>{recipe.name}</h2>
                        </div>
                        </Link>
                        <div className='recipe-card-des-holder'>
                            <p className='recipe-card-des'>{recipe.des}</p>
                        </div>
                        <div className='recipe-card-writer-holder'>
                            <p className='recipe-card-writer'><span>by </span>{recipe.owner.username}</p>
                        </div>
                    </div>
                )}
                
                </div>
            </>
        )
    }
}