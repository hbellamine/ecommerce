import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import rootReducer from './rootReducer'; 

export const middlewares = [logger]; //shows the events that happens in the redux store on the console

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

export default store;
