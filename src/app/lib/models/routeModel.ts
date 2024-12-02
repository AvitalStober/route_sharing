import IRoute from "@/app/types/routes";
import mongoose, { Model, Schema } from "mongoose";

const LatLngLiteralSchema: Schema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const RoutesSchema: Schema<IRoute> = new Schema({
  ownerId: { type: Schema.Types.ObjectId, required: true },
  pointsArray: { type: [LatLngLiteralSchema], required: true },
  description: { type: String, required: true },
  rate: { type: Number, required: true },
  ratingNum: { type: Number, required: true },
  gallery: { type: [String], required: true },
});

const Routes: Model<IRoute> =
  mongoose.models.routes || mongoose.model("routes", RoutesSchema);

export default Routes;
