import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/AuthSlice';
import profileReducer from "../slices/ProfileSlice";
import todoReducer from "../slices/TodoSlice"; // Use "todoReducer" instead of "TodoSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    todos: todoReducer
})

export default rootReducer;
