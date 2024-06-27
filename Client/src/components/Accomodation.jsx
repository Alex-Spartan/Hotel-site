import { Link, useParams } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

import AccomodationForm from "./AccomodationForm";
import { useEffect, useState } from "react";
import axios from "axios";

const Accomodation = () => {
  const { action } = useParams();
  const [accomodation, setAccomodation] = useState([]);
  useEffect(() => {
    const fetchAccomodation = async () => {
      const response = await axios.get("/places/accomodation");
      setAccomodation(response.data);
    };
    fetchAccomodation();
  }, [setAccomodation]);

  return (
    <div className="mt-6">
      {action !== "new" && (
        <div className="flex justify-center ">
          <Link
            to={"new"}
            className="flex items-center gap-1 text-white bg-[#272D2D] px-3 py-1 rounded-2xl"
          >
            <div>
              <IoAdd />
            </div>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && <AccomodationForm />}

      {accomodation &&
        accomodation.map((place, index) => (
          <div className="m-4 md:flex md:justify-between" key={index}>
            <div className="border border-black rounded-md md:w-full md:p-4 md:h-full md:flex md:justify-between">
              <div className="md:flex">
                <img
                  width={220}
                  height={220}
                  src={`http://localhost:3000/uploads/${place.photos[0]}`}
                  alt="image"
                  className="w-full md:w-[50rem]"
                />
              </div>
              <div className="my-5 px-4 flex justify-between md:flex-col">
                <Link to={`/account/accomodation/${place._id}`}>
                  <div className="ml-2">
                    <p className="text-2xl font-bold ">{place.title}</p>
                    <p className="font-semibold">{place.location}</p>
                  </div>
                  <div className="w-2/3">
                    <p>{place.description}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Accomodation;
