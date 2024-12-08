import CloudinaryUploader from "@/app/components/CloudinaryUploader";
import { v2 as cloudinary } from "cloudinary";
// import Image from "next/image";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});
// interface CloudinaryImage {
//   asset_id: string;
//   secure_url: string;
//   height: number;
//   width: number;
// }

export default async function Home() {
//   const images = await cloudinary.search
//     .expression("resource_type:image") // חיפוש תמונות בלבד
//     .execute();

  // console.log(images.resources);
  return (
    <main>
      <CloudinaryUploader />
{/* 
      <div
        className="grid grid-cols-1 sm:grid-cols-2
            md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {images.total_count > 0 &&
          images.resources.map((image: CloudinaryImage) => (
            <div
              key={image.asset_id}
              className="container mx-auto max-w-screen-xl px-8 "
            >
              <Image
                className="flex flex-wrap justify-center"
                src={image.secure_url}
                height={image.height}
                width={image.width}
                alt="My cloudinary image"
                priority
              />
            </div>
          ))}
      </div> */}
    </main>
  );
}
