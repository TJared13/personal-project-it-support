import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/userReducer';
import ticketReducer from './reducers/ticketReducer';
import commentReducer from './reducers/commentReducer';
import {combineReducers, createStore} from 'redux';

// function reducer(state) {
//     return state;
// };
const rootReducer = combineReducers({user: userReducer, ticket: ticketReducer, comment: commentReducer})

let store = createStore(rootReducer, composeWithDevTools())


export default store;