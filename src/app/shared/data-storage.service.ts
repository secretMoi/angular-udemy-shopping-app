import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";

@Injectable({
  providedIn: 'root' // permet de ne pas l'ajouter dans le appmodule.ts
})
export class DataStorageService {
  private recipesUrl: string = 'https://angular-recipe-book-tuto-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private httpClientModule: HttpClient,
    private recipeService: RecipeService
  ) {

  }

  public storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClientModule.put(this.recipesUrl, recipes).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  fetchRecipes() {
    this.httpClientModule.get<Recipe[]>(this.recipesUrl).subscribe(
      recipes => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes)
      }
    )
  }
}
