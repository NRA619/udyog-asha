import React from "react";
import Image from "next/image";
import BeenhereTwoToneIcon from "@material-ui/icons/BeenhereTwoTone";
import { motion } from "framer-motion";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import  {useEffect, useState} from 'react';
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
  const [state, setState] =  useState(9);

    useEffect(() => {
        setTimeout(() => {
        if(state < 1) {
        setState(9)
        } else {
            setState(state - 1)
        }
    }, 6000)
        }, [state])
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
        <span className="hidden md:block w-1/2 md:w-1/3  scale-150 md:scale-100 bg-indigo-50 filter drop-shadow-lg rounded-md shadow-md contrast-125 mt-10">
          {state == 0 && (
          <div className="transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 glow-blue-500-lg ">
            <Image
              src="/images/about5.jpeg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={1350}
              height={950}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 1 && (
          <div className="transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 glow-blue-500-lg">
            <Image
              src="https://i.postimg.cc/fLBFQqv1/20160212-112634.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={1350}
              height={950}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 2 && (
          <div className="transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 glow-blue-500-lg">
            <Image
              src="https://i.postimg.cc/WzzyNmWz/20160212-112742.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={1350}
              height={950}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 3 && (
          <div className="transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 glow-blue-500-lg">
            <Image
              src="https://i.postimg.cc/tCLcbxhR/20160425-132007.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={1350}
              height={950}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 4 && (
          <div className="transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 glow-blue-500-lg">
            <Image
              src="https://i.postimg.cc/4y0SmKq5/20160212-164804.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={1350}
              height={950}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 5 && (
          <div className="transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 glow-blue-500-lg">
            <Image
              src="https://i.postimg.cc/gk5C05PW/20160215-170105.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={1350}
              height={950}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 6 && (
          <div className="transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 glow-blue-500-lg">
            <Image
              src="https://i.postimg.cc/QtXPPZcp/20160215-170108.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={1350}
              height={950}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 7 && (
          <div className="transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 glow-blue-500-lg">
            <Image
              src="https://i.postimg.cc/RZHjJRMn/20160218-112735.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={1350}
              height={950}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 8 && (
          <div className="transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 glow-blue-500-lg">
            <Image
              src="https://i.postimg.cc/4y0SmKq5/20160212-164804.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={1350}
              height={950}
              layout="responsive"
            ></Image>
          </div>
          )}    
          {state == 9 && (
          <div className="transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 glow-blue-500-lg">
            <Image
              src="https://i.postimg.cc/d0cg2y1N/20160218-112658.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={1350}
              height={950}
              layout="responsive"
            ></Image>
          </div>
          )} 

        </span>
        {/* 2nd Container */}
      </div>
      <div className="h-1/4 my-10 flex justify-center items-center md:hidden text-center ">
      {state == 0 && (
          <div className="glow-blue-500-lg w-3/4 h-full mx-10">
            <Image
              src="/images/about5.jpeg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={190}
              height={120}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 1 && (
          <div className="glow-blue-500-lg w-3/4 h-full mx-10">
            <Image
              src="https://i.postimg.cc/fLBFQqv1/20160212-112634.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={190}
              height={120}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 2 && (
          <div className="glow-blue-500-lg w-3/4 h-full mx-10">
            <Image
              src="https://i.postimg.cc/WzzyNmWz/20160212-112742.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={190}
              height={120}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 3 && (
          <div className="glow-blue-500-lg w-3/4 h-full mx-10">
            <Image
              src="https://i.postimg.cc/tCLcbxhR/20160425-132007.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={190}
              height={120}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 4 && (
          <div className="glow-blue-500-lg w-3/4 h-full mx-10">
            <Image
              src="https://i.postimg.cc/4y0SmKq5/20160212-164804.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={190}
              height={120}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 5 && (
          <div className="glow-blue-500-lg w-3/4 h-full mx-10">
            <Image
              src="https://i.postimg.cc/gk5C05PW/20160215-170105.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={190}
              height={120}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 6 && (
          <div className="glow-blue-500-lg w-3/4 h-full mx-10">
            <Image
              src="https://i.postimg.cc/QtXPPZcp/20160215-170108.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={190}
              height={120}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 7 && (
          <div className="glow-blue-500-lg w-3/4 h-full mx-10">
            <Image
              src="https://i.postimg.cc/RZHjJRMn/20160218-112735.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={190}
              height={120}
              layout="responsive"
            ></Image>
          </div>
          )}
          {state == 8 && (
          <div className="glow-blue-500-lg w-3/4 h-full mx-10">
            <Image
              src="https://i.postimg.cc/4y0SmKq5/20160212-164804.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={190}
              height={120}
              layout="responsive"
            ></Image>
          </div>
          )}    
          {state == 9 && (
          <div className="glow-blue-500-lg w-3/4 h-full mx-10">
            <Image
              src="https://i.postimg.cc/d0cg2y1N/20160218-112658.jpg"
              className="rounded-md  filter  saturate-120 shadow-2xl"
              width={190}
              height={120}
              layout="responsive"
            ></Image>
          </div>
          )}
      </div>
    </main>
  );
}
