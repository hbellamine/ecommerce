import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import rootReducer from './rootReducer';
import thunk from 'redux-thunk' 

export const middlewares = [thunk,logger]; //shows the events that happens in the redux store on the console

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

export default store;
 