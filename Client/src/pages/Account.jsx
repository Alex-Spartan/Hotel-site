import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { UserContext } from "../UserContext";
import axios from "axios";

const Account = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !user) {
      navigate("/login");
    }
  }, [user, ready]);

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null)
    navigate("/")
  }
  let { subpage } = useParams();
  if (subpage === undefined) {
    (subpage = "profile");    
  } 
  function activeLink(type = null) {
    let classes = "";
    if (type === subpage || (subpage === undefined && type === "profile")) {
      classes += "text-white bg-[#272D2D] px-3 py-1 rounded-2xl";
    }
    return classes;
  }
  return (
    <>
      <nav className="flex justify-center font-semibold m-4">
        <div className="w-full mx-auto flex justify-center items-center gap-4 p-2 bg-[#23CE6B] rounded-xl md:p-4 lg:gap-8 lg:w-[25rem]">
          <Link to={"/account"} className={activeLink("profile")}>
            Profile
          </Link>
          <Link
            to={"/account/accomodation"}
            className={activeLink("accomodation")}
          >
            Accomodation
          </Link>
          <Link to={"/account/bookings"} className={activeLink("bookings")}>
            Bookings
          </Link>
        </div>
      </nav>
        {subpage === "profile" && (
      <div className="flex flex-col justify-center items-center w-1/2 mx-auto mt-[5rem]">
          logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="bg-[#23CE6B] w-full mt-2 p-1 rounded-full md:w-[35%]">log out</button>
      </div>
        )}
    </>
  );
};

export default Account;
