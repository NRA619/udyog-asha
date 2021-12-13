import React, { useState, useRef, useEffect } from "react";
import {  useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {useCookies} from 'react-cookie';
import axios from "axios";
import Link from 'next/link';
// password check validation
const test = (curPassword) => {
  const pass = curPassword;
  return {
    validate: (value) => {
      return value === pass || "The passwords do not match";
    },
  };
};

export default function Personel({ ...data }) {
  const [cookie, setCookie] = useCookies(["user"])
  const router = useRouter();
  const email = router.query.data;
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm(); // react hook form (useForm)
  const password = useRef({}); // password check validation
  password.current = watch("password", ""); // password check validation


  // Image submit
  const [checkemail, setcheckemail] = React.useState(false);
  //check of email
  useEffect(()=> {
  if(email){
    setcheckemail(true);
  }
  else{
    setcheckemail(false);
  }
},[checkemail])
 
  // without email he cant go thorugh this link
  

  // Submit form
  async function onSubmitForm (values){
    values.fullname = values.fullname.trim();
    const fullname = values.fullname
    const age = values.age
    const gender = values.gender
    const mobileno = values.mobileno
    const email = values.email
    const password_repeat = values.password_repeat
    try {
      const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/user/createprofile", {
        fullname,  age,  gender, mobileno, email, password_repeat,
      });
      if(res.data.isExists == true) {
        setCookie("user", JSON.stringify(res.data.email), {
          path: '/',
          maxAge: 3600, // Expires After 1hr
          sameSite: true,
        })
        window.location = "/"
      }
    }catch(err){
      alert("Error")
    }
  }
  return (
    // form
    
    <div>
      {/* if user signed with google then user can see this page */}
      {checkemail == true &&
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="md:flex md:flex-col md:items-center"
    >
      <main className="h-full pt-10 w-full md:flex md:flex-col items-center">
        <div className="flex items-center py-20 relative h-1/4 md:h-1/3  w-full bg-back-about bg-cover">
          <div className="h-full w-full  items-center space-y-4 flex flex-col justify-center text-yellow-800 ">
            {/* top Right  */}
            <div className=" w-1/2 h-full  md:flex justify-center items-center">
              <span className="text-white flex justify-center md:w-3/4 text-justify">
                Do not Reload this page
              </span>
            </div>
            {/* top left */}
            <div className=" h-full w-3/4 md:w-1/2 flex justify-center items-center md:text-4xl text-md text-white space-x-2 md:space-x-5">
              <span>
                <AccountCircleIcon style={{ fontSize: 50 }} />
              </span>
              <span className="font-semibold">Register Form</span>
            </div>
           
          </div>
        </div>
      
      
      {/* Personel Details Form and Its validations */}
      <div className="relative mt-20  md:w-3/4 flex flex-col justify-center items-center">
        <div className="md:my-0 relative  flex flex-col justify-center items-center">
          <span className="block text-xl md:text-2xl text-indigo-900 font-bold ">
            Personel Details
          </span>
          <span className="w-10 md:w-12 mt-2 block h-1 rounded bg-indigo-900"></span>
        </div>
        <div className="md:h-2/3 my-4 md:justify-items-center flex flex-col justify-center text-white items-center w-5/6 md:grid  md:grid-cols-2 ring-1 ring-gray-200 bg-whitebg  rounded-md shadow-xl">
          <div className="w-3/4 flex flex-col space-y-1 md:space-y-3 m-6 text-indigo-900">
            <label htmlFor="full_name" className="text-sm md:text-base font-medium">
              Full Name*
            </label>
            <input
              type="text"
              id="full_name"
              // register field
              {...register("fullname", {
                // validations
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              name="fullname"
              className="ring-1 ring-gray-200 bg-gray-100 rounded-md p-4 text-indigo-900 shadow-lg h-9 md:h-10 focus:outline-none focus:ring-1 focus:ring-black"
            ></input>
            {/* errors */}
            {errors.fullname && errors.fullname.type === "maxLength" && (
              <span>Max length is 20</span>
            )}
            {errors.fullname && errors.fullname.type === "required" && (
              <span>Please fill this field</span>
            )}
            {errors.fullname && errors.fullname.type === "minLength" && (
              <span>Atleast 3 characters</span>
            )}
          </div>

          <div className="w-3/4 flex flex-col space-y-3 mx-6 text-indigo-900">
            <label htmlFor="age_" className="text-sm md:text-base font-medium">
              Age*
            </label>
            <input
              type="text"
              id="age_"
              name="age"
              // register field
              {...register("age", {
                // validations
                required: true,
                pattern: /[0-9]/,
                max: 100,
                min: 18,
              })}
              className="ring-1 ring-gray-200 bg-gray-100 text-indigo-900 rounded-md p-4 shadow-lg focus:outline-none h-9 md:h-10 focus:ring-1 focus:ring-black"
            ></input>
            {/* errors */}
            {errors.age && errors.age.type === "required" && (
              <span>Please fill this field</span>
            )}
            {errors.age && errors.age.type === "max" && (
              <span>Maximum age upto 100</span>
            )}
            {errors.age && errors.age.type === "min" && (
              <span>You must be above 18</span>
            )}
            {errors.age && errors.age.type === "pattern" && (
              <span>Must be in Digit</span>
            )}
          </div>
          <div className="w-3/4 flex flex-col space-y-3 m-6 text-indigo-900">
            <label htmlFor="gender_" className="text-sm md:text-base font-medium">
              Gender*
            </label>
            <select
              type="text"
              id="gender_"
              name="gender"
              // register field
              {...register("gender")}
              className="ring-1 ring-gray-200 bg-gray-100 text-indigo-900 rounded-md p-2 shadow-lg focus:outline-none h-9 md:h-10 focus:ring-1 focus:ring-black"
            >
              <option value="female" className="">
                female
              </option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="w-3/4 flex flex-col space-y-3 m-6 text-indigo-900">
            <label htmlFor="mobileno_" className="font-medium">
              Mobile no.*
            </label>
            <input
              type="text"
              id="mobileno_"
              name="mobileno"
              // register field
              {...register("mobileno", {
                //validations
                required: true,
                message: "Fill your mobileno",
                pattern: /[0-9]/,
                maxLength: 10,
              })}
              className="ring-1 ring-gray-200 bg-gray-100 text-indigo-900 rounded-md p-4 shadow-lg focus:outline-none h-10 focus:ring-1 focus:ring-black"
            ></input>
            {/* errors */}
            {errors.mobileno && errors.mobileno.type === "maxLength" && (
              <span>Max length is 10</span>
            )}
            {errors.mobileno && errors.mobileno.type === "required" && (
              <span>Please fill this field</span>
            )}
            {errors.mobileno && errors.mobileno.type === "pattern" && (
              <span>Must be in digit</span>
            )}
          </div>
          {/* Email readOnly field */}
          <div className="w-3/4 flex flex-col space-y-3 m-6 text-indigo-900">
            
            <label htmlFor="email_" className="font-medium">
              Email*
            </label>
            <input
              type="text"
              id="email_"
              name="email"
              value={email}
              readOnly
              //form register
              {...register("email", {})}
              className="ring-1 ring-gray-200 bg-gray-100 text-indigo-900 rounded-md p-4 shadow-lg focus:outline-none h-10 focus:ring-1 focus:ring-black"
            ></input>
            {/* errors */}
            {errors.email && errors.email.type === "required" && (
              <span>Please fill this field</span>
            )}
          </div>
        </div>
      </div>
      </main>
      {/*Security Details Form and Its validations*/}
      <div className="relative md:w-3/4 mt-20 my-10 flex flex-col justify-center items-center">
        <div className="md:ml-10 md:my-0 my-4 flex flex-col items-center">
          <span className="block text-2xl text-indigo-900 font-bold ">
            Security Details
          </span>
          <span className="w-12 mt-2 flex h-1 rounded bg-indigo-900"></span>
        </div>
    
        <div className="md:h-2/3 my-4 py-10 flex flex-col justify-center md:justify-items-center items-center w-5/6 md:grid  md:grid-cols-2 ring-1 ring-gray-200 text-white bg-whitebg rounded-md shadow-xl">
        
          <div className="w-3/4 flex flex-col space-y-3 m-6 text-indigo-900">
          
            <label htmlFor="password_" className="font-medium">
              New Password*
            </label>
            <input
              type="password"
              id="password_"
              name="password"
              // register field
              {...register("password", {
                //validations
                required: true,
                minLength: 6,
              })}
              className="ring-1 ring-gray-200  bg-gray-100 text-indigo-900 rounded-md p-4 shadow-lg focus:outline-none h-10 focus:ring-1 focus:ring-black"
            ></input>
            {/* errors */}
            {errors.password && errors.password.type === "required" && (
              <span>Please fill this field</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span>min length 3</span>
            )}
          </div>
          
          <div className="w-3/4 flex flex-col space-y-3 m-6 text-indigo-900">
            <label htmlFor="password_repeat_" className="font-medium">
              Confirm Password*
            </label>
            <input
              type="password"
              id="password_repeat_"
              name="password_repeat"

              // register field
              {...register(
                "password_repeat",
                test(password.current) // Password check validation
              )}
              className="ring-1 ring-gray-200 bg-gray-100 text-indigo-900 rounded-md p-4 shadow-lg focus:outline-none h-10 focus:ring-1 focus:ring-black"
            ></input>
            {/* errors */}
            {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
          </div>
      
        </div>


      </div>
      
      
      <div className="flex justify-center">
        {/* submit button */}
        <button
          type="submit"
          className="bg-white border border-indigo-100 hover:text-white hover:bg-indigo-500  text-indigo-900 py-2 px-8 mb-10 rounded-md shadow-md"
   
        >
          Next
        </button>
      </div>
    </form>
    }
  {/* checking if user sign with google or not */}
    {checkemail == false &&
      <div className ="h-screen w-full flex flex-col justify-center items-center text-black">
        404. Page Not Found  
        
      </div>
    }
    </div>
  );
}
