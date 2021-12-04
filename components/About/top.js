import React from "react";
import Image from "next/image";
import BeenhereTwoToneIcon from "@material-ui/icons/BeenhereTwoTone";
import { motion } from "framer-motion";
import BookmarkIcon from '@material-ui/icons/Bookmark';
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.4,
      DelayNode: 1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Top() {
  return (
    <main className="h-screen w-full ">
      {/* 1st container*/}
      <div className="flex flex-col flex-nowrap  md:flex-row justify-center space-y-10 md:space-y-0 md:justify-around items-center bg-back-about h-3/4">
        <div className="md:flex md:flex-col justify-around text-white  md:w-1/2 w-full space-y-1">
          <motion.div variants={container} initial="hidden" animate="visible">
            <div className="font-bold text-lg md:text-3xl flex justify-center md:justify-start my-10">
              Hi, We are
              <span className="ml-1.5 font-extrabold  text-indigo-600">
                Udyog Asha
              </span>
            </div>
            <span className="px-4 text-justify text-purple-100 flex flex-col text-xs md:text-base md:text-left space-y-1">
              <motion.span variants={item} className="space-x-2">
                <BookmarkIcon fontSize="small" color = "primary" />
                <span>
                  ऑनलाइन प्रशिक्षणाच्या माध्यमातून महाराष्ट्रभर पोहोचणे.
                </span>
              </motion.span>
              <motion.span variants={item} className="space-x-2">
                <BookmarkIcon fontSize="small" color = "primary" />
                <span>
                  कार्यक्रमांद्वारे उद्योजकीय व्यावसायिक क्षमता व कौशल्य विकसित
                  करणे.
                </span>
              </motion.span>
              <motion.span variants={item} className="space-x-2">
                <BookmarkIcon fontSize="small" color = "primary" />
                <span>
                  महाविद्यालयीन विद्यार्थ्यांमध्ये स्वयंरोजगार व उद्योजकतेचे
                  बाबत जागृती
                </span>
              </motion.span>
              <motion.span variants={item} className="space-x-2">
                <BookmarkIcon fontSize="small" color = "primary" />
                <span>2025 पर्यंत 1000 उद्योजक घडवणे.</span>
              </motion.span>
              <motion.span variants={item} className="space-x-2">
                <BookmarkIcon fontSize="small" color = "primary" />
                <span>
                  स्टार्ट व मेक इन इंडिया च्या माध्यमातून व्यवसाय उभे करून देणे.
                </span>
              </motion.span>
              <motion.span variants={item} className="space-x-2">
                <BookmarkIcon fontSize="small" color = "primary" />
                <span>प्रशिक्षणार्थ्यांना बाजारपेठ उपलब्ध करून देणे.</span>
              </motion.span>
              <motion.span variants={item} className="space-x-2">
                <BookmarkIcon fontSize="small" color = "primary" />
                <span>उnद्योजकीय कल्पनांना वाव देणे.</span>
              </motion.span>
              <motion.span variants={item} className="space-x-2">
                <BookmarkIcon fontSize="small" color = "primary" />
                <span>
                  उद्योजकांना संघटित करून एकत्रित काम करण्याचा प्रयत्न करणे.
                </span>
              </motion.span>
            </span>
          </motion.div>
        </div>
        {/* Swiper  */}
        <span className="hidden md:block w-1/2 md:w-1/4  scale-150 md:scale-100 bg-indigo-50 filter drop-shadow-lg rounded-md shadow-md contrast-125">
          <div className="transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 glow-blue-500-lg">
            <Image
              src="/images/about5.jpeg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={1350}
              height={950}
              layout="responsive"
            ></Image>
          </div>
        </span>
        {/* 2nd Container */}
      </div>
      <div className="hidden h-1/4 my-10 md:flex gap-x-10 justify-center items-center text-center ">
        <span className=" text-black font-semibold md:w-1/2 w-3/4 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
          dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit
          amet, consectetur adipiscing elit Lorem ipsum dolor sit amet,
          consectetur adipiscing elit
        </span>
      </div>
    </main>
  );
}
