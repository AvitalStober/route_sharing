"use client";

import React, { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface PopupProps {
  owner: string;
  mapPoints: google.maps.LatLngLiteral[];
  rate: number;
  ratingNum: number;
  description: string;
  gallery: string[];
  isHistoryState: boolean;
  onAddImage?: (imageUrl: string) => void;
}

const ReadMore: React.FC<PopupProps> = ({
  owner,
  mapPoints,
  rate,
  ratingNum,
  description,
  gallery,
  isHistoryState,
  onAddImage,
}) => {
  const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;
  const [galleryImages, setGalleryImages] = useState<string[]>(gallery);

  const handleUpload = (result: any) => {
    if (result?.info) {
      const imageUrl = result.info.secure_url;
      setGalleryImages((prev) => [...prev, imageUrl]);
      if (onAddImage) {
        onAddImage(imageUrl);
      }
    }
  };

  const averageRate = (rate / ratingNum).toFixed(1);

  return (
    <div className="bg-white p-4 rounded shadow-lg max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Route Details</h2>
      <p className="mb-2"><strong>Created by:</strong> {owner}</p>

      <div className="mb-4 h-64 w-full">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={mapPoints[0]}
          zoom={14}
        >
          {mapPoints.map((point, index) => (
            <Marker key={index} position={point} />
          ))}
        </GoogleMap>
      </div>

      <p className="mb-2"><strong>Rate:</strong> {averageRate} ({ratingNum} ratings)</p>
      <p className="mb-4"><strong>Description:</strong> {description}</p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {galleryImages.map((image, index) => (
          <Image key={index} src={image} alt={`Gallery image ${index + 1}`} width={150} height={150} className="object-cover rounded" />
        ))}
      </div>

      {isHistoryState && (
        <div>
          <h3 className="text-lg font-bold mb-2">Add Images to Gallery</h3>
          <CldUploadButton
            options={{ multiple: true, sources: ["local", "url", "camera"] }}
            uploadPreset={cloudPresetName}
            onSuccessAction={handleUpload}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Upload Image
          </CldUploadButton>
        </div>
      )}
    </div>
  );
};

export default ReadMore;
