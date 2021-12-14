import React from "react";
import axios from "axios";
import { parseCookies } from "../../../components/cookie";

export const registation = () => {
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
              service: "registration",
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
      <div className="bg-green grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-full w-full mt-20 gap-4 pb-10">
        <div className="flex flex-col justify-between bg-green-600 rounded-lg h-72  shadow-md">
          <span className="text-xl text-center pt-10 px-5 text-black">
            Busniess registration (LLP partnership proprietorship up Private Limited public limited)
          </span>
          <button onClick={() => apply("Busniess registration (LLP partnership proprietorship up Private Limited public limited)")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-500 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            GST
          </span>
          <button onClick={() => apply("GST")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-400 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            e-PAN card
          </span>
          <button onClick={() => apply("e-PAN card")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-300 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
              Trademark registration
          </span>
          <button onClick={() => apply("Trademark registration")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-300 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Fssai (food) licence and registration
          </span>
          <button onClick={() => apply("Fssai (food) licence and registration")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-400 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Shop act licence
          </span>
          <button onClick={() => apply("Shop act licence")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-500 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Udemy msme registration
          </span>
          <button onClick={() => apply("Udemy msme registration")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-600 rounded-lg h-72  shadow-md">
          <span className="text-xl text-center pt-10 px-5 text-black">
            DSC certificate
          </span>
          <button onClick={() => apply("DSC certificate")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-600 rounded-lg h-72  shadow-md">
          <span className="text-xl text-center pt-10 px-5 text-black">
            import export code
          </span>
          <button onClick={() => apply("import export code")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-500 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            Barcode
          </span>
          <button onClick={() => apply("Barcode")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-400 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
            apeda registration
          </span>
          <button onClick={() => apply("apeda registration")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-300 rounded-lg h-72  shadow-md">
          <span className="text-2xl text-center pt-10 px-5 text-black">
             Spices Board registration
          </span>
          <button onClick={() => apply("Spices Board registration")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
             Apply Now
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-600 rounded-lg h-72  shadow-md">
          <span className="text-xl text-center pt-10 px-5 text-black">
            ISO certification
          </span>
          <button onClick={() => apply("ISO certification")} className="bg-green-100 text-gray-800 hover:bg-black hover:text-white rounded-b-lg bg-opacity-60 shadow-xl py-4">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default registation;
