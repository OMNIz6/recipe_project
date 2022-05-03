import {API_BASE_URL, Axioinstance} from "../util/Util"
class RecipeService {
    getRecipes(){
        return Axioinstance.get(API_BASE_URL + "/app/recipes/")
    }
    searchRecipes(keyword){
        console.log(keyword)
        return Axioinstance.get(API_BASE_URL + "/app/search/" + keyword+"/")
    }
    addRecipe(recipe,img){
        let form_data = new FormData();
            form_data.append("img", img, img.name);
            form_data.append("recipe", JSON.stringify(recipe));

            return Axioinstance.post(API_BASE_URL + "/app/recipes/", form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
    }
    updateRecipe(id,recipe,img){
        let form_data = new FormData();
            form_data.append("img", img, img.name);
            form_data.append("recipe", JSON.stringify(recipe));

            return Axioinstance.put(API_BASE_URL + "/app/recipe/"+ id+"/", form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
    }
    getRecipe(id){
        return Axioinstance.get(API_BASE_URL + "/app/recipe/"+id+"/")
    }
    deleteRecipe(id){
        return Axioinstance.delete(API_BASE_URL + "/app/recipe/"+id+"/")
    }
}
export default new RecipeService();