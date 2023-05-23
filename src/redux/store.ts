import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import ajaxCallsInProgress from './reducers/ajaxStatusReducer';
import appReducer from './reducers/appReducer';

const reducer = combineReducers({
  ajaxCallsInProgress,
  app: appReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
