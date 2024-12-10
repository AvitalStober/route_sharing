import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Routes Sharing. All Rights Reserved.
        </p>
        {/* קישורי מידע */}
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
        {/* קישורי רשתות חברתיות */}
        <div className="mt-4">
          <p>Follow us on:</p>
          <div className="flex justify-center">
            <a
              href="https://www.facebook.com"
              className="text-white hover:text-gray-400 mx-2"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              className="text-white hover:text-gray-400 mx-2"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com"
              className="text-white hover:text-gray-400 mx-2"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
