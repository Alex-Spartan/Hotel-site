import axios from "axios";

import Login from "./components/Login";
import Signup from "./components/Signup";

import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import Home from "./pages/Home";

axios.defaults.baseURL = 'http://localhost:3000';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path='/' element={<Home />} />,
      <Route path='/login' element={<Login />} />,
      <Route path='/signup' element={<Signup />} />
    ])
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App
