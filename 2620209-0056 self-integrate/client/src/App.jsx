import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // fetch(`${apiUrl}/api/hello`) needed when no proxy set
    fetch(`/api/hello`)
      .then(res => res.json())
      .then(data => setVal(data));
  }, [])


  const [val, setVal] = useState(null);
  return (
    <>
      <h1>{val?.message || "The server is not connected"}</h1>
    </>
  )
}

export default App
