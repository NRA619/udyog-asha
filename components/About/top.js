import React from "react";

export default function Top() {
  return (
    <main className="h-screen w-full">
      {/* 1st container*/}
      <div className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:justify-around items-center bg-blue-600 h-3/4">
        <span className="flex flex-col text-white w-3/4 md:w-1/2 space-y-1">
          <spam className="font-bold text-lg md:text-3xl flex justify-center md:justify-start">
            Hi, We are{" "}
            <span className="ml-1.5 font-extrabold  text-black">
              Udyog Asha
            </span>
          </spam>
          <spam className="text-sm md:text-base text-center md:text-left">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
            dolor sit amet, consectetur adipiscing elit
          </spam>
        </span>
        {/* Swiper  */}
        <span className="w-1/2 md:w-1/4 scale-150 md:scale-100 bg-indigo-50 filter drop-shadow-lg rounded-md shadow-md contrast-125">
          <img
            src="./c1.jpg"
            className="rounded-md transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 filter brightness-125 hue-rotate-30 saturate-150 shadow-2xl"
          ></img>
        </span>
        {/* 2nd Container */}
      </div>
      <div className="hidden h-1/4 my-10 md:grid md:grid-cols-3 gap-x-10 justify-items-center items-center text-center ">
        <span className="flex flex-col justify-items-center space-y-5 text-black font-semibold md:w-5/6 w-full text-justify">
          <span>ऑनलाइन प्रशिक्षणाच्या माध्यमातून महाराष्ट्रभर पोहोचणे. </span>
          <span>कार्यक्रमांद्वारे उद्योजकीय व्यावसायिक क्षमता व कौशल्य विकसित करणे.</span>
          <span>महाविद्यालयीन विद्यार्थ्यांमध्ये स्वयंरोजगार व उद्योजकतेचे बाबत जागृती</span>
        </span>
        <span className="justify-items-center text-black font-semibold md:w-5/6 w-full text-justify">
          <span>ऑनलाइन प्रशिक्षणाच्या माध्यमातून महाराष्ट्रभर पोहोचणे. </span>
          <span>कार्यक्रमांद्वारे उद्योजकीय व्यावसायिक क्षमता व कौशल्य विकसित करणे.</span>
          <span>महाविद्यालयीन विद्यार्थ्यांमध्ये स्वयंरोजगार व उद्योजकतेचे बाबत जागृती</span>
        </span>
        <span className="justify-items-center text-black font-semibold md:w-5/6 w-full text-justify">
          <span>ऑनलाइन प्रशिक्षणाच्या माध्यमातून महाराष्ट्रभर पोहोचणे. </span>
          <span>कार्यक्रमांद्वारे उद्योजकीय व्यावसायिक क्षमता व कौशल्य विकसित करणे.</span>
          <span>महाविद्यालयीन विद्यार्थ्यांमध्ये स्वयंरोजगार व उद्योजकतेचे बाबत जागृती</span>
        </span>
      </div>
    </main>
  );
}
