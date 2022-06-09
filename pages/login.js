import CopyrightRoundedIcon from "@material-ui/icons/CopyrightRounded";
import { motion } from "framer-motion";
import GoogleLogin from "react-google-login";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { useCookies } from "react-cookie";
import React, { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Link from 'next/link';
import BarLoader from "react-spinners/BarLoader";

const test = (curPassword) => {
  const pass = curPassword;
  return {
    validate: (value) => {
      return value === pass || "The passwords do not match";
    },
  };
};

{
  /* variants of framer motion line(21) used for animation */
}
const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

// if(data)

export default function Login() {
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const password = useRef({}); // password check validation
  password.current = watch("password", "");
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, [])
  // Google Sign in Button function
  const googlesubmit = async (values) => {
    const email = values.profileObj.email;
    // Backend Post
   
      const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/user/googlelogin", {
        email: email,
      });
      if (res.data.isExists == false) {
        router.push({
          pathname: "/createprofile",
          query: { data: values.profileObj.email }, // passing email variable
        });
      } else {
        let buff = new Buffer.from(res.data.email);
        let stringToBase64 = buff.toString('base64');
        setCookie("user", JSON.stringify(stringToBase64), {
          path: "/",
          maxAge: 3600, // Expires After 1hr
          sameSite: true,
        });
        window.location = "/"
        
      }
   
  };
 
// email login function
  async function loginform(values) {
    const emailsign = values.email;
    const passwordsign = values.password_repeat;
    // backend post
    try {
      const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/user/emaillogin", {
        email: emailsign,
        password: passwordsign,
      });
      if (res.data.isVerified == true) {
        let buff = new Buffer.from(res.data.email);
        let stringToBase64 = buff.toString('base64');
        setCookie("user", JSON.stringify(stringToBase64), {
          path: "/",
          maxAge: 86400, // Expires After 1hr
          sameSite: true,
        });
        window.location = "/"

      } else {
        alert(
          "Credentials are incorrect!! please check your email and password"
        );
      }
    } catch (err) {
      alert("Error")
    }
  }
  async function failed(responsed) {
    console.log(responsed)
  }
  async function forgetpassword(){
    window.location = "/forgetpassword"
  }

  return (
    <main className="md:flex md:justify-center bg-emptybg bg-no-repeat bg-cover">
      {" "}
      {/* background image (to access go to tailwindconfig)*/}
      {/* Login Card && card animation */}
      {loading == true && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
        <BarLoader
          color="#000000"
          height={4}
          width={100}
         
        />
        </div>
      )}
      {loading == false && (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center items-center h-screen w-screen"
      >
        {/* Upper part */}
        {/* Upper main class !!imp */}
        <div className="relative bg-cover bg-bluebg md:shadow-2xl h-screen w-screen md:h-3/4 md:w-3/4 mx-96">
          <div className="md:absolute md:inset-y-0 md:right-0 flex flex-col my-20 md:my-0 md:justify-between md:w-1/2 md:float-right">
            <span className="relative flex justify-center text-white font-bold">
              {/* hidden for mobile version */}
              <h1 className="hidden md:flex md:absolute md:inset-y-0 md:right-0 m-5">
                UDYOG-ASHA
              </h1>
              {/* hidden for desktop */}
              <span className="flex md:hidden justify-center font-bold text-white space-x-1 text-2xl">
                <h1>Welcome</h1>
                <h1 className="text-blue-600"> Back!</h1>
              </span>
            </span>
            {/* hidden for desktop */}
            <span className="md:hidden flex justify-center text-xs text-white text-center mx-10 my-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </span>
            {/* Desktop right image hidden for mobile version */}
            <span className="hidden relative md:flex md:flex-col justify-center items-center text-center px-5  text-white">
              <Image width={1100} height={950} src="/log1.png"></Image>
            </span>
            {/* invisible for both (for spacing) */}
            <span className="invisible flex justify-center text-center px-5 text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            </span>
          </div>

          {/* Lower part */}
          <div className="">
            {/* lower main class !!imp */}
            <div className="absolute flex justify-center bg-white h-3/5 md:h-full md:w-1/2 inset-x-0 bottom-0 md:inset-y-0 md:right-0 md:rounded-none rounded-t-large">
              <div className="flex flex-col justify-between my-5 w-full">
                {/* hidden for mobile version */}
                <span className="hidden md:flex justify-center font-bold text-black space-x-1 text-2xl">
                  <h1>Welcome</h1>
                  <h1 className="text-blue-600"> Back!</h1>
                </span>

                <div className="flex flex-col justify-center h-1/4 w-full md:h-full items-center space-y-10 mt-10 md:mt-0">
                  {/* Login form */}
                  {/* emaillogin form */}
                  <div className="flex flex-col md:flex md:flex-col  mt-28 md:mt-0 2-3/4 md:w-1/2">
                    <form
                      onSubmit={handleSubmit(loginform)}
                      className="space-y-2"
                    >
                      <div className="flex flex-col">
                        {/* email field */}
                        <label
                          htmlFor="email_"
                          className="font-normal text-xs md:text-sm"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email_"
                          // register field
                          {...register("email", {
                            // validations
                            required: true,
                          })}
                          name="email"
                          className="ring-1 ring-gray-200 bg-gray-100 rounded-md p-2 text-indigo-900 shadow-md h-8 md:h-9 focus:outline-none focus:ring-1 focus:ring-black"
                        ></input>
                        {errors.email && errors.email.type === "required" && (
                          <span className = "text-xs">Please fill this field</span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        {/* password field */}
                        <label
                          htmlFor="password_repeat_"
                          className="font-normal text-xs md:text-sm"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password_repeat_"
                          // register field
                          {...register("password_repeat", {
                            // validations
                            required: true,
                          })}
                          name="password_repeat"
                          className="ring-1 ring-gray-200 bg-gray-100 rounded-md p-2 text-indigo-900 shadow-md h-8 md:h-9 focus:outline-none focus:ring-1 focus:ring-black"
                        ></input>
                        {errors.password_repeat &&
                          errors.password_repeat.type === "required" && (
                            <span className = "text-xs">Please fill this field</span>
                          )}
                      </div>
                      
                      <div className="flex flex-col items-center ">
                        <button
                          type="submit"
                          className=" border border-indigo-100 text-white bg-black py-1.5 px-3 md:py-1.5 md:px-6 rounded-md shadow-md text-xs md:text-base"
                        >
                          Next
                        </button>
                        <div className="flex flex-col justify-center items-center  md:space-x-1">
                          <span className="text-sm">Dont have account?</span>
                            <span  className="text-sm  text-blue-600 font-semibold">Please Use google Loign</span>
                        </div>
                      </div>
                    </form>
                    <button onClick={forgetpassword} className="text-black text-sm flex justify-centerflex flex-col justify-center items-center text-justify">
                        <span className="text-justify font-bold">
                        forget password?
                        </span>
                      </button>
                    </div>
                  {/* Login Button */}
                  {/* google login */}
                  {/* button animation */}
                  <GoogleLogin
                    className="flex justify-center rounded-3xl p-4 shadow-xl transition duration-500 ease-in-out bg-black hover:bg-blue-600 transform hover:-translate-y-1 hover:scale-110"
                    clientId="689218340556-eana7glsdmm5mog28gkrjjbqnkpjaiua.apps.googleusercontent.com"
                    buttonText="Sign in with google"
                    onSuccess={googlesubmit}
                    onFailure={googlesubmit}
                    theme="dark"
                    cookiePolicy={"single_host_origin"}
                  />

                  {/* <span className="flex justify-center text-black font-semibold">
                    Terms and Conditions.
                  </span> */}
                </div>
                <span className=" flex justify-center text-xs font-semibold">
                  2021 <CopyrightRoundedIcon fontSize="small" />
                  All rights reserved.
                </span>
                
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      )}
      {/* end of card animation */}
    </main>
  );
}
