import {NgModule} from "@angular/core";
import {RecipesListComponent} from "./recipes-list/recipes-list.component";
import {RecipesDetailComponent} from "./recipes-detail/recipes-detail.component";
import {RecipesComponent} from "./recipes.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeItemComponent} from "./recipes-list/recipe-item/recipe-item.component";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeItemComponent,
  ],
  exports: [
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeItemComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class RecipesModule {

}
