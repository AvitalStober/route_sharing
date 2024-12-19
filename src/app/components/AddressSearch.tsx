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
//           className={`mt-1 block px-4 py-2 border ${
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
  const [inputWidth, setInputWidth] = useState(200); // רוחב ההזנה של השדה
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

  useEffect(() => {
    if (spanRef.current) {
      const newWidth = Math.max(spanRef.current.offsetWidth + 40, 200); // הגדרת רוחב מינימלי של 200
      setInputWidth(newWidth);
    }
  }, [address]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value); // עדכון כתובת לפי הזנה חופשית של המשתמש
    setIsSelectedFromAutocomplete(false);
    setChangeAddress(false) // אם המשתמש התחיל להקליד, לא נבחרה כתובת מתוך ההשלמה
  };

  // אם הכתובת שהוזנה לא חוקית, נחזיר את הכתובת המקורית
  useEffect(() => {
    // אם הכתובת לא תקינה, נזין בחזרה את הכתובת המקורית
    if (!isSelectedFromAutocomplete && !isValidAddress(address)) {
      setAddress(initialAddress); // חוזר לכתובת המקורית
    } else {
      if (address !== userAddress) {
        const newPage = 1;
        setCurrentPage(newPage);
        setChangeAddress(true)
        setLastPage(false);
        fetchRoutesInYourArea(
          setRoutes,
          currentPage,
          setLastPage,
          undefined,
          undefined,
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
        <input
          id="address"
          value={address} // הצגת הכתובת במשתנה address
          placeholder="הזן כתובת"
          style={{
            inlineSize: `${inputWidth}px`,
            textAlign: "right", // יישור טקסט לימין
          }}
          className={`mt-1 block px-4 py-2 border ${
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
        />
      </MapLoader>
    </>
  );
};

export default AddressSearch;
