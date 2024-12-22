import Route from "@/app/types/routes";
import { getRoutesInChosenArea } from "../services/routeService";

export function isPointInsidePolygon(
  point: { lat: number; lng: number },
  polygon: { lat: number; lng: number }[]
) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;

    const intersect =
      yi > point.lat !== yj > point.lat &&
      point.lng < ((xj - xi) * (point.lat - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

export function extractPolygonPoints(
  polygon: google.maps.Polygon
): { lat: number; lng: number }[] {
  const path = polygon.getPath();
  const points: { lat: number; lng: number }[] = [];
  for (let i = 0; i < path.getLength(); i++) {
    const point = path.getAt(i);
    points.push({ lat: point.lat(), lng: point.lng() });
  }
  return points;
}

export const handleMapClick = (
  event: google.maps.MapMouseEvent,
  setAreaPoints: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral[]>
  >,
  mapRef: React.MutableRefObject<google.maps.Map | null>,
  polygonRef: React.MutableRefObject<google.maps.Polygon | null>
) => {
  if (event.latLng) {
    const newPoint = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setAreaPoints((prevPoints) => {
      const updatedPoints = [...prevPoints, newPoint];

      // בניית הפוליגון רק אם יש יותר מ-2 נקודות
      if (updatedPoints.length > 2) {
        const polygon = new google.maps.Polygon({
          paths: updatedPoints,
          fillColor: "yellow",
          fillOpacity: 0.1,
          strokeColor: "yellow",
          strokeOpacity: 0.8,
          strokeWeight: 2,
        });
        polygon.setMap(mapRef.current);

        polygonRef.current = polygon;
      }

      return updatedPoints;
    });
  }
};

export const resetMap = (
  setAreaPoints: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral[]>
  >
) => {
  setAreaPoints([]);
};

export const displayPoints = async (
  setRoutes: (routes: Route[]) => void,
  setIsAreaChoosing: React.Dispatch<React.SetStateAction<boolean>>,
  areaPoints: google.maps.LatLngLiteral[],
  currentPage: number | undefined,
  appendRoutes: (routes: Route[]) => void,
  setLastPage: (lastPage: boolean) => void
) => {
  try {
    let data: { routes: Route[]; lastPage: boolean };
    // eslint-disable-next-line prefer-const
    data = await getRoutesInChosenArea(areaPoints, currentPage);
    debugger;
    if (data && data.routes) {
      if (currentPage === 1) {
        setRoutes(data.routes);
      } else if (appendRoutes) {
        appendRoutes(data.routes);
      }
    } else {
      setRoutes([]);
    }
    if (setLastPage)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.lastPage !== undefined
        ? setLastPage(data.lastPage)
        : setLastPage(true);
    setIsAreaChoosing(false);
  } catch (error) {
    console.error(error);
  }
};

// פונקציה להמיר כתובת לנקודות ציון
export const geocodeAddress = (
  address: string,
  setCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>,
  mapRef: React.MutableRefObject<google.maps.Map | null>,
  setAddress: React.Dispatch<React.SetStateAction<string>>
) => {
  const geocoder = new google.maps.Geocoder();
  if (geocoder && address) {
    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results) {
        const location = results[0].geometry.location;

        // עדכון הנקודות ציון אחרי המרת הכתובת
        setCenter({
          lat: location.lat(),
          lng: location.lng(),
        });

        // עדכון המפה אם קיימת
        if (mapRef.current) {
          mapRef.current.setZoom(15);
        }

        // עדכון הכתובת בתיבת החיפוש
        setAddress(results[0].formatted_address || "");
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  }
};
