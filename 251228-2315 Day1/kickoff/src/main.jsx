import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Children } from 'react'

// #1 works
function MyApp(){
  return(
    <>
      This is a new experimental function demonstrating that we can call and parse other fns too directly
    </>
  )
}
// #2 doesnt work
/*
const reactEle={
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank'
    },
    Children: 'CLick to open google'
}
*/

// #3 correct args for react- works
const NewReactEle=(
  a, //type- optional
  {href: 'https://google.com', target: '_blank'} //attributes-compulsory
  // : 'Click here'
)
const AnotherEle=(
  <a href="https://google.com" target='_blank'>NewAnother visit google</a>
)


ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode> //works w/o this, but not a good practice
  // <MyApp/> //#1 works
  // reactEle // #2 doesnt work
  // NewReactEle
  // AnotherEle
  // </StrictMode>
)
