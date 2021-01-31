import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import createSagaMiddle from 'redux-saga'
import rootReducer from './rootReducer';
import rootSaga from './rootSaga'
import thunk from 'redux-thunk' 

const sagaMiddleware = createSagaMiddle()

export const middlewares = [thunk,sagaMiddleware,logger]; // logger shows the events that happens in the redux store on the console

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga)

export default store;
 