import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
const [billionaires, setBillionaires] = useState([])

  const apiUrl = import.meta.env.VITE_API_URL;
  //load on mount
  useEffect(()=>{
    fetch(`${apiUrl}/billionaires`)
      .then(res=>{
        if(!res.ok){
          throw new Error("No response from server");
        }
        return res.json();
      })
      .then(data => setBillionaires(data))
  }, [])

  return (
    <>
      <h1>Top {billionaires.length} Billionaires:</h1>
      <div>
        {billionaires.map((billionaire, index) => {
          return <div key={index}>
            <p>{index + 1}. Name: {billionaire.name}</p>
            <p>   Net Worth: {billionaire.netWorth}</p>
            <p>   Country: {billionaire.country}</p>
            <p>   Company: {billionaire.company}</p>
            <hr />
            </div>
        })}
      </div>
    </>
  )
}

export default App
