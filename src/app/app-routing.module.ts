import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    // import le fichier then le nom de la classe
    loadChildren: () => import('./recipes/recipes.module').then(x => x.RecipesModule)
  },
  {
    path: 'shopping-list',
    // import le fichier then le nom de la classe
    loadChildren: () => import('./shopping-list/shopping-list.module').then(x => x.ShoppingListModule)
  },
  {
    path: 'auth',
    // import le fichier then le nom de la classe
    loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
  }
];

@NgModule({
  // preloadingStrategy preload les modules pour le lazy loading et rendre la nav plus fluide
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
