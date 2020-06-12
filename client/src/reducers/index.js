import {combineReducers} from 'redux';
import {crudReducers} from './app'
import {modalReducers} from './employee'
import {reducer as formReducer} from 'redux-form'
import authReducer from "./auth";

const rootReducer = combineReducers({
    crudReducers,
    modalReducers,
    auth: authReducer,
    form: formReducer

})

export default rootReducer;
