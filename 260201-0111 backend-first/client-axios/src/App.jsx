import React, { useState, useEffect, use } from 'react'
import './App.css'
import axios from 'axios'

function App() {
const [billionaires, setBillionaires] = useState([])

  const apiUrl = import.meta.env.VITE_API_URL;
  //axios-no need to convert to json
  useEffect(() => {
    axios.get(`${apiUrl}/billionaires`)
      .then(res => {
        setBillionaires(res.data);
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
