import { Types } from "mongoose";

export default interface IRoute {
  ownerId: Types.ObjectId;
  pointsArray: [google.maps.LatLngLiteral];
  description: string;
  rate: number;
  ratingNum: number;
  gallery: [string];
}
