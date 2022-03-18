import { ShoppingList,  shoppingListReducer } from './shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
  shoppingList: ShoppingList;
}


export const reducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingListReducer
};
