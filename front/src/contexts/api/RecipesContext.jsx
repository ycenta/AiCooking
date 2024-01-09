import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '../../axios';

const initialState = {
    recipe: null,
    recipes: [],
    recipeNotFound: null,
    isRecipeLoading: false,
    isRecipesLoading: false,
};

export const RecipesContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'recipe':
      return {
        ...state,
        recipe: action.payload,
      };
    case 'recipes':
      return {
        ...state,
        recipes: action.payload,
      };
    case 'isRecipeLoading':
      return {
        ...state,
        isRecipeLoading: action.payload,
      };
    case 'isRecipesLoading':
      return {
        ...state,
        isRecipesLoading: action.payload,
      };
    case 'recipeNotFound':
      return {
        ...state,
        recipeNotFound: action.payload,
      }
    default:
      return state;
  }
};

export function RecipesProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const get = async (payload) => {
    dispatch({
      type: 'isRecipesLoading',
      payload: true,
    });
    try {
      const data = await apiCall.get('/recipes');
      dispatch({
        type: 'recipes',
        payload: data.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isRecipesLoading',
        payload: false,
      });
    }
  }

  const getById = async (payload) => {
    dispatch({
      type: 'isRecipeLoading',
      payload: true,
    });
    try {
      const data = await apiCall.get(`/recipes/${payload}`);
      dispatch({
        type: 'recipe',
        payload: data.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isRecipeLoading',
        payload: false,
      });
    }
  }

  //Collection of recipes with name %name%
  const getByName = async (payload) => {
    dispatch({
      type: 'isRecipesLoading',
      payload: true,
    });
    try {
      const data = await apiCall.get(`/recipes?name=${payload}`);

      if (data.data.length>0) {
        console.log(data.data);
        dispatch({
          type: 'recipes',
          payload: data.data,
        });
        dispatch({
          type: 'recipeNotFound',
          payload: null
        });
      } else {
        dispatch(
          {
            type: 'recipes', 
            payload: data.data,
          }
        );
        dispatch({
          type: 'recipeNotFound',
          payload: payload
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isRecipesLoading',
        payload: false,
      });
    }
  } 

  return (
    <RecipesContext.Provider value={{
        get,
        getByName,
        recipes: state.recipes,
        isRecipesLoading: state.isRecipesLoading,
        getById,
        recipe: state.recipe,
        isRecipeLoading: state.isRecipeLoading,
        recipeNotFound: state.recipeNotFound,
    }}>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};