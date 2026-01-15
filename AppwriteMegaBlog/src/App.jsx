import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './redux/slices/authSlice'
import { Header, Footer } from './components/'

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        dispatch(logout());
        console.log("No active session found");
      })
      .finally(() => setLoading(false));
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-900 text-white">
      <div className='w-full block'>
        <Header />
        <main>
          TODO: {/* <Outlet /> */}
        </main>
        <Footer />
      </div>

    </div>
  ) : <div className="m-auto mt-10 flex h-15 w-48 items-center justify-center rounded-lg bg-red-100 px-4 text-center font-semibold text-red-700">Loading...</div>
}

export default App
