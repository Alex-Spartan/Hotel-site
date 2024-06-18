import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const setValue = (e, setVariable) => {
    setVariable(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", { name, email, password, phone });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <LoginForm title="Sign In">
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
                onChange = {(e) => setValue(e, setEmail)}
              />
            </div>
          </div>
          <div></div>
          <div className="mt-6">
            <div className="mb-1">
              <label className="">Name: </label>
            </div>
            <div className="relative">
              <input
                type="text"
                className="w-full border-none rounded-md px-2 py-1 flex-1 text-black"
                value={name}
                onChange = {(e) => setValue(e, setName)}
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-1">
              <label className="">Phone no: </label>
            </div>
            <div>
              <input
                type="text"
                className="w-full border-none rounded-md px-2 py-1 flex-1 text-black"
                value={phone}
                onChange = {(e) => setValue(e, setPhone )}
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-1">
              <label className="">Password: </label>
            </div>
            <div>
              <input
                type="text"
                className="w-full border-none rounded-md px-2 py-1 flex-1 text-black"
                value={password}
                onChange = {(e) => setValue(e, setPassword)}
              />
            </div>
          </div>
          <div className="mt-6 mb-2">
            <button className="border-none rounded-2xl px-8 py-1 w-full bg-[#46494C] ">
              Signup
            </button>
          </div>
        </div>
      </form>
      
      <div className="flex gap-2">
        <p className="text-black">Already have an account? </p>
        <Link className="text-blue-700 underline" to="/login">Login</Link>
      </div>
      
    </LoginForm>
  );
};

export default Signup;
