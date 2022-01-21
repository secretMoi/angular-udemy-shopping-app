import { Injectable } from '@angular/core';
import {Recipe} from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Test recipe', 'This is a test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341'),
    new Recipe('Another Test recipe', 'This is a test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/classic-lasange-4a66137.jpg?quality=90&webp=true&resize=375,341')
  ];

  getRecipes(): Recipe[] {
    // retourne une copie du tableau sinon il sera passé par référence et pourra être modifié
    return this.recipes.slice();
  }
}
