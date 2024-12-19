import { Types } from "mongoose";

export interface PopUpRouteProps {
    onClose: () => void; // פונקציה לסגירת הפופאפ
    routeId: Types.ObjectId;
    filtered: number;
  }