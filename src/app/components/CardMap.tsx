import React, { useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import PopUpRoute from "./PopUpRoute";
import { Types } from "mongoose";
import { CardMapProps } from "../types/props/CardMapProps";

const CardMap: React.FC<CardMapProps> = ({
  points = [], // נותנים ערך ברירת מחדל ריק למערך
  route,
  expanded = false,
  filtered,
}) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  // משתני זמן כסטייט
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  //לפופאפ
  const [isExpanded, setIsExpanded] = useState<boolean>();

  // הגדרת סגנון המפה
  const mapContainerStyle = { inlineSize: "100%", blockSize: "250px" };
  // בדיקת אם המערך של נקודות ציון ריק
  const center = points.length > 0 ? points[0] : { lat: 0, lng: 0 };

  const calculateRoute = () => {
    // אם אין מספיק נקודות למסלול
    if (points.length < 2) {
      alert("עליך לבחור לפחות שתי נקודות למסלול.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const request: google.maps.DirectionsRequest = {
      origin: points[0],
      destination: points[points.length - 1],
      waypoints: points.slice(1, -1).map((point) => ({
        location: point,
        stopover: true,
      })),
      travelMode: google.maps.TravelMode.WALKING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        calculateWalkingTime(result);
        setDirections(result);
      } else {
        alert("לא ניתן לחשב מסלול.");
      }
    });
  };

  const calculateWalkingTime = (result: google.maps.DirectionsResult) => {
    let totalTimeInSeconds = 0;

    const route = result.routes[0];

    route.legs.forEach((leg) => {
      totalTimeInSeconds += leg.duration!.value;
    });

    const calculatedHours = Math.floor(totalTimeInSeconds / 3600); // שעות
    const calculatedMinutes = Math.floor((totalTimeInSeconds % 3600) / 60); // דקות

    setHours(calculatedHours);
    setMinutes(calculatedMinutes);
  };

  // הגדרת אפשרויות המפה
  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,  // מבטל את כל ה-UI של המפה (כפתורים, סרגל זום)
    zoomControl: false,      // מבטל את כפתור הגדלה/הקטנה
    scrollwheel: false,      // מבטל את האפשרות לשלוט בזום על ידי גלילת עכבר
    draggable: false,        // מבטל את האפשרות לגרור את המפה
    mapTypeControl: false,   // מבטל את אפשרות החלפת סוג המפה (לוויין, מפה רגילה)
    streetViewControl: false, // מבטל את האפשרות למעבר לתצוגת הרחוב
    fullscreenControl: true, // מבטל את כפתור המסך המלא
  };
  

  return (
    <>
      <div className="flex justify-center">
        {!isExpanded && !expanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="my-2 px-4 py-2 border-slate-700 text-slate-700 font-medium text-sm rounded-lg shadow hover:border-slate-700 hover:shadow-lg transition duration-300"
            // className="m-2 rounded-md py-2 px-4 border border-transparent text-center text-sm text-slate-700 transition-all shadow hover:shadow-lg focus:border-slate-700 focus:shadow-none active:border-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            ראה עוד
          </button>
        )}
        <button
          onClick={calculateRoute}
          className="my-2 px-4 py-2 border-blue-600 text-blue-700 font-medium text-sm rounded-lg shadow hover:border-blue-700 hover:shadow-lg transition duration-300"
        >
          חישוב מסלול וזמן הליכה
        </button>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center} // אם אין נקודות, המפה תתמקד ב־{ lat: 0, lng: 0 }
        zoom={12}
        options={mapOptions}  // הוספת האפשרויות למפה
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
              },
            }}
          />
        )}
      </GoogleMap>
      <div dir="rtl" className="h-[40px] mt-auto flex items-center">
        {(hours !== 0 || minutes !== 0) && (
          <p>
            הזמן הכולל להליכה: {hours !== 0 && `${hours} שעות`}
            {hours !== 0 && minutes !== 0 && ", "}
            {minutes && `${minutes} דקות`}
          </p>
        )}
      </div>

      {isExpanded && (
        <div className="mt-auto px-4 pb-4 pt-0 flex justify-end">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            // onClick={() => setIsExpanded(false)} // סגירה בלחיצה מחוץ לפופאפ
          >
            {route && (
              <PopUpRoute
                onClose={() => setIsExpanded(false)}
                routeId={route._id as Types.ObjectId}
                filtered={filtered}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CardMap;




// import React, { useState } from "react";
// import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
// import PopUpRoute from "./PopUpRoute";
// import { Types } from "mongoose";
// import { CardMapProps } from "../types/props/CardMapProps";

// const CardMap: React.FC<CardMapProps> = ({
//   points = [], // נותנים ערך ברירת מחדל ריק למערך
//   route,
//   expanded = false,
// }) => {
//   const [directions, setDirections] =
//     useState<google.maps.DirectionsResult | null>(null);

//   // משתני זמן כסטייט
//   const [hours, setHours] = useState<number>(0);
//   const [minutes, setMinutes] = useState<number>(0);
//   //לפופאפ
//   const [isExpanded, setIsExpanded] = useState<boolean>();

//   // הגדרת סגנון המפה
//   const mapContainerStyle = { inlineSize: "100%", blockSize: "250px" };
//   // בדיקת אם המערך של נקודות ציון ריק
//   const center = points.length > 0 ? points[0] : { lat: 0, lng: 0 };

//   // פונקציה לקביעת המיקום הנוכחי של המשתמש
//   // const getCurrentLocation = () => {
//   //   if (navigator.geolocation) {
//   //     navigator.geolocation.getCurrentPosition(
//   //       (position) => {
//   //         const { latitude, longitude } = position.coords;
//   //         const userLocation = { lat: latitude, lng: longitude };

//   //         // הוספת המיקום הנוכחי לנקודות
//   //         points.unshift(userLocation); // הוספת כנקודת מוצא
//   //         calculateRoute(userLocation); // חישוב המסלול עם המיקום הנוכחי
//   //       },
//   //       () => {
//   //         alert("לא ניתן לקבוע את המיקום שלך.");
//   //       }
//   //     );
//   //   } else {
//   //     alert("הדפדפן שלך לא תומך במיקום גיאוגרפי.");
//   //   }
//   // };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const userLocation = { lat: latitude, lng: longitude };
  
//           // הוספת המיקום הנוכחי לנקודות
//           points.unshift(userLocation); // הוספת כנקודת מוצא
//           calculateRoute(userLocation); // חישוב המסלול עם המיקום הנוכחי
//         },
//         () => {
//           alert("לא ניתן לקבוע את המיקום שלך.");
//         },
//         {
//           enableHighAccuracy: true, // דרישה לדיוק גבוה יותר
//           timeout: 10000,            // הזמן המרבי לחכות עד שהמיקום יתקבל
//           maximumAge: 0              // לא להשתמש במיקום ישן
//         }
//       );
//     } else {
//       alert("הדפדפן שלך לא תומך במיקום גיאוגרפי.");
//     }
//   };
  

//   const calculateRoute = (userLocation: google.maps.LatLngLiteral) => {
//     // אם אין מספיק נקודות למסלול
//     if (points.length < 2) {
//       alert("עליך לבחור לפחות שתי נקודות למסלול.");
//       return;
//     }

//     const directionsService = new google.maps.DirectionsService();
//     const request: google.maps.DirectionsRequest = {
//       origin: userLocation, // התחל מהמיקום של המשתמש
//       destination: points[points.length - 1], // סיום בנקודת היעד האחרונה במסלול
//       waypoints: points.slice(1, -1).map((point) => ({
//         location: point,
//         stopover: true,
//       })),
//       travelMode: google.maps.TravelMode.WALKING,
//     };

//     directionsService.route(request, (result, status) => {
//       if (status === google.maps.DirectionsStatus.OK && result) {
//         calculateWalkingTime(result);
//         setDirections(result);
//       } else {
//         alert("לא ניתן לחשב מסלול.");
//       }
//     });
//   };

//   const calculateWalkingTime = (result: google.maps.DirectionsResult) => {
//     let totalTimeInSeconds = 0;

//     const route = result.routes[0];

//     route.legs.forEach((leg) => {
//       totalTimeInSeconds += leg.duration!.value;
//     });

//     const calculatedHours = Math.floor(totalTimeInSeconds / 3600); // שעות
//     const calculatedMinutes = Math.floor((totalTimeInSeconds % 3600) / 60); // דקות

//     setHours(calculatedHours);
//     setMinutes(calculatedMinutes);
//   };

//   return (
//     <>
//       <div className="flex justify-center">
//         <button
//           onClick={getCurrentLocation} // השתמש בפונקציה כדי לקבל את המיקום הנוכחי
//           className="mb-4  px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300"
//         >
//           חישוב מסלול וזמן הליכה
//         </button>
//       </div>

//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center} // אם אין נקודות, המפה תתמקד ב־{ lat: 0, lng: 0 }
//         zoom={12}
//       >
//         {directions && (
//           <DirectionsRenderer
//             directions={directions}
//             options={{
//               polylineOptions: {
//                 strokeColor: "#FF0000",
//                 strokeOpacity: 0.8,
//                 strokeWeight: 2,
//               },
//             }}
//           />
//         )}
//       </GoogleMap>
//       <p>
//         הזמן הכולל להליכה: {hours} שעות, {minutes} דקות
//       </p>
//       <div className="mt-auto px-4 pb-4 pt-0 flex justify-end">
//         {!isExpanded && !expanded && (
//           <button
//             onClick={() => setIsExpanded(true)}
//             className="mt-auto rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//             type="button"
//           >
//             +
//           </button>
//         )}
//         {isExpanded && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-40"
//             // onClick={() => setIsExpanded(false)} // סגירה בלחיצה מחוץ לפופאפ
//           >
//             {route && (
//               <PopUpRoute
//                 onClose={() => setIsExpanded(false)}
//                 routeId={route._id as Types.ObjectId}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CardMap;













// קוד מעודכן עם הוספת מיקום נוכחי למסלול בתנאי שהוא בטווח של קילומטר

// import React, { useState } from "react";
// import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
// import PopUpRoute from "./PopUpRoute";
// import { Types } from "mongoose";
// import { CardMapProps } from "../types/props/CardMapProps";

// const CardMap: React.FC<CardMapProps> = ({
//   points = [],
//   route,
//   expanded = false,
// }) => {
//   const [directions, setDirections] =
//     useState<google.maps.DirectionsResult | null>(null);

//   const [hours, setHours] = useState<number>(0);
//   const [minutes, setMinutes] = useState<number>(0);
//   const [isExpanded, setIsExpanded] = useState<boolean>();

//   const mapContainerStyle = { inlineSize: "100%", blockSize: "250px" };
//   const center = points.length > 0 ? points[0] : { lat: 0, lng: 0 };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const userLocation = { lat: latitude, lng: longitude };

//           // נוודא שהמרחק לא יותר מקילומטר אחד
//           const distance = google.maps.geometry.spherical.computeDistanceBetween(
//             new google.maps.LatLng(userLocation.lat, userLocation.lng),
//             new google.maps.LatLng(points[0].lat, points[0].lng)
//           );

//           if (distance > 1000) {
//             alert("המרחק מהמסלול רחוק מידי (מעל 1 קילומטר). לא ניתן לבחור את המסלול.");
//           } else {
//             points.unshift(userLocation); // הוספת כנקודת מוצא
//             calculateRoute(userLocation); // חישוב המסלול עם המיקום הנוכחי
//           }
//         },
//         () => {
//           alert("לא ניתן לקבוע את המיקום שלך.");
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 0,
//         }
//       );
//     } else {
//       alert("הדפדפן שלך לא תומך במיקום גיאוגרפי.");
//     }
//   };

//   const calculateRoute = (userLocation: google.maps.LatLngLiteral) => {
//     if (points.length < 2) {
//       alert("עליך לבחור לפחות שתי נקודות למסלול.");
//       return;
//     }

//     const directionsService = new google.maps.DirectionsService();
//     const request: google.maps.DirectionsRequest = {
//       origin: userLocation,
//       destination: points[points.length - 1],
//       waypoints: points.slice(1, -1).map((point) => ({
//         location: point,
//         stopover: true,
//       })),
//       travelMode: google.maps.TravelMode.WALKING,
//     };

//     directionsService.route(request, (result, status) => {
//       if (status === google.maps.DirectionsStatus.OK && result) {
//         calculateWalkingTime(result);
//         setDirections(result);
//       } else {
//         alert("לא ניתן לחשב מסלול.");
//       }
//     });
//   };

//   const calculateWalkingTime = (result: google.maps.DirectionsResult) => {
//     let totalTimeInSeconds = 0;

//     const route = result.routes[0];

//     route.legs.forEach((leg) => {
//       totalTimeInSeconds += leg.duration!.value;
//     });

//     const calculatedHours = Math.floor(totalTimeInSeconds / 3600);
//     const calculatedMinutes = Math.floor((totalTimeInSeconds % 3600) / 60);

//     setHours(calculatedHours);
//     setMinutes(calculatedMinutes);
//   };

//   return (
//     <>
//       <div className="flex justify-center">
//         <button
//           onClick={getCurrentLocation}
//           className="mb-4  px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300"
//         >
//           חישוב מסלול וזמן הליכה
//         </button>
//       </div>

//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={12}
//       >
//         {directions && (
//           <DirectionsRenderer
//             directions={directions}
//             options={{
//               polylineOptions: {
//                 strokeColor: "#FF0000",
//                 strokeOpacity: 0.8,
//                 strokeWeight: 2,
//               },
//             }}
//           />
//         )}
//       </GoogleMap>
//       <p>
//         הזמן הכולל להליכה: {hours} שעות, {minutes} דקות
//       </p>
//       <div className="mt-auto px-4 pb-4 pt-0 flex justify-end">
//         {!isExpanded && !expanded && (
//           <button
//             onClick={() => setIsExpanded(true)}
//             className="mt-auto rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//             type="button"
//           >
//             +
//           </button>
//         )}
//         {isExpanded && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
//             {route && (
//               <PopUpRoute
//                 onClose={() => setIsExpanded(false)}
//                 routeId={route._id as Types.ObjectId}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CardMap;
