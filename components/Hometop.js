import Image from 'next/image'
import { useState,useEffect } from 'react';
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";


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
export default function Hometop() {
    const [state, setState] =  useState(2);

    useEffect(() => {
        setTimeout(() => {
        if(state <= 1) {
        setState(state + 1)
        } else {
            setState(0)
        }
    }, 5000)
        }, [state])

    return (
        <div className="h-full w-full  bg-wavebgred bg-cover">
            <div className="h-full -mb-8 w-full flex">
            <div className = "flex flex-col w-full md:w-1/2  h-3/4 pt-20 md:pt-0 md:justify-center md:items-start pl-2 md:pl-10 text-start">
            <motion.div variants={container} initial="hidden" animate="visible" className="flex  flex-col  justify-start pl-4">
            <div className = "hidden md:flex">
                <Image src = "/MOVTC13.png" width={220} height= {220}></Image>
            </div>
            <div className = "md:hidden flex">
                <Image src = "/MOVTC13.png" width={100} height= {100}></Image>
            </div>
            <motion.span variants={item} className = "text-white text-md md:text-2xl flex justify-start pt-1 font-medium md:font-semibold">
                    व्यवसाय शिक्षण व प्रशिक्षण मंडळ
                </motion.span>
                <motion.span variants={item} className = "text-white text-md md:text-2xl pt-1 font-medium md:font-semibold">
                    Vocational Education & Training Board
                </motion.span>
                <motion.span variants={item} className = "text-xxs md:text-sm pt-1 text-gray-100 font-medium md:font-semibold animate-pulse">
                    An ISO 9001: 2015 Certified Vocational Board 
                </motion.span>
                <motion.span variants={item} className="text-white text-md md:text-2xl pt-1 font-medium md:font-semibold ">
                    महाराष्ट्र मुक्त व्यवसाय प्रशिक्षण केंद्र 
                </motion.span>
            </motion.div>
            <div className = "w-full  h-1/2 flex md:hidden justify-end items-center pr-2">
               
                {state == 0 &&
                <motion.div  exit={{opacity: 0}} initial={{ opacity: 0 }} animate ={{opacity:1}} className="w-3/4 h-1/2 bg-white   bg-cover rounded-2xl flex items-center glow-blue-500-lg">
                <div className="w-auto h-auto flex bg-blue-500 bg-cover justify-center items-center p-2 transform  -translate-x-4 -translate-y-0 glow-blue-500-lg">
                <Image src = "/MOVTC18.png" width={80} height= {60}></Image>
                </div>
                <div className="w-3/4 h-full flex flex-col justify-center items-start pr-2">
                    <span className="flex flex-col justify-start font-bold text-blue-500 text-md">
                        <span>ISO</span>
                        <span className="bg-blue-500 h-0.5 w-auto" />
                    </span>
                    <span className="text-xxs flex items-center justify-center text-justify text-blue-600 font-medium pt-1">
                    Thanks to ISO to be a contributing partner.
                    </span>
                </div>
            </motion.div>
                }
               
                {state == 1 &&
               <motion.div  exit={{opacity: 0}} initial={{ opacity: 0 }} animate ={{opacity:1}} className="w-3/4 h-1/2 bg-white  bg-cover rounded-2xl flex items-center glow-yellow-500-lg">
               <div className="w-auto h-auto flex bg-yellow-500 bg-cover  justify-center items-center p-2 transform  -translate-x-4 -translate-y-0 glow-yellow-500-lg">
               <Image src = "/MOVTC16.png" width={90} height= {60}></Image>
               </div>
               <div className="w-3/4 h-full flex flex-col justify-center items-start pr-2">
                   <span className="flex flex-col justify-start font-bold text-yellow-500 text-md">
                       <span>Skill India</span>
                       <span className="bg-yellow-500 h-0.5 w-auto" />
                   </span>
                   <span className="text-xxs flex items-center justify-center text-justify text-yellow-600 font-medium pt-1">
                  Thanks to Skill India in helping us to grow.
                   </span>
               </div>
           </motion.div>
                }
               
                {state == 2 &&
                <motion.div  exit={{opacity: 0}} initial={{ opacity: 0 }} animate ={{opacity:1}} className="w-3/4 h-1/2 bg-white  bg-cover rounded-2xl flex items-center glow-red-500-lg">
                    <div className="w-auto h-auto flex bg-red-500 bg-cover justify-center items-center p-2 transform  -translate-x-4 -translate-y-0 glow-red-500-lg">
                    <Image src = "/MOVTC17.png" width={120} height= {50}></Image>
                    </div>
                    <div className="w-3/4 h-full flex flex-col justify-center items-start pr-2">
                        <span className="flex flex-col justify-start font-bold text-red-500 text-md">
                            <span>N.S.D.C</span>
                            <span className="bg-red-500 h-0.5 w-auto" />
                        </span>
                        <span className="text-xxs flex items-center justify-center text-justify text-red-600 font-medium pt-1">
                        Thanks to National Skill Development Corporation for supporting us.
                        </span>
                    </div>
                </motion.div>
                }
                
                
            </div>
            </div>
            <div className = "w-1/2 md:h-3/4  hidden md:flex justify-end pr-6 lg:pr-16 items-center">
               
                {state == 0 &&
                <motion.div exit={{opacity: 0}} initial={{ opacity: 0 }} animate ={{opacity:1}} className="w-4/5 h-auto py-4 bg-white lg:py-10 rounded-2xl flex items-center shadow-2xl glow-blue-500-lg">
                    <div className="lg:w-auto w-1/2  h-auto flex bg-blue-900 bg-cover justify-center items-center p-4 transform  -translate-x-4 -translate-y-0 glow-blue-500-lg">
                    <Image src = "/MOVTC18.png" width={115} height= {115}></Image>
                    </div>
                    <div className="w-3/4 h-full  flex flex-col justify-center items-start px-2 lg:px-10 space-y-6 ">
                        <span className="flex flex-col justify-start font-bold text-blue-500 text-2xl lg:text-3xl">
                            <span>ISO</span>
                            <span className="bg-blue-500 h-1 w-auto" />
                        </span>
                        <span className="text-sm lg:text-md  text-justify text-blue-500 font-medium">
                        Thanks to ISO to be a contributing partner. 
                        </span>
                    </div>
                </motion.div>
                }
               
                {state == 1 &&
                <motion.div exit={{opacity: 0}} initial={{ opacity: 0 }} animate ={{opacity:1}} className="w-4/5 h-auto bg-white py-6 lg:py-10 bg-cover rounded-2xl flex items-center glow-yellow-500-lg">
                <div className="lg:w-auto w-1/2  h-auto p-4 flex bg-yellow-600 bg-cover justify-center items-center px-4 transform  -translate-x-4 -translate-y-0 glow-yellow-500-lg">
                <Image src = "/MOVTC16.png" width={210} height= {160}></Image>
                </div>
                <div className="w-3/4 h-full  flex flex-col justify-center items-start px-2 lg:px-10 space-y-6">
                    <span className="flex flex-col justify-start font-bold text-yellow-600 text-xl lg:text-3xl">
                      <span>Skill India</span>
                    <span className="bg-yellow-600 h-1 w-auto" />
                    </span>
                    <span className=" text-justify text-yellow-600 text-sm lg:text-md font-medium">
                    Thanks to Skill India in helping us to grow. 
                    </span>
                </div>
            </motion.div>
                }
               
                {state == 2 &&
                <motion.div  exit={{opacity: 0}} initial={{ opacity: 0 }} animate ={{opacity:1}} className="w-4/5 h-auto py-6 lg:py-10 bg-white bg-cover rounded-2xl flex items-center glow-red-500-lg">
                    <div className="lg:w-auto w-1/2  p-4 h-auto flex bg-red-500 bg-cover justify-center items-center px-4 transform  -translate-x-4 -translate-y-0 glow-red-500-lg">
                    <Image src = "/MOVTC17.png" width={200} height= {110}></Image>
                    </div>
                    <div className="w-3/4 h-full  flex flex-col justify-center items-start px-2 lg:px-10 space-y-6">
                        <span className="flex flex-col justify-start font-bold text-red-500 text-xl lg:text-3xl">
                            <span>N.S.D.C</span>
                            <span className="bg-red-500 h-1 w-auto" />
                        </span>
                        <span className="text-sm lg:text-md text-justify text-red-500 font-medium">
                        Thanks to National Skill Development Corporation for supporting us. 
                        </span>
                    </div>
                </motion.div>
                }
                
                
            </div>
            </div>
            <div className="flex justify-end items-end">
            <Marquee speed={50} pauseOnHover="true" >
                <span className="px-96 text-blue-900 font-semibold">    
                Registered with: MHRD (Under C.R. Act )  |  Ministry of MSME |  NITI Aayog |   NSDC (T.P)   |      
                </span>
                <span className="px-96 text-blue-900 font-semibold">
                Member of: national safety Council | quality Council of  India | British Council | MCC I
                </span>
                <span className="px-96 text-blue-900 font-semibold">
                Approved By: Ministry OF Labour & Employment (M.l.w.b.) Govt. OF Maharashtra (vide Letter No.: 
                </span>
                <span className="px-96 text-blue-900 font-semibold">
                Training partner:  National Skill Development Corporation
                </span>
                <span className="px-96 text-blue-900 font-semibold">
                Affiliation:  Maharashtra labour welfare board.
                </span>
            </Marquee> 
            
            </div>
            
        </div>
    )
}
