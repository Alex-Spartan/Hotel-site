import React from "react";

import { IoWifi } from "react-icons/io5";
import { IoTrashBinOutline } from "react-icons/io5";
import { IoShirt } from "react-icons/io5";
import { IoShieldHalfOutline } from "react-icons/io5";
import { IoCar } from "react-icons/io5";

const Amenities = () => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
      <label className="flex justify-start items-center border border-gray-600 p-3 gap-2 rounded-xl md:p-6 md:gap-3">
        <input type="checkbox" />
        <IoWifi />
        <span>WiFi</span>
      </label>
      <label className="flex justify-start items-center border border-gray-600 p-3 gap-2 rounded-xl md:p-6 md:gap-3">
        <input type="checkbox" />
        <IoTrashBinOutline />
        <span>Housekeeping services</span>
      </label>
      <label className="flex justify-start items-center border border-gray-600 p-3 gap-2 rounded-xl md:p-6 md:gap-3">
        <input type="checkbox" />
        <IoShirt />
        <span>24-hour security</span>
      </label>
      <label className="flex justify-start items-center border border-gray-600 p-3 gap-2 rounded-xl md:p-6 md:gap-3">
        <input type="checkbox" />
        <IoShieldHalfOutline />
        <span>Laundry</span>
      </label>
      <label className="flex justify-start items-center border border-gray-600 p-3 gap-2 rounded-xl md:p-6 md:gap-3">
        <input type="checkbox" />
        <IoCar />
        <span>Parking</span>
      </label>
    </div>
  );
};

export default Amenities;
