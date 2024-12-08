"use client";
import { useState } from "react";
import "@/app/style/star.css";

import { Rating } from "@smastrom/react-rating";

function Star() {
  const [rating, setRating] = useState(0);

  function onChange(newValue: number) {
    console.log(newValue);
    setRating(newValue);
  }

  return (
    <div className="App">
      <Rating
        style={{ maxWidth: 180 }}
        value={rating}
        onChange={onChange}
        transition="zoom"
      />
    </div>
  );
}

export default Star;
