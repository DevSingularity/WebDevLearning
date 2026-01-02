import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cards, setData] = useState([]);
  //fetch api at the first render
  const fetchAPI = async () => {
    let a = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await a.json();
    setData(data);
  }
  useEffect(() => {
    fetchAPI();
  }, [])

  return (
    <>
      <div className="container">
        {cards.map((card) => {
          return <div key={card.id} className="card">
            <h1>{card.title}</h1>
            <p>{card.body}</p>
            <span>By: UserId: {card.userId}</span>

          </div>
        })}
      </div>
    </>
  )
}

export default App
