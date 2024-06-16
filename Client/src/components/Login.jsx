import React, { useState } from "react";
import { loginBg } from "../assets/Index";

import { Form, Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setValue = (e, setVariable) => {
    setVariable(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("/auth/login", { email, password}, { withCredentials: true })
      navigate("/")
    } 
    catch (error) {
      console.log(error);
    }
  }
  return (
    <LoginForm title="Login" img={loginBg}>
      <form onSubmit={handleSubmit}>
        <div className="text-lg">
          <div className="mt-6">
            <div className="mb-1">
              <label className="">Email: </label>
            </div>
            <div className="relative">
              <input
                type="email"
                className="w-full border-none rounded-md px-2 py-1 flex-1 text-black"
                value={email}
                onChange={(e) => setValue(e, setEmail)}
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-1">
              <label className="">Password: </label>
            </div>
            <div className="relative">
              <input
                type="password"
                className="w-full border-none rounded-md px-2 py-1 flex-1 text-black"
                value={password}
                onChange={(e) => setValue(e, setPassword)}
              />
            </div>
          </div>
          <div className="mt-6 mb-4">
            <button className="border-none rounded-lg px-8 py-1 w-full bg-[#46494C] ">
              Login
            </button>
          </div>
        </div>
      </form>
      
      <div className="flex gap-2">
        <p className="text-black">Don't have an account? </p>
        <Link className="text-blue-700 underline" to="/signin">Signin</Link>
      </div>
    </LoginForm>
  );
};

export default Login;
