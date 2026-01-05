import Layout from "./Layout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Github, { githubApiLoader } from "./components/Github/Github";
import Leetcode from "./components/Leetcode/Leetcode";
import User from "./components/User/User";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import './App.css';

function App() {

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     children: [
  //       {
  //         path: "",
  //         element: <Home />,
  //       },
  //       {
  //         path: "about",
  //         element: <About />,
  //       },
  //       {
  //         path: "contact",
  //         element: <Contact />,
  //       },
  //       {
  //         path: "github",
  //         element: <Github />,
  //       },
  //       {
  //         path: "user/:userid",
  //         element: <User />,
  //       },
  //     ],
  //   },
  // ]);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}> 
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route loader={githubApiLoader} path="github" element={<Github />} />
        <Route path="leetcode" element={<Leetcode />} />
        <Route path="user/:userid" element={<User />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
