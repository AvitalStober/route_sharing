import connect from "@/app/lib/DB/connectDB";
import Routes from "@/app/lib/models/routeModel";
import { NextResponse } from "next/server";
import { Client } from "@googlemaps/google-maps-services-js";

// הגדרת הלקוח של גוגל מפס
const googleMaps = new Client({});

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // רדיוס כדור הארץ במטרים
  const toRad = (x: number) => (x * Math.PI) / 180;

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lng2 - lng1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // מרחק במטרים
}

export async function POST(request: Request) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: true, message: "Address is required" },
        { status: 400 }
      );
    }

    await connect();

    const response = await googleMaps.geocode({
      params: {
        address: address,
        key: process.env.NEXT_PUBLIC_GOOGLMAPS_API_KEY!,
      },
    });

    const { lat, lng } = response.data.results[0].geometry.location;

    const allRoutes = await Routes.find();

    const nearbyRoutes = allRoutes.filter((route) =>
      route.pointsArray.every((point: { lat: number; lng: number }) =>
        calculateDistance(lat, lng, point.lat, point.lng) <= 3000
      )
    );

    if (!nearbyRoutes.length) {
      return NextResponse.json(
        { error: false, message: "No routes found within 3 km of the address" },
        { status: 210 }
      );
    }

    return NextResponse.json({ routes: nearbyRoutes }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: true, message: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}