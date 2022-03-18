import {Ingredient} from "../shared/ingredient.model";
import {Action} from "@ngrx/store";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      // state.ingredients.push() interdit !!!

      return {
        ...state, // fais une copie des données (state)
        ingredients: [...state.ingredients, action] // recopie les ingrédients + ajoute le nouveau
      };
      break;
  }
}

