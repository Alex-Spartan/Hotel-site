import axios from "axios";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import { UserContextProvider } from "./UserContext";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Account from "./pages/Account";


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true; 

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<Home />} />,
      <Route path="/login" element={<Login />} />,
      <Route path="/signup" element={<Signup />} />,
      <Route path="/account/:subpage?" element={<Account />} />
    ])
  );
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
