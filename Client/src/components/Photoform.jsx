import { useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../UserContext";

import { IoCloudUploadOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";

const Photoform = ({ photos, setPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");

  const { user } = useContext(UserContext);

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!photoLink) {
      return alert("Please provide link");
    }
    const { data } = await axios.post("/places/image-upload", {
      id: user._id,
      url: photoLink,
    });
    setPhotos((prev) => {
      return [...prev, data];
    });
    e.target.value = null;
  };

  const upload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    data.append("id", user._id);
    axios
      .post("/places/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        const { data } = res;
        setPhotos((prev) => {
          return [...prev, ...data];
        });
        e.target.value = null;
      })
      .catch((err) => console.log(err));
  };

  const deletePhoto = (e, link) => {
    e.preventDefault();
    setPhotos((currentPhotos) => {
      const updatedPhotos = currentPhotos.filter((photo) => photo !== link);
      return updatedPhotos;
    });
  };

  const makeCover = (e, link) => {
    e.preventDefault();
    const photoArray = [...photos.filter(photo => photo !== link)]
    setPhotos([link, ...photoArray]);
  }

  return (
    <>
      <div className="flex gap-2 justify-center items-center">
        <input
          type="text"
          value={photoLink || ""}
          onChange={(e) => {
            e.preventDefault();
            setPhotoLink(e.target.value);
          }}
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
      <div className="flex flex-col md:flex-row gap-3 mt-2 mb-3">
        {photos.length > 0 &&
          photos.map((link, index) => (
            <div className="relative" key={index}>
              <img
                src={`http://localhost:3000/uploads/${link}`}
                width={250}
                height={200}
                className="h-[15rem] rounded-xl object-cover"
                alt="img"
              />
              <button
                onClick={(e) => deletePhoto(e, link)}
                className="absolute bottom-3 right-1/2 p-2 rounded-lg bg-gray-700 bg-opacity-80 md:bottom-2 md:right-3"
              >
                <IoTrashOutline />
              </button>
              <button
                onClick={(e) => makeCover(e, link)}
                className="absolute bottom-3 left-5 p-2 rounded-lg bg-gray-700 bg-opacity-80 md:bottom-2 md:left  -3"
              >
                <IoStarOutline />
              </button>
            </div>
          ))}
      </div>
      <label className="bg-[#272D2D] w-[9rem] flex items-center gap-2 text-white p-4 mt-2 rounded-lg border-none md:w-[12rem]">
        <IoCloudUploadOutline size={40} className="hidden md:block" /> Upload
        photos
        <input type="file" multiple className="hidden" onChange={upload} />
      </label>
    </>
  );
};

export default Photoform;
