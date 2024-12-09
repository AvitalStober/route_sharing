export function isPointInsidePolygon(point: { lat: number; lng: number }, polygon: { lat: number; lng: number }[]) {
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
  

export function extractPolygonPoints(polygon: google.maps.Polygon): { lat: number; lng: number }[] {
    const path = polygon.getPath();
    const points: { lat: number; lng: number }[] = [];
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      points.push({ lat: point.lat(), lng: point.lng() });
    }
    return points;
  }
