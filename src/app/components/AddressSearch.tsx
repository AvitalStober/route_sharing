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
//           classNameName={`mt-1 block w-full px-4 py-2 border ${
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

// "use client";
// // תיבת חיפוש להזנת כתובת
// // השלמה אוטומטית של גוגל-מפס
// import React, { useEffect, useState, useRef } from "react";
// import MapLoader from "./MapLoader";
// import { getUserAddress } from "@/app/functions/usersFunctions";

// const AddressSearch = () => {
//   const [address, setAddress] = useState("");
//   const [errors, setErrors] = useState<{ age?: string; address?: string }>({});
//   const [inputWidth, setInputWidth] = useState(200);
//   const spanRef = useRef<HTMLSpanElement>(null);

//   const handlePlaceSelect = (address: string) => {
//     setAddress(address);
//     setErrors((prev) => ({ ...prev, address: undefined }));
//   };

//   useEffect(() => {
//     const fetchAddress = async () => {
//       const fetchedAddress = await getUserAddress();
//       if (fetchedAddress) {
//         setAddress(fetchedAddress);
//       }
//     };

//     fetchAddress();
//   }, []);

//   useEffect(() => {
//     if (spanRef.current) {
//       const newWidth = spanRef.current.offsetWidth + 40; // מוסיפים padding
//       setInputWidth(newWidth);
//     }
//   }, [address]);

//   return (
//     <>
//       <MapLoader>
//         {/* Span לחישוב רוחב הטקסט */}
//         <span
//           ref={spanRef}
//           style={{
//             visibility: "hidden",
//             position: "absolute",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {address}
//         </span>
//         <input
//           id="address"
//           placeholder={address}
//           style={{ inlineSize: `${inputWidth}px` }}
//           classNameName={`mt-1 block px-4 py-2 border ${
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
import useStore from "@/app/store/store";
import { fetchRoutesInYourArea } from "../functions/filteredRoutesFunctions";

const AddressSearch = () => {
  const [address, setAddress] = useState(""); // כתובת שכותב המשתמש
  const [userAddress, setUserAddress] = useState(""); // כתובת שכותב המשתמש
  const [errors, setErrors] = useState<{ address?: string }>({});
  const [isSelectedFromAutocomplete, setIsSelectedFromAutocomplete] =
    useState(false); // דגל האם הכתובת נבחרה מההשלמה
  const [initialAddress, setInitialAddress] = useState(""); // כתובת מקורית לפני שינוי
  const spanRef = useRef<HTMLSpanElement>(null);
  const setRoutes = useStore((state) => state.setRoutes);
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setLastPage = useStore((state) => state.setLastPage);
  const setChangeAddress = useStore((state) => state.setChangeAddress);

  // פונקציה שתבדוק אם הכתובת תקינה
  const isValidAddress = (input: string): boolean => {
    return input.trim().length > 0; // חוקים בסיסיים - כתובת לא ריקה
  };

  const handlePlaceSelect = (selectedAddress: string) => {
    setAddress(selectedAddress); // עדכון הכתובת הנבחרת
    setErrors((prev) => ({ ...prev, address: undefined })); // איפוס שגיאות
    setIsSelectedFromAutocomplete(true); // הצבעה על כך שהכתובת נבחרה מתוך ההשלמה
  };

  useEffect(() => {
    const userTokenFromStorage = localStorage.getItem("userToken");
    const fetchAddress = async () => {
      const { getUserAddress } = await import("@/app/functions/usersFunctions");

      const fetchedAddress = await getUserAddress();
      if (fetchedAddress) {
        setUserAddress(fetchedAddress);
        if (address == "") setAddress(fetchedAddress); // הצגת כתובת אם קיימת
        setInitialAddress(fetchedAddress); // שמירת הכתובת המקורית
      }
    };
    if (userTokenFromStorage) {
      fetchAddress();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value); // עדכון כתובת לפי הזנה חופשית של המשתמש
    setIsSelectedFromAutocomplete(false); // אם המשתמש התחיל להקליד, לא נבחרה כתובת מתוך ההשלמה
  };

  // אם הכתובת שהוזנה לא חוקית, נחזיר את הכתובת המקורית
  useEffect(() => {
    // אם הכתובת לא תקינה, נזין בחזרה את הכתובת המקורית
    if (!isSelectedFromAutocomplete && !isValidAddress(address)) {
      setAddress(initialAddress); // חוזר לכתובת המקורית
      setChangeAddress("");
    } else {
      if (address !== userAddress) {
        const newPage = 1;
        setCurrentPage(newPage);
        setChangeAddress(address);
        fetchRoutesInYourArea(
          setRoutes,
          currentPage,
          setLastPage,
          address
        );
      }
    }
  }, [address, isSelectedFromAutocomplete, initialAddress]);

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
        <div className="flex rounded-full border-2 border-gray-400 overflow-hidden max-w-52 mx-auto font-[sans-serif]">
          <input
            dir="rtl"
            type="text"
            placeholder={address}
            className={`w-full outline-none bg-white text-sm px-5 py-3 ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            onChange={handleInputChange}
            onFocus={(e) => {
              const autocomplete = new google.maps.places.Autocomplete(e.target);
              autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                handlePlaceSelect(place.formatted_address || ""); // עדכון הכתובת הנבחרת
              });
            }}
          />
          <button
            type="button"
            className="flex items-center justify-center bg-gray-400 hover:bg-gray-600 px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="18px"
              className="fill-white"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </button>
        </div>
        {/* <input
          id="address"
          value={address} // הצגת הכתובת במשתנה address
          placeholder="הזן כתובת"
          style={{
            inlineSize: `${inputWidth}px`,
            textAlign: "right", // יישור טקסט לימין
          }}
          classNameName={`mt-1 block px-4 py-2 border ${
            errors.address ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          onFocus={(e) => {
            const autocomplete = new google.maps.places.Autocomplete(e.target);
            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace();
              handlePlaceSelect(place.formatted_address || ""); // עדכון הכתובת הנבחרת
            });
          }}
          onChange={handleInputChange} // עדכון הכתובת בזמן שהמשתמש מקליד
        /> */}
      </MapLoader>
    </>
  );
};

export default AddressSearch;
