import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import { UserContext } from "../UserContext";
const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="w-full bg-[#FBFBFF] m-0">
      <div className="py-4 px-5 p-2 md:py-4 md:px-16">
        <div className="w-full m-auto flex flex-row justify-between">
          <Link className="flex gap-2 justify-center items-center md:m-2">
            <IoHome className="text-3xl md:block md:text-2xl" />
            <div to={"/"} className="hidden md:block">
              GoTrip
            </div>
          </Link>
          <div
            className={`${
              user === null ? "flex" : "hidden"
            } justify-center items-center gap-1 p-1 md:m-2`}
          >
            <button className=" border-none p-2 rounded-xl bg-[#01BAEF] shadow-md font-medium">
              <Link to="/login">Login/SignUp</Link>
            </button>
          </div>
          <Link
            to={"/account"}
            className={`${
              user === null ? "hidden" : "flex"
            } justify-center items-center gap-1 p-1 md:m-2 bg-slate-300 md:px-2 md:py-1 rounded-3xl`}
          >
            <div className="md:block cursor-pointer">
              <IoMenuSharp className="hidden text-2xl md:block" />
            </div>
            <div>
              <IoPersonCircleSharp className="text-3xl cursor-pointer md:cursor-default" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
