import { useContext, useEffect, useState } from "react";

import Amenities from "./Amenities";
import Photoform from "./Photoform";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate, useParams } from "react-router-dom";

const AccomodationForm = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [landmark, setLandmark] = useState("");
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [photos, setPhotos] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [members, setMembers] = useState("");

  const [uploadStatus, setUploadStatus] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("/places/accomodation/" + id)
      .then((res) => {
        setTitle(res.data.title);
        setLocation(res.data.location);
        setLandmark(res.data.landmark);
        setDescription(res.data.description);
        setPhotos(res.data.photos);
        setAmenities(res.data.amenities);
        setExtraInfo(res.data.extraInfo);
        setCheckIn(new Date(res.data.checkIn).toISOString().split('T')[0]);
        setCheckOut(new Date(res.data.checkOut).toISOString().split('T')[0]);
        setMembers(res.data.members);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const setValue = (e, setVariable) => {
    e.preventDefault();
    setVariable(e.target.value);
  };

  const preInput = (title, description) => {
    return (
      <>
        <h1 className="text-xl font-semibold md:text-3xl md:font-normal">
          {title}
        </h1>
        <p className="text-sm md:text-base">{description}</p>
      </>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      await axios
        .post("/places/accomodation", {
          owner: user._id,
          title,
          location,
          landmark,
          description,
          photos,
          amenities,
          extraInfo,
          checkIn,
          checkOut,
          members,
        })
        .then((res) => {
          setUploadStatus(true);
          navigate("/");
        });
    } else {
      axios.put("/places/accomodation/" + id, {
        owner: user._id,
        title,
        location,
        landmark,
        description,
        photos,
        amenities,
        extraInfo,
        checkIn,
        checkOut,
        members,      
      })
      .then((res) => navigate("/account/accomodation"))
    }
  };

  return (
    <>
      {uploadStatus && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded relative m-4 md:m-8"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">
            {" "}
            Your accomodation has been added.
          </span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="m-4 md:m-8">
          {preInput("Title", "Let your Hotel be famous. Put it's name")}
          <input
            type="text"
            value={title}
            onChange={(e) => setValue(e, setTitle)}
            className="mt-1 border border-gray-400 w-full rounded-full py-1 px-2 md:p-2"
          />
        </div>

        <div className="m-4 md:m-8">
          Where can we find this wonderful place?
          {preInput("Location", "")}
          <input
            type="text"
            value={location}
            onChange={(e) => setValue(e, setLocation)}
            className="mt-1 border border-gray-400 w-full rounded-full py-1 px-2 md:p-2"
          />
        </div>

        <div className="m-4 md:m-8">
          {preInput("Landmark", "Eg. 10 min walk from XYZ bakery")}
          <input
            type="text"
            value={landmark}
            onChange={(e) => setValue(e, setLandmark)}
            className="mt-1 border border-gray-400 w-full rounded-full py-1 px-2 md:p-2"
          />
        </div>

        <div className="m-4 md:m-8">
          {preInput("Description", "Describe your heaven")}
          <textarea
            type="text"
            value={description}
            onChange={(e) => setValue(e, setDescription)}
            className="mt-1 h-[6rem] border border-gray-400 w-full rounded-lg py-1 px-2 md:p-2"
          />
        </div>

        <div className="m-4 md:m-8">
          {preInput("Photos", "Let our eyes be astonished with it.")}
          <Photoform photos={photos} setPhotos={setPhotos} />
        </div>

        <div className="m-4 md:m-8">
          {preInput("Amenities", "Show your services!")}
          <Amenities amenities={amenities} setAmenities={setAmenities} />
        </div>

        <div className="m-4 md:m-8">
          {preInput("Extra info", "Let your customer know your dos and donts")}
          <p className="text-sm md:text-base"></p>
          <textarea
            type="text"
            value={extraInfo}
            onChange={(e) => setValue(e, setExtraInfo)}
            className="mt-1 h-[6rem] border border-gray-400 w-full rounded-lg py-1 px-2 md:p-2"
            placeholder="Eg. Cancellation till check-in available"
          />
        </div>

        <div className="m-4 md:m-8">
          <h1 className="text-xl font-semibold md:text-3xl md:font-normal">
            Check-in & Check-out
          </h1>
          <div className="flex flex-col gap-2 md:flex-row">
            <label className="flex flex-col font-semibold md:w-full">
              Check-in
              <input
                type="date"
                required
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                }}
                className="mt-1 border border-gray-400 rounded-full py-1 px-2 md:p-2"
              />
            </label>
            <label className="flex flex-col font-semibold md:w-full">
              Check-out
              <input
                type="date"
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="mt-1 border border-gray-400 rounded-full py-1 px-2 md:p-2"
              />
            </label>
            <label className="flex flex-col font-semibold md:w-full">
              Members
              <input
                type="number"
                required
                value={members}
                placeholder="3"
                onChange={(e) => setValue(e, setMembers)}
                className="mt-1 border border-gray-400 rounded-full py-1 px-2 md:p-2"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 p-1 w-full border-none text-white bg-[#272D2D] rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AccomodationForm;
