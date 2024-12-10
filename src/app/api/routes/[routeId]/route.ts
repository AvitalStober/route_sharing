import connect from "@/app/lib/DB/connectDB";
import Route from "@/app/lib/models/routeModel";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { routeId: string } }
) {
  try {
    await connect();
    const { routeId } = await params;
    const routes = await Route.find({ _id: routeId });
    return NextResponse.json(routes, { status: 200 });
  } catch (error) {
    console.error("Error fetching routes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { routeId: string } }
) {
  console.log("server");
  
  try {
    await connect();

    const { routeId } = params;
    const { newRate, gallery } = await request.json();

    const route = await Route.findById({ routeId });
    if (!route) {
      return NextResponse.json(
        { error: "Route not found" },
        { status: 404 }
      );
    }
    if (newRate) {
      const newUpdateRate =
        (route.rate * route.ratingNum + newRate) / (route.ratingNum + 1);

      route.rate = newUpdateRate;
      route.ratingNum = route.ratingNum + 1;

      await route.save();
    }
    if(gallery){
      route.gallery = gallery;
      await route.save;
    }

    return NextResponse.json(route, { status: 200 });
  } catch (error) {
    console.error("Error updating route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function PUT(
//   request: Request,
//   { params }: { params: { routeId: string } }
// ) {
//   try {
//     await connect();
//     const { routeId } = await params;
//     console.log(routeId);

//     const routes = await Route.find({ ownerId: routeId });
//     return NextResponse.json(routes, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching routes:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
