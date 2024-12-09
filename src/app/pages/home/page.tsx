'use client'
import Footer from "@/app/components/Footer";
import AddressSearch from "@/app/components/AddressSearch";
import React from "react";
import FilteredRoutes from "@/app/components/FilteredRoutes";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="flex justify-around px-4 py-2">
          <div className="flex-shrink-0">
            <FilteredRoutes/>
          </div>
          <div className="flex-shrink-0">
            <AddressSearch />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
