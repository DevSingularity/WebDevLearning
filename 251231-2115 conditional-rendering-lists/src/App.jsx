import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  {/* conditional rendering */ }
  const [showBtn, setShowBtn] = useState(true);


  // renderig list
  // Step1: Create a list
  const todo = [
    { id: 1, title: "React learning", user: 'student' },
    { id: 2, title: "React teaching", user: 'teacher' }
  ]
  //Step2: a.create component outside
  const Todo = ({ todo }) => {
    return (
      <>
        <div className="container">
          <div className="card">
            <h1>{todo.title}</h1>
            <h3>{todo.user}</h3>
          </div>
        </div>
      </>
    )
  }
  //Step 2: b. create a component inside

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
      {/* conditional rendering */}
      {showBtn ? <button>showBtn is true</button> : <button>showBtn is false</button>}
      {showBtn && <button>showBtn is true</button>}
      <p>
        <button onClick={() => setShowBtn(prev => !prev)}>CLick me to check for showBtn nature</button>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>

      {/* rendering lists */}
      {todo.map(todo => {
        // return <Todo key={todo.id} todo={todo}/>
        return <div key={todo.id} className="container">
          <div className="card">
            <h1>{todo.title}</h1>
            <h3>{todo.user}</h3>
          </div>
        </div>
      })}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
