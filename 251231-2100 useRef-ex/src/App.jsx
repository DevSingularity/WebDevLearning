import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  //Use case 1:
  let a=useRef(1);
  //runs on every render
  useEffect(()=>{
    a.current+=1;
    console.log(`Re-rendering, a=${a.current}`);
  })

  //Use case 2:
  let btnRef =useRef();
  const makeRed = ()=>{
    btnRef.current.style.background='purple';
  }
  return (
    <>
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
      <button onClick={makeRed}>Click me to make the count box purple</button>
    </>
  )
}

export default App
