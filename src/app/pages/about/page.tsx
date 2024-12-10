"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AboutUs = () => {
  const router = useRouter();

  return (
    <div
      dir="rtl"
      className="relative bg-gradient-to-b from-blue-500 to-blue-800 min-h-screen text-white"
    >
      {/* כפתור חזרה לדף הבית */}
      <button
        onClick={() => router.push("/pages/home")}
        className="fixed top-4 right-4 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
      >
        חזרה לדף הבית
      </button>

      <div className="container mx-auto py-16 px-6">
        {/* כותרת הדף */}
        <h1 className="text-5xl font-bold text-center mb-12">אודותינו</h1>

        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8">
          {/* מידע על האתר */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-blue-700 mb-4">
              מי אנחנו
            </h2>
            <p className="text-lg leading-relaxed">
              ברוכים הבאים ל<strong>Routes Sharing</strong>, הפלטפורמה המובילה
              לשיתוף וגילוי מסלולי הליכה, טיול ואופניים ברחבי העולם. אנחנו
              מחברים בין מטיילים ספורטיביים לחובבי טיולים דרך חוויות משותפות.
            </p>
          </section>

          {/* המטרה שלנו */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-blue-700 mb-4">
              המטרה שלנו
            </h2>
            <p className="text-lg leading-relaxed">
              אנחנו מאמינים בכוח של חיבור וגילוי. הפלטפורמה שלנו מאפשרת למשתמשים
              לשתף את מסלולי ההליכה, הטיולים והאופניים האהובים עליהם ולהעניק
              השראה לאחרים לצאת להרפתקאות חדשות.
            </p>
          </section>

          {/* הצוות */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-blue-700 mb-4">
              הכירו את הצוות
            </h2>
            <p className="text-lg leading-relaxed">
              הצוות שלנו מורכב ממתכנתים, מעצבים וחובבי טבע, כולם נלהבים להפוך את
              חוויות הגילוי והטיול לקלות ומהנות יותר עבור כולם.
            </p>
          </section>

          {/* קריאה לפעולה */}
          <section>
            <h2 className="text-3xl font-semibold text-blue-700 mb-4">
              הצטרפו אלינו
            </h2>
            <p className="text-lg leading-relaxed">
              רוצים לשתף את מסלול ההליכה האהוב עליכם? הצטרפו לקהילתנו היום ותרמו
              לשינוי איך אנשים מגלים את העולם.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
