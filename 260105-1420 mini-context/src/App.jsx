import "./App.css";
import React from "react";
import UserContextProvider from "./context/UserContextProvider";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
function App() {
  return (
    <>
      <UserContextProvider>
        <div>Hi Singularity</div>
        <Login />
        <Profile />
      </UserContextProvider>
    </>
  );
}

export default App;
