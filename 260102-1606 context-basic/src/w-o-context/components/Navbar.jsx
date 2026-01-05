import React from 'react'
import Button from './Button'
const Navbar = (props) => { //we can also use destructured ({count})
  return (
    <>
    <div>Navbar</div>
    <Button count={props.count}/>
    </>
  )
}

export default Navbar