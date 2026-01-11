import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos:[     //multiple objs ka ek array banaya
        {       //this is an obj
            id: 1,
            todo: "this is a msg",
            completed: false,
        }, {}
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

export const useTodo=()=>{
    return useContext(TodoContext);
}

export const TodoContextProvider = TodoContext.Provider