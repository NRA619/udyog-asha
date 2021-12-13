import React from "react";
import axios from "axios";
import { parseCookies } from "../../../components/cookie";

export const printmedia = () => {
    async function apply(values) {
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
              service: "print_media",
              subservice: subservice,
        })
        if(res.data.applied == "already_applied"){
          alert("Already applied for this service...")
        }if(res.data.applied == "applied"){
          window.location = "/services/service"
        }
          }
      }else {
        alert("Please Login first")
      }
      }
    return (
        <div className="h-full min-h-screen w-full pt-20 px-10">
      <div className="bg-blue grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-full w-full mt-20 gap-4 pb-20 ">
        <div className="flex flex-col justify-between bg-blue-600 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Graphic Designing
          </span>
          <button onClick={() => apply("Graphic Designing")} className="bg-blue-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-blue-500 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Product labelling
          </span>
          <button onClick={() => apply("Product labelling")} className="bg-blue-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-blue-400 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            label printing
          </span>
          <button onClick={() => apply("label printing")} className="bg-blue-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-blue-300 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
              Packaging
          </span>
          <button onClick={() => apply("Packaging")} className="bg-blue-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-blue-300 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
              I card
          </span>
          <button onClick={() => apply("I card")} className="bg-blue-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-blue-400 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Sticker
          </span>
          <button onClick={() => apply("Sticker")} className="bg-blue-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-blue-500 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Visiting cards
          </span>
          <button onClick={() => apply("Visiting cards")} className="bg-blue-100 text-gray-800 bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
      </div>
    </div>
    )
}

export default printmedia;