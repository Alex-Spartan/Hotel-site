import React from "react";

import { IoWifi } from "react-icons/io5";
import { IoTrashBinOutline } from "react-icons/io5";
import { IoShirt } from "react-icons/io5";
import { IoShieldHalfOutline } from "react-icons/io5";
import { IoCar } from "react-icons/io5";

const Amenities = ({ amenities, setAmenities}) => {
  if(!amenities){
    setAmenities([]);
  }
  const addCheckbox = (e) => {
    const {checked, name} = e.target;
    if (checked)  {
      setAmenities([...amenities, name])
    } else {
      setAmenities(amenities.filter((item) => item !== name))
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
      <label className="flex justify-start items-center border border-gray-600 p-3 gap-2 rounded-xl md:p-6 md:gap-3">
        <input type="checkbox" checked={amenities.includes("WiFi")} name="WiFi" onChange={addCheckbox}/>
        <IoWifi />
        <span>WiFi</span>
      </label>
      <label className="flex justify-start items-center border border-gray-600 p-3 gap-2 rounded-xl md:p-6 md:gap-3">
        <input type="checkbox" checked={amenities.includes("Housekeeping")} name="Housekeeping" onChange={addCheckbox}/>
        <IoTrashBinOutline />
        <span>Housekeeping services</span>
      </label>
      <label className="flex justify-start items-center border border-gray-600 p-3 gap-2 rounded-xl md:p-6 md:gap-3">
        <input type="checkbox" checked={amenities.includes("24-hour security")} name="24-hour security" onChange={addCheckbox}/>
        <IoShirt />
        <span>24-hour security</span>
      </label>
      <label className="flex justify-start items-center border border-gray-600 p-3 gap-2 rounded-xl md:p-6 md:gap-3">
        <input type="checkbox" checked={amenities.includes("Laundry")} name="Laundry" onChange={addCheckbox}/>
        <IoShieldHalfOutline />
        <span>Laundry</span>
      </label>
      <label className="flex justify-start items-center border border-gray-600 p-3 gap-2 rounded-xl md:p-6 md:gap-3">
        <input type="checkbox" checked={amenities.includes("Parking")} name="Parking" onChange={addCheckbox}/>
        <IoCar />
        <span>Parking</span>
      </label>
    </div>
  );
};

export default Amenities;
