// import Image from "next/image";
// import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  // const router = useRouter();
  return (
    <footer className="bg-gray-800 text-white py-4" dir="rtl">
      <div className="container mx-auto text-center">
        <p className="text-xs">Routes Sharing &copy; כל הזכויות שמורות</p>
        {/* קישורי מידע */}
        <div className="mt-2">
          <a
            href="/pages/about"
            className="text-white hover:text-gray-400 mx-2"
          >
            אודותינו
          </a>
          <a
            href="/pages/privacy"
            className="text-white hover:text-gray-400 mx-2"
          >
            מדיניות פרטיות
          </a>
          <a
            href="/pages/terms"
            className="text-white hover:text-gray-400 mx-2"
          >
            תנאי שימוש
          </a>
        </div>
        {/* קישורי רשתות חברתיות */}
        {/* <div>
          <p>עקבו אחרינו ב:</p>
          <div className="flex justify-center">
            <div
              className="cursor-pointer m-2"
              onClick={() => {
                router.push("/pages/editUser");
              }}
            >
              <Image
                className="flex flex-wrap justify-center"
                src="https://res.cloudinary.com/dltlyphap/image/upload/v1733217346/facebook_zbulob.png"
                height={20}
                width={20}
                alt="profil edit"
              />
            </div>
            <div
              className="cursor-pointer m-2"
              onClick={() => {
                router.push("/pages/editUser");
              }}
            >
              <Image
                className="flex flex-wrap justify-center"
                src="https://res.cloudinary.com/dltlyphap/image/upload/v1733832740/logos_v3m3j7.png"
                height={20}
                width={20}
                alt="profil edit"
              />
            </div>
            <div
              className="cursor-pointer m-2"
              onClick={() => {
                router.push("/pages/editUser");
              }}
            >
              <Image
                className="flex flex-wrap justify-center"
                src="https://res.cloudinary.com/dltlyphap/image/upload/v1733216561/instagram_pfumqz.png"
                height={20}
                width={20}
                alt="profil edit"
              />
            </div>
            
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
