import { Component} from "react";
import './AddRecipe.css'

import RecipeService from "../services/recipe/RecipeService"
import { withRouter } from "../services/util/Util";
 class EditRecipe extends Component{
    constructor(props){
        super(props);
        this.state={
            id: parseInt(this.props.params.id),
            name:'',
            des:'',
            img:null,
            ingredients:[],
            servings:0,
            detail:'',
        }
    }
    componentDidMount(){
        RecipeService.getRecipe(this.state.id)
            .then((response) => {
                
                this.setState({
                    name: response.data.name,
                    des: response.data.des,
                    img: response.data.img,
                    ingredients: response.data.ingredients,
                    servings: response.data.servings,
                    detail: response.data.detail,
                });
            
        }).catch(function(e) {
            console.log('ERROR ', e);
        })
        
    }
    createIngredient = (event) =>{
        event.preventDefault();
        let ingredients = this.state.ingredients
        let i = {ingredient_name:'',quantity:''}
        ingredients.push(i)
        this.setState({
            ingredients : ingredients
        })
    }
    removeIngredient = (event, i) =>{
        let ingredients = this.state.ingredients;
        ingredients.splice(i,1);
        this.setState({
            ingredients : ingredients
        })
    }
    handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName] : inputValue
        })
    }
    handleInputChangeIg = (event,i) => {
        let ingredients = this.state.ingredients;
        let ing = ingredients[i]

        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        ing[inputName] = inputValue
        
        ingredients[i] = ing

        this.setState({
            ingredients : ingredients
        })
    }
    handleFileInput = (event) => {
        event.preventDefault();
        this.setState({
            img : event.target.files[0]
        })
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        const request = Object.assign({}, this.state);
        delete request['img']
        RecipeService.updateRecipe(this.state.id,request,this.state.img)
        .then(
            response =>{
                window.location.href= "/recipe/"+this.state.id
            }
        ).catch(error => {
            console.log(error.response.data)
        });
    }
    render(){
        return (
            <div className='detail-container'>
                <div className='detail-header-con'><h1 className='detail-header'>Add your recipe</h1></div>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <div className="recipe-form-item">
                        <p className="form-label">Recipe Title:</p>
                        <input type="text" name="name" 
                            className="form-input" placeholder="Recipe Title"
                            value={this.state.name} onChange={this.handleInputChange} required/>
                    </div>
                    <div className="recipe-form-item">
                        <p className="form-label">Recipe Decription:</p>
                        <textarea type="text" name="des" 
                            className="form-input" placeholder="Enter a brief decription"
                            value={this.state.des} onChange={this.handleInputChange} required/>
                    </div>
                    <div className="recipe-form-item">
                        <p className="form-label">Recipe Image:</p>
                        <input type="file" name="img" 
                            className="form-input form-input-img" placeholder="Enter a brief decription" accept="image/png, image/jpeg"
                            onChange={this.handleFileInput} required/>
                    </div>
                    <div className="recipe-form-item">
                        <p className="form-label">Ingredients:</p>
                        <div className="form-input">
                        {this.state.ingredients.map((ingredient,index) => 
                            <div>
                                <input type='text' name="ingredient_name" placeholder="Ingredient name" value={ingredient.ingredient_name} onChange={(e) => this.handleInputChangeIg(e,index)}/>
                                <input type='text' name="quantity" placeholder="Ingredient quantity" value={ingredient.quantity} onChange={(e) =>this.handleInputChangeIg(e,index)}/>
                                <span className="close-btn" onClick={() => this.removeIngredient(index)}>
                                    &nbsp;&nbsp;&nbsp;x
                                </span>
                            </div>
                            )
                        }
                            
                            <button onClick={this.createIngredient}> Add Ingredients</button>
                        </div>
                    </div>
                    <div className="recipe-form-item">
                        <p className="form-label">Servings:</p>
                        <input type="number" name="servings" 
                            className="form-input" placeholder="Enter Servings amount"
                            value={this.state.servings} onChange={this.handleInputChange} required/>
                    </div>
                    <div className="recipe-form-item">
                        <p className="form-label">Recipe Detail:</p>
                        <textarea type="text" name="detail" 
                            className="form-input" placeholder="Enter a Recipe Detail"
                            value={this.state.detail} onChange={this.handleInputChange} required/>
                    </div>
                    <div className="form-item">
                        <button type="submit" className="btn btn-submit" >Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(EditRecipe);
