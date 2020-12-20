import { createStore } from 'redux';
import rootReducer from '../reducers/reducer';

const store = createStore(rootReducer, composedEnhancer);

export default store;
