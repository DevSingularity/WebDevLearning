import { useState } from 'react'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        making a counter: Number: {count}
        <button onClick={() => { setCount(count + 1) }}>Increase count</button>
        <button onClick={() => { setCount(count - 1) }}>Decrease count</button>
        <p>To demonstrate the use of useState hook..</p>
        <p>useState is a hook used to change the required dom element when a process is done/completed</p>
        <div>When useState is called, it returns an array of two elemnts
          <ul>
            <li>arr[0]=currentState</li>
            <li>arr[1]=theSetterFunction</li>
          </ul>
        </div>
        <p>Syntax: const [count, setCount] = useState(0); here 0 is the initial value of count</p>
        final count: {count}
      </div>
      <strong>In React, using the setState function triggers a re-render, ensuring that what the user sees always matches the current data in your code. <i>Rerendered on every change</i></strong>
      <div>
        Now using props: these title and desc are my props which are passed to card and then card uses them as args to put in it. Giving me reusability for them
        <Card title='First article' desc='this is my first card' />
        <Card title='second article' desc='this is my second card' />
        <Card title='third article' desc='this is my third card' />
      </div>
    </>
  )
}

export default App
