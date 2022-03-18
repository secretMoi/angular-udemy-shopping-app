import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface ShoppingList {
  ingredients: Ingredient[];
}

const initialState: ShoppingList = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient("Tomatoes", 4),
  ]
};

export function shoppingListReducer(state: ShoppingList = initialState,
                                    action: ShoppingListActions.ShoppingListActions
): ShoppingList
{
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      // state.ingredients.push() interdit !!!
      return {
        ...state, // fais une copie des données (state) en copiant les éléments
        ingredients: [...state.ingredients, action.payload] // recopie les ingrédients + ajoute le nouveau
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    default:
      return state;
  }
}

