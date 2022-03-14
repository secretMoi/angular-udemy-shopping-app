import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {AuthGuard} from "../auth/auth.guard";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipesDetailComponent} from "./recipes-detail/recipes-detail.component";
import {RecipesResolverService} from "./recipes-resolver.service";
import {RouterModule} from "@angular/router";

const routes = [
  { path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent }, // new doit être devant pour ne pas être lu comme l'id
      { path: ':id', component: RecipesDetailComponent, resolve: [RecipesResolverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class RecipesRoutingModule {

}
