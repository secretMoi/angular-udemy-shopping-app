import {Component, Injectable, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
@Injectable()
export class RecipesComponent implements OnInit {
  selectedRecipe!: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
