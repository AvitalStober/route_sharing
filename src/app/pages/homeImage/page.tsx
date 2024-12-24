"use client"
import React, { useEffect, useState } from "react";

const page = () => {
  const images = [
    "https://res.cloudinary.com/dltlyphap/image/upload/v1734954666/close-up-colorful-pins-maps_qlqfx1.jpg",
    "https://img.freepik.com/free-photo/rolled-maps-wooden-desk_23-2148232514.jpg?t=st=1734955501~exp=1734959101~hmac=61fb6f82bdc14708c6eb8afcf06e957b76eae5275099d9d1db3a8d72d69b333e&w=900",
    "https://media.istockphoto.com/id/121043151/photo/maps-of-countries-in-middle-east.jpg?s=1024x1024&w=is&k=20&c=pUyUdZ-SufQLQYxFB4YM0jp0KPwWePxAPj6ZmOm6j20=",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center z-10">
        </div>
      </div>
    </>
  );
}

export default page;
