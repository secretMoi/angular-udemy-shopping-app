import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";

@Injectable({
  providedIn: 'root' // permet de ne pas l'ajouter dans le appmodule.ts
})
export class DataStorageService {
  constructor(
    private httpClientModule: HttpClient,
    private recipeService: RecipeService
  ) {

  }

  public storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClientModule.put(
      'https://angular-recipe-book-tuto-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    ).subscribe(
      response => {
        console.log(response);
      }
    )
  }
}
