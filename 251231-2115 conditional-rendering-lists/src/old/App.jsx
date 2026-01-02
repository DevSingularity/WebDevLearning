import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showBtn, setShowBtn] = useState(true)
  // const Todo = ({ todo }) => {
  //   return (<>
  //     <div className="m-4 border border-1 border-purple-400">

  //       <div className="todo">{todo.title}</div>
  //       <div className="todo">{todo.desc}</div>
  //     </div>
  //   </>)
  // }
  const todos = [
    { id: 1, title: "Learn React", desc: "Hooks, props, state" },
    { id: 2, title: "Practice", desc: "Build small projects" }
  ]



  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      {/* conditional rendering examples */}
      {showBtn ? <button>ShowBtn is true</button> : <button>ShowBtn is false</button>}
      {showBtn && <button>ShowBtn is true</button>}
      <p>
        <button onClick={() => setShowBtn(prev => !prev)}>Click me to change show btn status</button>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>

      {/* list rendering example */}
      {todos.map(todo => {
        // return <Todo key={todo.id} todo={todo} />
        return <div key={todo.title} className="m-4 border border-1 border-purple-400">

          <div className="todo">{todo.title}</div>
          <div className="todo">{todo.desc}</div>
        </div>
      })}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
