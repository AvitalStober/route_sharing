import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-gray-800 text-white py-4"
      dir="rtl"
    >
      <div className="container mx-auto text-center">
        <p className="text-xs">Routes Sharing &copy; כל הזכויות שמורות</p>
        {/* פס מפריד */}
        <hr className="border-t border-white my-4 w-3/4 mx-auto" />
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
      </div>
    </footer>
  );
};

export default Footer;
