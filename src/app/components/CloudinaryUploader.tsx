"use client";
import { CldUploadButton } from "next-cloudinary";
import PictureProps from "../types/props/PictureProps";
import { handleUpload } from "../functions/pictureFunctions";

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const CloudinaryUploader: React.FC<PictureProps> = ({ setPictures }) => {
  return (
    <div className="flex items-center justify-center w-[100%] ">
      <CldUploadButton
        options={{
          multiple: true,
          sources: ["local", "url", "unsplash", "camera"],
        }}
        uploadPreset={cloudPresetName}
        onSuccessAction={(event) => handleUpload(event, setPictures)}
        //   className="py-2 px-3 shadow items-center rounded m-2 text-orange-500
        //  hover:shadow transition ease-in-out delay-200"
        className="px-4 py-2 w-[100%] shadow-md border-orange-500 text-orange-500 rounded hover:shadow-lg"
      >
        <span>צרף תמונה</span>
      </CldUploadButton>
    </div>
  );
};

export default CloudinaryUploader;

// בעמוד שבו קוראים לקומפוננטה:

// import CloudinaryUploader from "@/app/components/CloudinaryUploader";
// import { v2 as cloudinary } from "cloudinary";
// import Image from "next/image";

// cloudinary.config({
//     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//     api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
//   });
//   interface CloudinaryImage {
//     asset_id: string;
//     secure_url: string;
//     height: number;
//     width: number;
//   }

// export default async function Home() {
//     const images = await cloudinary.search
//       .expression("")
//       .execute();

//     return (
//       <main>

//         <CloudinaryUploader />

//         <div
//           className="grid grid-cols-1 sm:grid-cols-2
//             md:grid-cols-3 lg:grid-cols-4 gap-4"
//         >
//           {images.total_count > 0 &&
//             images.resources.map((image: CloudinaryImage) => (
//               <div key={image.asset_id} className="container mx-auto max-w-screen-xl px-8 ">
//                 <Image
//                 className="flex flex-wrap justify-center"
//                   src={image.secure_url}
//                   height={image.height}
//                   width={image.width}
//                   alt="My cloudinary image"
//                   priority
//                 />
//               </div>
//             ))}
//         </div>
//       </main>
//     );
//   }
