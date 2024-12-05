// import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Routes Sharing. All Rights Reserved.
        </p>
        <div className="mt-4">
          <a href="/about" className="text-white hover:text-gray-400 mx-2">
            About Us
          </a>
          <a href="/privacy" className="text-white hover:text-gray-400 mx-2">
            Privacy Policy
          </a>
          <a href="/terms" className="text-white hover:text-gray-400 mx-2">
            Terms of Service
          </a>
        </div>
        <div className="mt-4">
          <p>Follow us on:</p>
          <div className="flex justify-center">
            <a
              href="https://www.facebook.com"
              className="text-white hover:text-gray-400 mx-2"
            >
              Facebook
              {/* <Image
                width={30}
                height={30}
                src={
                  "https://res.cloudinary.com/dltlyphap/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1733217346/facebook_zbulob.png"
                }
                alt="instegram"
              /> */}
            </a>
            <a
              href="https://www.twitter.com"
              className="text-white hover:text-gray-400 mx-2"
            >
              Twitter
              {/* <Image
                width={30}
                height={30}
                src={
                  "https://res.cloudinary.com/dltlyphap/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1733217716/twitter-alt-square_vrgywy.png"
                }
                alt="instegram"
              /> */}
            </a>
            <a
              href="https://www.instagram.com"
              className="text-white hover:text-gray-400 mx-2"
            >
              Instagram
              {/* <Image
                width={30}
                height={30}
                src={
                  "https://res.cloudinary.com/dltlyphap/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1733216561/instagram_pfumqz.png"
                }
                alt="instegram"
              /> */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
