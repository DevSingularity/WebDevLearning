import React, { useContext } from 'react'
import Component1 from './Component1'
import { counterContext } from '../context/context'


const Button = () => {
  const counter = useContext(counterContext)
  return (
    <button onClick={()=>counter.setCount((count) => count + 1)}><span><Component1 /></span>I am a BUtton</button>
  )
}

export default Button