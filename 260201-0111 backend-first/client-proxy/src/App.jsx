import React, { useState, useEffect, use } from 'react'
import './App.css'

function App() {
const [billionaires, setBillionaires] = useState([])

  //axios-no need to convert to json
  useEffect(() => {
    fetch('/api/billionaires')
      .then(res => res.json())
      .then(data => {
        setBillionaires(data);
      })
      .catch(err => {
        console.log("Error fetching billionaires:", err);
      });
  }, []);

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
