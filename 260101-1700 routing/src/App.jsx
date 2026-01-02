import './App.css'
import Navbar from './compontents/Navbar'
import Home from './compontents/Home'
import About from './compontents/About'
import Login from './compontents/Login'
import User from './compontents/User'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
function App() {
  const router= createBrowserRouter([
    {
      path: "/",
      element: <><Navbar/><Home/></>
    },
    {
      path: "/about",
      element: <><Navbar/><About/></>
    },
    {
      path: "/login",
      element: <><Navbar/><Login/></>
    },
    {
      path: "/user/:username",
      element: <><Navbar/><User /></>
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
