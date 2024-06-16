import React from "react";
import { IoHome } from "react-icons/io5";
import Header from "../components/Header";

const Home = () => {
  return (
    <Header>
      <div className="flex gap-2 justify-center items-center md:m-2">
        <IoHome className="text-3xl md:text-2xl" />
        <div className="hidden md:block">GoTrip</div>
      </div>
      <div className="flex justify-center items-center md:m-2">
        <button className="border-none p-2 rounded-xl bg-[#01BAEF] shadow-md font-medium">
          <a href="/login">Login/SignUp</a>
        </button>
      </div>
    </ Header>
  );
};

export default Home;
