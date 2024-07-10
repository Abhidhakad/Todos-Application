import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    todos:localStorage.getItem('todos')? JSON.parse(localStorage.getItem('todos')) : [] 
}
const TodoSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
      setTodos: (state, action) => {
        state.todos = action.payload; // Fix: Use state.todos instead of state.token
      },
      completeTodos: (state) => {
        // You can add your logic for completing todos here
      },
    },

});
export const {setTodos} = TodoSlice.actions;
export default TodoSlice.reducer;

