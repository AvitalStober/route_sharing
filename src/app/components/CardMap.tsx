import React, { useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

const CardMap: React.FC<{ points: google.maps.LatLngLiteral[] }> = ({
  points = [], // נותנים ערך ברירת מחדל ריק למערך
}) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  // משתני זמן כסטייט
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

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

    console.log(
      `הזמן הכולל להליכה: ${calculatedHours} שעות, ${calculatedMinutes} דקות`
    );
  };

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={calculateRoute}
          className="mb-4  px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300"
        >
          חישוב מסלול וזמן הליכה
        </button>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center} // אם אין נקודות, המפה תתמקד ב־{ lat: 0, lng: 0 }
        zoom={12}
      >
        {/* אם יש נקודות, נציג את המיקומים */}
        {points.length > 0 ? (
          points.map((point, index) => <Marker key={index} position={point} />)
        ) : (
          <p>אין נקודות למסלול</p> // אם אין נקודות, נראה הודעה
        )}
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
      <p>
        הזמן הכולל להליכה: {hours} שעות, {minutes} דקות
      </p>
    </>
  );
};

export default CardMap;
