import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '../../axios';

const initialState = {
  openAiResponse: null,
  users: [],
  isUserLoading: false,
  isUsersLoading: false,
};

export const OpenAiContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'openAiResponse':
      return {
        ...state,
        openAiResponse: action.payload,
      };
    case 'users':
      return {
        ...state,
        users: action.payload,
      };
    case 'isUserLoading':
      return {
        ...state,
        isUserLoading: action.payload,
      };
    case 'isUsersLoading':
      return {
        ...state,
        isUsersLoading: action.payload,
      };
    default:
      return state;
  }
};

export function OpenAiProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const postCourses = async (payload) => {
    dispatch({
      type: 'isUserLoading',
      payload: true,
    });
    try {
      const data = await apiCall.post('/openai/get-courses', payload);
      dispatch({
        type: 'openAiResponse',
        payload: data.data[0]
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isUserLoading',
        payload: false,
      });
    }
  };

  return (
    <OpenAiContext.Provider value={{
      openAiResponse: state.openAiResponse,
      users: state.users,
      isUserLoading: state.isUserLoading,
      isUsersLoading: state.isUsersLoading,
      postCourses,
    }}>
      {children}
    </OpenAiContext.Provider>
  );
}

OpenAiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};