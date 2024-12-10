import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleUpload = (
  result: CloudinaryUploadWidgetResults,
  setPictures: Dispatch<SetStateAction<string[]>>
) => {
  if (
    result?.info &&
    typeof result.info !== "string" &&
    "secure_url" in result.info
  ) {
    const imageUrl = result.info.secure_url;
    setPictures((prevInfo: string[]) => [...prevInfo, imageUrl]);
  } else {
    console.error("Failed to upload image. Result info is invalid.");
    alert("Upload failed. Please try again.");
  }
};
