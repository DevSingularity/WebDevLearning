import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = {
    todos: [{id: 1, text: 'Ghost'}]
}

function addTodoHandler(state, action) {
    const newTodo = {
        id: nanoid(), 
        text: action.payload
    }
    state.todos.push(newTodo)
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: addTodoHandler,
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo=> todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const {id, text} = action.payload
            const existingTodo = state.todos.find(todo => todo.id === id)
            if (existingTodo) {
                existingTodo.text = text
            }
        }
    }
})

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions //exporting indiv reducers-> to use them in components

export default todoSlice.reducer // for awareness to store
// saare reducers ko export karna hi padega, aur store mein lena padega