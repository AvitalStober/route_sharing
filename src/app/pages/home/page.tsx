"use client";
import Footer from "@/app/components/Footer";
import React, { useState } from "react";
import FilteredRoutes from "@/app/components/FilteredRoutes";
import AreaRoute from "@/app/components/AreaRoute";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isAreaChoosing, setIsAreaChoosing] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {!isAreaChoosing ? (
        <>
          <main className="flex-grow">
            <div className="flex justify-around px-4 py-2">
              <div className="flex-shrink-0">
                <FilteredRoutes />
              </div>
              {/* <div className="flex flex-col flex-shrink-0 items-center"> */}
                {/* <AddressSearch /> */}
                <button
                  onClick={() => {
                    setIsAreaChoosing(true);
                  }}
                  className="m-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300"
                >
                  סמן אזור נבחר
                </button>
                <div className="cursor-pointer" onClick={()=>{router.push('/pages/editUser')}}>
                <Image
                  className="flex flex-wrap justify-center"
                  src="https://res.cloudinary.com/dltlyphap/image/upload/v1733825852/user_crv80f.png"
                  height={70}
                  width={70}
                  alt="profil edit"
                />
                </div>
              {/* </div> */}
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <AreaRoute setIsAreaChoosing={setIsAreaChoosing} />
      )}
    </div>
  );
};

export default Page;
