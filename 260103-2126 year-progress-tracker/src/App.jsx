import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [progress, setProgress] = useState(0)
  const [timedata, setTimedata] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    elapsed:0,
    total:0
  })

  useEffect(()=>{
    const calculateProgress =() =>{
      const year=new Date().getFullYear()
      const startOfYear =new Date(year, 0, 1)
      const endOfYear=new Date(year+1, 0, 1)
      const now=new Date()

      const totalSeconds = (endOfYear - startOfYear) / 1000
      const elapsedSeconds = (now - startOfYear) / 1000
      const percentage = (elapsedSeconds / totalSeconds) * 100

      const remainingSeconds = totalSeconds - elapsedSeconds
      const days = Math.floor(remainingSeconds / 86400)
      const hours = Math.floor((remainingSeconds % 86400) / 3600)
      const minutes = Math.floor((remainingSeconds % 3600) / 60)
      const seconds = Math.floor(remainingSeconds % 60)

      setProgress(percentage)
      setTimedata({
        days,
        hours,
        minutes,
        seconds,
        elapsed: Math.floor(elapsedSeconds),
        total: Math.floor(totalSeconds)
      })
    }

    calculateProgress()
    const interval = setInterval(calculateProgress, 1000)

    return()=> clearInterval(interval)
  }, [])

  return (
    <>
      <div className="app">
        <div className="container">
          <div className="percentage">
            {progress.toFixed(6)}%
          </div>
          <div className="subtitle">
            OF {new Date().getFullYear()}
          </div>
          <div className="time-remaining">
            {timedata.days}d {timedata.hours}h {timedata.minutes}m {timedata.seconds}s
          </div>
          <div className="time-stats">
            {timedata.elapsed.toLocaleString()} / {timedata.total.toLocaleString()} seconds
          </div>
        </div>
      </div>
    </>
  )
}

export default App
