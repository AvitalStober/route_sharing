import Footer from "@/app/components/Footer";
import AddressSearch from "@/app/components/AddressSearch";
import React from "react";
import FilteredRoutes from "@/app/components/FilteredRoutes";

const page = () => {
  return (
    <div>
      <AddressSearch />
      <FilteredRoutes />
      <Footer />
    </div>
  );
};

export default page;
