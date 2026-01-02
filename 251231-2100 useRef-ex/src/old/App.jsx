import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const a=useRef(0); //helps set mutable value, but doesnt re-renders after update
  const btnRef=useRef();
  useEffect(() => {
    a.current=a.current+1;
    console.log(`Rendering and the value of a is ${a.current}`)
  })
  
  const customRef=()=>{
    btnRef.current.style.backgroundColor='red';
  }
  return (
    <>
      <div>
        
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button ref={btnRef} onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={customRef}>Click me to make box red</button>
    </>
  )
}

export default App
