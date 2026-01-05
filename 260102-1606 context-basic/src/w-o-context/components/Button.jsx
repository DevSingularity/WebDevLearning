import React from 'react'
import Component1 from './Component1'

const Button = ({count}) => {
  return (
    <button><span><Component1 count={count}/></span>I am a BUtton</button>
  )
}

export default Button