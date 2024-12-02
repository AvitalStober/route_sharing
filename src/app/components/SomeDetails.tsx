"use client";
import React, { useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { z } from "zod";
import LogIn from "@/app/components/LogIn"; 

const formSchema = z.object({
  age: z
    .string()
    .refine(
      (val) => {
        const age = parseInt(val, 10);
        return age >= 0 && age <= 120;
      },
      { message: "גיל לא חוקי" }
    ),
  address: z
    .string()
    .min(1, { message: "יש להזין כתובת חוקית" }),
});

const SomeDetails: React.FC = () => {
  const [formData, setFormData] = useState({
    age: "",
    address: "",
  });
  const [errors, setErrors] = useState<{ age?: string; address?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLMAPS_API_KEY}`,
    libraries: ["places"],
    language: "he",
  });

  if (!isLoaded) return <div>Loading...</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({}); 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        age: fieldErrors.age?._errors[0],
        address: fieldErrors.address?._errors[0],
      });
      return;
    }

    // if (!formData.address) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     address: "יש להזין כתובת תקינה מגוגל מפות",
    //   }));
    //   return;
    // }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <LogIn age={formData.age} address={formData.address} />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        כמה פרטים וסיימנו...
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            גיל:
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleInputChange}
            required
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.age ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            כתובת:
          </label>
          <input
            id="address"
            placeholder="הכנס כתובת"
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            onFocus={(e) => {
              const autocomplete = new google.maps.places.Autocomplete(e.target);
              autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                handlePlaceSelect(place.formatted_address || "");
              });
            }}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">
          שלח
        </button>
      </form>
    </div>
  );
};

export default SomeDetails;