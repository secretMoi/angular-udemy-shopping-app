import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../auth/auth/auth.service";
import {User} from "../auth/auth/user.model";

@Injectable({
  providedIn: 'root' // permet de ne pas l'ajouter dans le appmodule.ts
})
export class DataStorageService {
  private recipesUrl: string = 'https://angular-recipe-book-tuto-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private httpClientModule: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
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
    // take prend la 1ère valeur et ensuite unsubscribe
    // exhaustMap() attend que le premier observable se complète
    return this.authService.user.pipe(take(1), exhaustMap(
      (user: User) => {
        return this.httpClientModule.get<Recipe[]>(
          this.recipesUrl,
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }
    ), map(recipes => { // map de rxjs
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        }) // map de tableau
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
