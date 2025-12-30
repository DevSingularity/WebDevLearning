import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += '1234567890';
    if (charAllowed) str += '~!@#$%^&*()_+`-=[]{}/?<>,.;:';

    for (let i = 1; i <= length; i++) {
      let posn = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(posn);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed])

  const passRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator])


  return (
    <>
      {/*Container*/}
      <div className='w-full max-w-lg mx-auto shadow-md mt-3 flex flex-col gap-2 text-orange-400 bg-gray-600 justify-around items-center rounded-2xl'>

        <h1 className='font-bold text-xl'>Password Generator</h1>

        {/*Password field*/}
        <div className='flex justify-center items-center p-2 rounded-lg overflow-hidden'>

          <input
            type="text"
            id='password'
            value={password}
            placeholder='Password'
            className='outline-none w-full text-black bg-white p-2'
            readOnly
            ref={passRef}
          />
          <button
            className='text-white text-xl outline-none p-2 font-bold bg-blue-600 hover:bg-blue-800'
            onClick={copyPasswordToClipboard}
          >Copy</button>

        </div>

        {/*Options*/}
        <div className='flex flex-wrap gap-2 justify-center items-center'>

          {/*Length*/}
          <div className='flex gap-1 justify-center align-center'>
            <input
              type="range"
              id="length"
              value={length}
              max={100} min={6}
              onChange={(e) => setLength(e.target.value)}
              className='cursor-pointer'
            />
            <label htmlFor="length">Length: {length}</label>
          </div>

          {/*Number*/}
          <div className='flex justify-center align-center'>
            <input
              type="checkbox"
              id="number"
              onClick={() => setNumAllowed(prev => !prev)}
            />
            <label htmlFor="number">Number</label>
          </div>

          {/*Character*/}
          <div className='flex justify-center align-center'>
            <input
              type="checkbox"
              id="char"
              onClick={() => setCharAllowed(prev => !prev)}
            />
            <label htmlFor="char">Character</label>
          </div>

        </div>

      </div>
    </>
  );
}

export default App