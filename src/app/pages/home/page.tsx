import Footer from "@/app/components/Footer";
import AddressSearch from "@/app/components/AddressSearch";
import Routes from "@/app/components/Routes";
import React from "react";

const page = () => {
  return (
    <div>
      <AddressSearch />
      <Routes />
      <Footer />
    </div>
  );
};

export default page;
