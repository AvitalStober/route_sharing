import Footer from "@/app/components/Footer";
import AddressSearch from "@/app/components/AddressSearch";
import React from "react";
import FilteredRoutes from "@/app/components/FilteredRoutes";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <AddressSearch />
        <FilteredRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default page;
