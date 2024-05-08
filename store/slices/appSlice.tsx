import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


const initialValue: StateProp[] = [];

const appSlice = createSlice({
    name: "app",
    initialState: initialValue,
    reducers: { 
        addToDo: (state, action) => {
            state.push(action.payload);
        },
        removeToDo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload);
        },
        updateToDo: (state, action) => {
            return state.map((todo) => {
                if(todo.id === action.payload){
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            })
        },
        clearCompleted: (state) => {
            return state.filter((todo) => !todo.completed);
        }
    },
});

export default appSlice.reducer;
export const { addToDo, removeToDo, updateToDo , clearCompleted } = appSlice.actions;
export const appSelector = (state:RootState) => state.appReducer;