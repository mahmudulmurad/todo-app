import {userReducer} from './user/reducer';
import { taskReducer } from "./tasks/reducer";
import {combineReducers} from 'redux';

export const rootReducer=combineReducers({
    user:userReducer,
    task:taskReducer
})