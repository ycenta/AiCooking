import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiCall from '../../axios';

const initialState = {
  openAiResponse: null,
  openAiResponses: [],
  chatBotResponse: null,
  similarRecipes: [],
  accompagnementsList: [],
  isOpenAiLoading: false,
  isOpenAisLoading: false,
  isChatBotIsLoading: false,
};

export const OpenAiContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'openAiResponse':
      return {
        ...state,
        openAiResponse: action.payload,
      };
    case 'openAiResponses':
      return {
        ...state,
        openAiResponses: action.payload,
      };
    case 'isOpenAiLoading':
      return {
        ...state,
        isOpenAiLoading: action.payload,
      };
    case 'chatBotResponse':
      return {
        ...state,
        chatBotResponse: action.payload,
      };
    case 'isOpenAisLoading':
      return {
        ...state,
        isOpenAisLoading: action.payload,
      };
    case 'similarRecipes':
      return {
        ...state,
        similarRecipes: action.payload,
      };
    case 'accompagnementsList':
      return {
        ...state,
        accompagnementsList: action.payload,
      }
    default:
      return state;
  }
};

export function OpenAiProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const postCourses = async (payload) => {
    dispatch({
      type: 'isOpenAiLoading',
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
        type: 'isOpenAiLoading',
        payload: false,
      });
    }
  };

  const postQuestion = async (payload) => {
    dispatch({
      type: 'isChatBotIsLoading',
      payload: true,
    });
    try {
      const data = await apiCall.post('/openai/assistant', payload);
      dispatch({
        type: 'chatBotResponse',
        payload: data.data[0]
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isChatBotIsLoading',
        payload: false,
      });
    }
  };

  const postSimilar = async (payload) => {
    dispatch({
      type: 'isOpenAisLoading',
      payload: true,
    });
    try {
      const data = await apiCall.post('/openai/get-similar-recettes', payload);
      console.log(data.data[0].message.content);
      dispatch({
        type: 'similarRecipes',
        payload: data.data[0].message.content
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isOpenAisLoading',
        payload: false,
      });
    }
  };

  const postAccompagnement = async (payload) => {
    dispatch({
      type: 'isOpenAisLoading',
      payload: true,
    });
    try {
      const data = await apiCall.post('/openai/accompagnement', payload);
      console.log(data.data[0].message.content);
      dispatch({
        type: 'accompagnementsList',
        payload: data.data[0].message.content
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: 'isOpenAisLoading',
        payload: false,
      });
    }
  };

  return (
    <OpenAiContext.Provider value={{
      openAiResponse: state.openAiResponse,
      openAiResponses: state.openAiResponses,
      isOpenAiLoading: state.isOpenAiLoading,
      isOpenAisLoading: state.isOpenAisLoading,
      isChatBotIsLoading: state.isChatBotIsLoading,
      chatBotResponse: state.chatBotResponse,
      similarRecipes: state.similarRecipes,
      accompagnementsList: state.accompagnementsList,
      postAccompagnement,
      postSimilar,
      postCourses,
      postQuestion
    }}>
      {children}
    </OpenAiContext.Provider>
  );
}

OpenAiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};