"use client";

import { CldUploadButton } from "next-cloudinary";
// import Image from "next/image";

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

interface PictureProps {
  pictures: string[]; // הערך הנוכחי
  setPictures: React.Dispatch<React.SetStateAction<string[]>>; // פונקציית העדכון
}

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
// });
// interface CloudinaryImage {
//   asset_id: string;
//   secure_url: string;
//   height: number;
//   width: number;
// }

const CloudinaryUploader: React.FC<PictureProps> = ({
  // pictures,
  setPictures,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = (result: any) => {
    if (result?.info) {
      const imageUrl = result.info.secure_url;
      setPictures((prevInfo: string[]) => [...prevInfo, imageUrl]);
      console.log("Uploaded image URL:", imageUrl);
      alert(`Image uploaded! URL: ${imageUrl}`);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <CldUploadButton
        options={{
          multiple: true,
          sources: ["local", "url", "unsplash", "camera"],
        }}
        uploadPreset={cloudPresetName}
        onSuccessAction={handleUpload}
        className="bg-orange-400 py-2 px-3 items-center rounded border m-2 text-white
        hover:bg-orange-500 transition ease-in-out delay-200"
      >
        <span className="text-2xl">Upload Images</span>
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

//     console.log(images.resources);
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
