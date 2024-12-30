// pages/someDetails.tsx
"use client";
import React, { useState } from "react";
import { z } from "zod";
import SomeDetailsProps from "../../types/props/SomeDetailsProps";
import MapLoader from "../MapLoader";

const formSchema = z.object({
  address: z.string().min(1, { message: "A valid address must be entered." }),
});

const SomeDetails: React.FC<SomeDetailsProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    address: "",
  });
  const [errors, setErrors] = useState<{ age?: string; address?: string }>({});

  const handlePlaceSelect = (address: string) => {
    setFormData({ ...formData, address });
    setErrors((prev) => ({ ...prev, address: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const validationResult = formSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors({
        // age: fieldErrors.age?._errors[0],
        address: fieldErrors.address?._errors[0],
      });
      return;
    }

    onSubmit(formData.address);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        ...רק עוד כמה פרטים
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <fieldset dir="rtl" className="border border-gray-300 p-2 rounded-lg">
            <legend className="text-md font-medium text-gray-700 px-2">
              תאריך לידה
            </legend>
            <input
              type="date"
              name="age"
              required
              className="focus:outline-none focus:border-none w-full bg-none"
            />
          </fieldset>
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>
        <div>
          <fieldset dir="rtl" className="border border-gray-300 p-2 rounded-lg">
            <legend className="text-md font-medium text-gray-700 px-2">
              כתובת
            </legend>
            <MapLoader>
              <input
                id="address"
                className={`focus:outline-none focus:border-none w-full bg-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                onFocus={(e) => {
                  const autocomplete = new google.maps.places.Autocomplete(
                    e.target
                  );
                  autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();
                    handlePlaceSelect(place.formatted_address || "");
                  });
                }}
              />
            </MapLoader>
          </fieldset>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-black border-2 border-blue-400 rounded-md hover:shadow-md focus:outline-none focus:ring-offset-2 focus:flex items-center justify-center"
        >
          הרשמה
        </button>
      </form>
    </div>
  );
};

export default SomeDetails;
