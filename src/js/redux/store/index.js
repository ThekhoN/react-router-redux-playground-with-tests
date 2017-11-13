import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware, routerReducer } from "react-router-redux";

import auth from "../modules/auth";

export const history = createHistory();
const middleware = routerMiddleware(history);

const rootReducer = combineReducers({
  auth,
  router: routerReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middleware))
);

export default store;
