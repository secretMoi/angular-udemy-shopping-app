import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
@Injectable()
export class RecipesListComponent implements OnInit {
   @Output() recipeWasSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  recipes!: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
