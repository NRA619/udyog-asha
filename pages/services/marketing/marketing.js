import React from "react";
import axios from "axios";
import { parseCookies } from "../../../components/cookie";


export const marketing = () => {
    async function apply(values) {
        console.log(values)
        const data = parseCookies();
        if (data.user) {
          let buff_dec = new Buffer.from(data.user, "base64");
          let xyz = buff_dec.toString("ascii");
          var email = xyz;
          if (email) {
            email = email.replace(/"/g, "");
            const subservice = values
            const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/service/apply", {
              email: email,
              service: "social_media_marketing",
              subservice: subservice,
        })
        if(res.data.applied == "already_applied"){
          alert("Already applied for this service...")
        }else {
          console.log(res)
        }
          }
      }else {
        alert("Please Login first")
      }
      }
    return (
        <div>
             <div className="h-full min-h-screen w-full pt-20 px-10">
      <div className="bg-red grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-full w-full mt-20 gap-4 pb-20 ">
        <div className="flex flex-col justify-between bg-red-600 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Facebook page create and setup
          </span>
          <button onClick={() => apply("Facebook page create and setup")} className="bg-red-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-red-500 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Youtube channel create and setup
          </span>
          <button onClick={() => apply("Youtube channel create and setup")} className="bg-red-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-red-400 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            WhatsApp business
          </span>
          <button onClick={() => apply("WhatsApp business")} className="bg-red-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-red-300 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Facebook marketing
          </span>
          <button onClick={() => apply("Facebook marketing")} className="bg-red-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-red-300 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
             Banner designing
          </span>
          <button onClick={() => apply("Banner designing")} className="bg-red-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-red-400 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Digital visiting card
          </span>
          <button onClick={() => apply("Digital visiting card")} className="bg-red-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-red-500 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Google my business create and setup
          </span>
          <button onClick={() => apply("Google my business create and setup")} className="bg-red-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-red-600 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Website development
          </span>
          <button onClick={() => apply("Website development")} className="bg-red-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-red-600 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Block development
          </span>
          <button onClick={() => apply("Block development")} className="bg-red-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-red-500 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Promotional video creation
          </span>
          <button onClick={() => apply("Promotional video creation")} className="bg-red-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
      </div>
    </div>
        </div>
    )
}

export default marketing;
