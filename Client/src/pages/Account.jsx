import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { UserContext } from "../UserContext";
import axios from "axios";
import Places from "../components/Places";
import { IoPerson } from "react-icons/io5";
import { IoBusiness } from "react-icons/io5";
import { IoList } from "react-icons/io5";

const Account = () => {
  const { user, ready, setUser, setReady } = useContext(UserContext);
  const navigate = useNavigate();

  

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
    navigate("/");
  };


  useEffect(() => {
    if (ready && !user) {
      navigate("/login");
    }
  }, [user, ready, navigate]);


  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  function activeLink(type = null) {
    let classes = "flex justify-center items-center gap-2";
    if (type === subpage || (subpage === undefined && type === "profile")) {
      classes += " text-white bg-[#272D2D] px-3 py-1 rounded-2xl";
    }
    return classes;
  }
  return (
    <>
      <nav className="flex justify-center font-semibold m-4">
        <div className="w-full mx-auto flex justify-center items-center gap-4 p-2 bg-[#23CE6B] rounded-xl md:p-4 lg:gap-8 lg:w-[25rem]">
          <Link to={"/account"} className={activeLink("profile")}>
            <IoPerson />
            Profile
          </Link>
          <Link
            to={"/account/accomodation"}
            className={activeLink("accomodation")}
          >
            <IoBusiness />
            Accomodation
          </Link>
          <Link to={"/account/bookings"} className={activeLink("bookings")}>
            <IoList />
            Bookings
          </Link>
        </div>
      </nav>
      {subpage === "profile" && (
        <div className="flex flex-col justify-center items-center w-1/2 mx-auto mt-[5rem]">
          logged in as {user.name} ({user.email})<br />
          <button
            onClick={logout}
            className="bg-[#23CE6B] w-full mt-2 p-1 rounded-full md:w-[35%]"
          >
            log out
          </button>
        </div>
      )}
      <Places />
    </>
  );
};

export default Account;
