import { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeService from '../services/recipe/RecipeService';
import { withRouter } from '../services/util/Util';
import './Recipe.css'

class Recipe extends Component{
    constructor(props){
        super(props);
        this.state={
            id: parseInt(this.props.params.id),
            recipe : {},
            ingredients:[],
            username:''
        }
    }
    componentDidMount(){
        RecipeService.getRecipe(this.state.id)
            .then((response) => {
                this.setState({
                    recipe: response.data,
                    ingredients : response.data.ingredients,
                    username:response.data.owner.username
                });
            
            
        }).catch(function(e) {
            console.log('ERROR ', e);
        })
       
    }
    deleteRecipe = (e)=>{
        e.preventDefault();
        RecipeService.deleteRecipe(this.state.id)
            .then(() => {
                window.location.href= "/home"
        }).catch(function(e) {
            console.log('ERROR ', e);
        })
    }
    render(){
        return (
            <div className='detail-container'>

                {localStorage.getItem('authenticatedUser') === this.state.username?
                <div className='detail-header-con'>
                    <h1 className='detail-header'>{this.state.recipe.name}</h1> 
                    <Link className="btn-edit" to={`/recipe/edit/${this.state.recipe.id}`}><button className="btn " >Edit</button> </Link>

                    <button className="btn btn-delete" onClick={this.deleteRecipe}>Delete</button>
                </div>
                :
                <div className='detail-header-con'>
                    <h1 className='detail-header'>{this.state.recipe.name}</h1> 
                </div>
                }

                <div className='detail-des-con'><p className='detail-des'>{this.state.recipe.des}</p></div>
                <hr/>
                <div className='detail-img-con'>
                    <img className='detail-img' src={this.state.recipe.img} alt="" />
                    <div className='recipe-info-con'>
                            <p><span className='attr-1'>Servings: </span><span className='attr-2'>{this.state.recipe.servings}</span></p>
                    </div>
                </div>
                <hr/>
                <div className='recipe-info'>
                    
                    <div className='detail-ingredient-con'>
                        <h3 className='detail-ingredient-header'>Ingredients</h3>
                        
                        <div className='ingredient-con'>
                            {this.state.ingredients.map(ingredient =>
                            
                            <p className='ingredient-row'>
                                {ingredient.quantity} &nbsp;{ingredient.ingredient_name}
                            </p>
                            )}
                        </div>
                    </div>
                    
                </div>
                <hr/>
                <div className='detail-direction-con'>
                    <h3 className='detail-direction-header'>Detail Directions</h3>
                    <p className='detail-direction'>
                    {this.state.recipe.detail}
                    </p>
                </div>
            </div>
        )
    }
}
export default withRouter(Recipe);