import {combineReducers} from 'redux'
import { USER } from './userReducer';

export const rootReducer= combineReducers({
 userreducer:USER
});