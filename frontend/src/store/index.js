import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// frontend/src/store/index.js
// ...
import sessionReducer from './session';
import spotsReducer from "./spots"
import reviewReducer from "./reviews";
import bookingReducer from"./booking"
import searchReducer from "./search"
import favoritesReducer from "./favorites"

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewReducer,
  bookings: bookingReducer,
  search: searchReducer,
  favorites: favoritesReducer

});
// ...

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
