import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import sessionReducer from './session';
import usersReducer from './users';
import businessPagesReducer from './businessPages';
import reviewReducer from './reviews';

export const rootReducer = combineReducers({
    session: sessionReducer,
    users: usersReducer,
    businessPages: businessPagesReducer,
    reviews: reviewReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (prevState = {}) => {
    return createStore(rootReducer, prevState, enhancer)
}
export default configureStore;