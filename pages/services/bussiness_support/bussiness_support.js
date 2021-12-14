import React from "react";
import axios from "axios";
import { parseCookies } from "../../../components/cookie";

export const bussiness_support = () => {

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
          service: "business_support",
          subservice: subservice,
    })
    if(res.data.applied == "already_applied"){
      alert("Already applied for this service...")
    }if(res.data.applied == "applied"){
      alert("You have applied for" + " " + subservice + " " + "service")
      window.location = "/services/service"
    }
      }
  }else {
    alert("Please Login first")
  }
  }

  return (
    <div className="h-full min-h-screen w-full pt-20 px-10">
      <div className="bg-yellow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-full w-full mt-20 mb-20 gap-4">
        <div className="flex flex-col justify-between bg-yellow-600 rounded-lg h-72 shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Basic 6 month
          </span>
          <button onClick={() => apply("Basic 6 month")} className="bg-yellow-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-yellow-500 rounded-lg h-72 shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Expert advice best way to validate your are idea
          </span>
          <button onClick={() => apply("Expert advice best way to validate your are idea")} className="bg-yellow-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-yellow-400 rounded-lg h-72 shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Professional up to 25 lacs
          </span>
          <button onClick={() => apply("Professional up to 25 lacs")} className="bg-yellow-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-yellow-300 rounded-lg h-72 shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">Custom</span>
          <button onClick={() => apply("Custom")} className="bg-yellow-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default bussiness_support;
