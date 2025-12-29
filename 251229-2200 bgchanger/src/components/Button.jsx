import React from 'react'

const Button = (props) => {
  return (
    <button className='outline-none px-4 rounded-3xl' style={{backgroundColor: props.color, color: (props.color === 'black' ? 'white' : (props.color === 'blue' || props.color === 'green' ? 'white' : 'initial'))}} onClick={() => setColor(props.color)}>{props.color}</button>
  )
}

export default Button