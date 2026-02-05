import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    }, 
    complete: {
        type: Boolean,
        default: false
    }, 
    creartedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //model ke andar ka naam=> this mongoose.model("User", userSchema)
    },
    subTodos: [ // Array of subtodos
        {
            // type: String
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubTodo"
        }
    ]
}, {timestamps: true})

export const Todo = mongoose.model("Todo", todoSchema);