"use client";
import React, { useState, useEffect } from "react";
import User from "@/app/types/users";
import { getUserById, putUserDetails } from "../services/userService";
import { getUserToken } from "../functions/usersFunctions";
import MapLoader from "./MapLoader";
import { useRouter } from "next/navigation";

const EditUser = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const userToken = getUserToken();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(userToken?.id || "");
        if (user) {
          setUserDetails(user);
          setFullName(user.fullName || "");
          setEmail(user.email || "");
          setAddress(user.address || "");
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: { [key: string]: string } = {};

    if (!fullName) validationErrors.fullName = "Full Name is required.";
    if (!email) validationErrors.email = "Email is required.";
    if (!address) validationErrors.address = "Address is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userToUpdate = { fullName, email, address };
    // Submit the form (example placeholder)
    putUserDetails(userToken!.id, userToUpdate);
    router.push('/pages/home');
  };

  const handlePlaceSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
  };

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <MapLoader>
            <input
              id="address"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)} // הוספנו את ה-onChange
              className={`mt-1 block w-full px-4 py-2 border ${
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

          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditUser;
