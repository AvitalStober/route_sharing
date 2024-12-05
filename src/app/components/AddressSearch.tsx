
"use client";
// תיבת חיפוש להזנת כתובת
// השלמה אוטומטית של גוגל-מפס
import React, { useState } from "react";
import MapLoader from "./MapLoader";

const AddressSearch = () => {
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<{ age?: string; address?: string }>({});

  const handlePlaceSelect = (address: string) => {
    setAddress(address);
    setErrors((prev) => ({ ...prev, address: undefined }));
  };

  return (
    <>
      <MapLoader>
        <input
          id="address"
          placeholder="address"
          className={`mt-1 block w-full px-4 py-2 border ${
            errors.address ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          onFocus={(e) => {
            const autocomplete = new google.maps.places.Autocomplete(e.target);
            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace();
              handlePlaceSelect(place.formatted_address || "");
            });
          }}
        />
      </MapLoader>
      <h1>{address}</h1>
    </>
  );
};

export default AddressSearch;
