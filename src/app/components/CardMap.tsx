import React, { useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import PopUpRoute from "./PopUpRoute";
import { Types } from "mongoose";
import { CardMapProps } from "../types/props/CardMapProps";
import { addRouteToHistoryRoute } from "../functions/cardsFunctions";
import { calcKMAndUpdate } from "../functions/googleMapsFunction";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  // הגדרת סגנון המפה
  const mapContainerStyle = {
    inlineSize: "100%",
    blockSize: "250px",
    borderRadius: "11px",
  };
  // בדיקת אם המערך של נקודות ציון ריק
  const center = points.length > 0 ? points[0] : { lat: 0, lng: 0 };

  const calculateRoute = () => {
    console.log("enter");

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
        alert("לא ניתן לחשב מסלול");
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
    mapTypeControl: false, // מבטל את אפשרות החלפת סוג המפה (לוויין, מפה רגילה)
    streetViewControl: false, // מבטל את האפשרות למעבר לתצוגת הרחוב
    fullscreenControl: true, // מבטל את כפתור המסך המלא
  };
  
  const handleClick = (routeId: string) => {
    router.push(`/pages/RealtimeNavigation?routeId=${routeId}`);
  };

  useEffect(() => {
    calculateRoute();
  }, [minutes]);

  return (
    <>
      <div className="flex justify-center">
        {!isExpanded && !expanded && (
          <>
            {/* כפתור בחירת מסלול */}
            {filtered === 1 && (
              <div dir="rtl" className="m-2">
                <button
                  onClick={() => {
                    addRouteToHistoryRoute(route!._id as string);
                    handleClick(route!._id as string);
                    calcKMAndUpdate(route!.pointsArray);
                  }}
                  className="px-4 py-2 font-semibold rounded-lg shadow hover:shadow-md border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-75 text-green-700 hover:border-green-800"
                >
                 צא לדרך🚶‍♂️
                </button>
              </div>
            )}
            {/* ראה עוד */}
            <button
              onClick={() => setIsExpanded(true)}
              className="my-2 px-4 py-2 border-slate-700 text-slate-700 font-medium text-sm rounded-lg shadow hover:border-slate-700 hover:shadow-lg transition duration-300"
              type="button"
            >
              מידע נוסף 👀 
            </button>
          </>
        )}
      </div>

      <div className="mb-2 border border-black rounded-xl">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center} // אם אין נקודות, המפה תתמקד ב־{ lat: 0, lng: 0 }
          zoom={12}
          options={mapOptions} // הוספת האפשרויות למפה
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
      </div>
      <div dir="rtl" className="h-[40px] mt-auto flex items-center">
        {(hours !== 0 || minutes !== 0) && (
          <p>
            זמן הליכה: {hours !== 0 && `${hours} שעות`}
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
