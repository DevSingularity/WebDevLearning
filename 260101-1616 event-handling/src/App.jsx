import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // const [name, setName] = useState("Singularity")
  const [form, setForm]=useState({})

  const handleClick = () => {
    alert("Hey I am clicked")
  }
  const handleMouseOver = () => {
    alert("Hey I am mouseover")
  }
  const handleChange =(e)=>{
    // setName(e.target.value)
    setForm({...form, [e.target.name]:e.target.value})
    console.log(form);
    // console.log is synchronous-> runs before update but update takes time
    // {email: 'h'}
    // {email: 'he'}
    // {email: 'het'}
    // {email: 'het', phone: 'w'}
    // {email: 'het', phone: 'wo'}
    // {email: 'het', phone: 'wor'}
    // {email: 'het', phone: 'worl'}
    // {email: 'het', phone: 'world'}
  }
  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <div style={{width:60}} onMouseOver={handleMouseOver}>Hi</div>

      <input type="text" name='email' value={form.email?form.email:""} onChange={handleChange}/>
      <input type="text" name='phone' value={form.phone?form.phone:""} onChange={handleChange}/>
    </>
  )
}

export default App
