// "use client";
// // תיבת חיפוש להזנת כתובת
// // השלמה אוטומטית של גוגל-מפס
// import React, { useEffect, useState } from "react";
// import MapLoader from "./MapLoader";
// import { getUserAddress } from "@/app/functions/usersFunctions";

// const AddressSearch = () => {
//   const [address, setAddress] = useState("");
//   const [errors, setErrors] = useState<{ age?: string; address?: string }>({});

//   const handlePlaceSelect = (address: string) => {
//     setAddress(address);
//     setErrors((prev) => ({ ...prev, address: undefined }));
//   };

//   useEffect(() => {
//     const fetchAddress = async () => {
//       const address = await getUserAddress();
//       if (address) {
//         setAddress(address);
//       }
//     };

//     fetchAddress();
//   }, []);

//   return (
//     <>
//       <MapLoader>
//         <input
//           id="address"
//           placeholder={address}
//           className={`mt-1 block w-full px-4 py-2 border ${
//             errors.address ? "border-red-500" : "border-gray-300"
//           } rounded-md`}
//           onFocus={(e) => {
//             const autocomplete = new google.maps.places.Autocomplete(e.target);
//             autocomplete.addListener("place_changed", () => {
//               const place = autocomplete.getPlace();
//               handlePlaceSelect(place.formatted_address || "");
//             });
//           }}
//         />
//       </MapLoader>
//     </>
//   );
// };

// export default AddressSearch;




"use client";
// תיבת חיפוש להזנת כתובת
// השלמה אוטומטית של גוגל-מפס
import React, { useEffect, useState, useRef } from "react";
import MapLoader from "./MapLoader";
import { getUserAddress } from "@/app/functions/usersFunctions";

const AddressSearch = () => {
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<{ age?: string; address?: string }>({});
  const [inputWidth, setInputWidth] = useState(200); 
  const spanRef = useRef<HTMLSpanElement>(null);

  const handlePlaceSelect = (address: string) => {
    setAddress(address);
    setErrors((prev) => ({ ...prev, address: undefined }));
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const fetchedAddress = await getUserAddress();
      if (fetchedAddress) {
        setAddress(fetchedAddress);
      }
    };

    fetchAddress();
  }, []);

  useEffect(() => {
    if (spanRef.current) {
      const newWidth = spanRef.current.offsetWidth + 40; // מוסיפים padding
      setInputWidth(newWidth);
    }
  }, [address]);

  return (
    <>
      <MapLoader>
        {/* Span לחישוב רוחב הטקסט */}
        <span
          ref={spanRef}
          style={{
            visibility: "hidden",
            position: "absolute",
            whiteSpace: "nowrap",
          }}
        >
          {address}
        </span>
        <input
          id="address"
          placeholder={address}
          style={{ inlineSize: `${inputWidth}px` }}
          className={`mt-1 block px-4 py-2 border ${
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
    </>
  );
};

export default AddressSearch;
