import connect from "@/app/lib/DB/connectDB";
import Route from "@/app/lib/models/routeModel";
import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   { params }: { params: { ownerId: string } }
// ) {
//   try {
//     await connect();
//     const { ownerId } = await params;
//     const routes = await Route.find({ ownerId: ownerId });
//     return NextResponse.json(routes, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching routes:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
export async function GET(
  request: Request,
  { params }: { params: { ownerId: string } }
) {
  try {
    await connect();
    const { ownerId } = params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "6");
    const skip = (page - 1) * limit;

    console.log("page", page, "limit", limit);

    const routes = await Route.find({ ownerId: ownerId })
      .skip(skip)
      .limit(limit);

    const totalCount = await Route.countDocuments({ ownerId: ownerId });
    return NextResponse.json(
      {
        routes,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching routes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
