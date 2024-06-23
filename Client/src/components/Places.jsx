import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { IoAdd } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";

import Amenities from "./Amenities";
import { UserContext } from "../UserContext";

const Places = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [landmark, setLandmark] = useState("");
  const [description, setDescription] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [photos, setPhotos] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [members, setMembers] = useState("");

  const { user } = useContext(UserContext);

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

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!photoLink) {
      return alert('Please provide link')
    }
    const { data } = await axios.post("/places/image-upload", {
      id: user._id,
      url: photoLink,
    });
    setPhotos((prev) => {
      return [...prev, data];
    });
    console.log(photos);
  };

  const upload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    data.append('id', user._id);
    axios.post('/places/upload', data, {
      headers: { 'Content-type': 'multipart/form-data' }
    }).then(res => {
      const { data } = res;
      setPhotos((prev) => {
        return [...prev, ...data];
      })
      e.target.value = null;
    }).catch(err => console.log(err));
  }

  return (
    <div className="mt-6">
      {action === "new" && (
        <div className="flex justify-center ">
          <Link className="flex items-center gap-1 text-white bg-[#272D2D] px-3 py-1 rounded-2xl">
            <div>
              <IoAdd />
            </div>
            Add new place
          </Link>
        </div>
      )}

      {action !== "new" && (
        <form>
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
            <div className="flex gap-2 justify-center items-center">
              <input
                type="text"
                value={photoLink}
                onChange={(e) => setValue(e, setPhotoLink)}
                className="mt-1 border border-gray-400 w-full rounded-full py-1 px-2 md:p-2"
                placeholder="You can put url links for image"
              />
              <button
                onClick={uploadImage}
                className="text-white bg-[#272D2D] rounded-full py-1 px-2"
              >
                Add photo
              </button>
            </div>
            <div className="flex">
              {photos.length > 0 && 
                photos.map((link, index) => (
                  <img
                    src={`http://localhost:3000/uploads/${link}`}
                    width={250}
                    height={200}
                    className="h-[15rem] rounded-xl object-cover"
                    alt="img"
                    key={index}
                  />
                ))}
            </div>
            <label className="bg-[#272D2D] w-[9rem] flex items-center gap-2 text-white p-4 mt-2 rounded-lg border-none md:w-[12rem]">
              <IoCloudUploadOutline size={40} className="hidden md:block" />{" "}
              Upload photos
              <input type="file" multiple className="hidden" onChange={upload} />
            </label>
          </div>

          <div className="m-4 md:m-8">
            {preInput("Amenities", "Show your services!")}
            <Amenities />
          </div>

          <div className="m-4 md:m-8">
            {preInput(
              "Extra info",
              "Let your customer know your dos and donts"
            )}
            <p className="text-sm md:text-base"></p>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setValue(e, setDescription)}
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
                  value={checkIn}
                  onChange={(e) => setValue(e, setCheckIn)}
                  className="mt-1 border border-gray-400 rounded-full py-1 px-2 md:p-2"
                />
              </label>
              <label className="flex flex-col font-semibold md:w-full">
                Check-out
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setValue(e, setCheckOut)}
                  className="mt-1 border border-gray-400 rounded-full py-1 px-2 md:p-2"
                />
              </label>
              <label className="flex flex-col font-semibold md:w-full">
                Members
                <input
                  type="text"
                  value={members}
                  onChange={(e) => setValue(e, setMembers)}
                  className="mt-1 border border-gray-400 rounded-full py-1 px-2 md:p-2"
                />
              </label>
            </div>
            <button className="mt-4 p-1 w-full border-none text-white bg-[#272D2D] rounded-lg">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Places;
