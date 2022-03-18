import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(
  state: { ingredients: (Ingredient | undefined)[]; } = initialState,
  action: ShoppingListActions.AddIngredient
) {

  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      // state.ingredients.push() interdit !!!

      return {
        ...state, // fais une copie des données (state)
        ingredients: [...state.ingredients, action.payload] // recopie les ingrédients + ajoute le nouveau
      };
    default:
      return state;
  }
}

