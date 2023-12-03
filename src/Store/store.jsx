import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../handleSlice"; 
const rootReducer = combineReducers({
    userDetails: userDetailsReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
