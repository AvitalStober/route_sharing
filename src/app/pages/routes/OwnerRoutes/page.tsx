// "use client";
// import React, { useEffect, useState } from "react";
// import { getRoutesByOwner } from "@/app/services/routeService";
// import Route from "@/app/types/routes";
// import Cards from "@/app/components/Cards";
// import useStore from "@/app/store/store";

// const Routes = () => {
//   const [ownerRoutes, setOwnerRoutes] = useState<Route[]>([]); // עדכון לסוג מערך של Routes
//   const token = useStore((state) => state.token?.id);
//   const userId = token || "";

//   useEffect(() => {
//     const FetchUserRoutes = async () => {
//       try {
//         const ownerR = await getRoutesByOwner(userId);
//         setOwnerRoutes(ownerR);
//       } catch (error) {
//         console.error("Error fetching user routes:", error);
//       }
//     };
//     FetchUserRoutes();
//   }, [userId]);

//   return (
//     <div>
//       <Cards Routes={ownerRoutes} />
//     </div>
//   );
// };

// export default Routes;


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page