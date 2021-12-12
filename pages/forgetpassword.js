import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const test = (curPassword) => {
  const pass = curPassword;
  return {
    validate: (value) => {
      return value === pass || "The passwords do not match";
    },
  };
};

export const Forgetpassword = () => {
  const router = useRouter();
  const [passwordfield, setpasswordfield] = useState(false);
  const [otpfield, setotpfield] = useState(false);
  const [checkotp, setcheckotp] = useState(0);
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const password = useRef({}); // password check validation
  password.current = watch("password", "");
  async function onSubmitForm(values) {
    const email = values.email;
    const res = await axios.post("http://localhost:5000/user/forgetpassword", {
      email: email,
    });
    if (res.data.otp === "notfound") {
      alert("Email id doesn't exist... Please Register first");
    } else {
      setcheckotp(res.data.otp);
      setotpfield(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000 * 60 * 5);
    }
  }
  async function onSubmitForm_2(values) {
    const email = values.email;
    const password = values.password_repeat;
    const res = await axios.post("http://localhost:5000/user/updatepassword", {
      email: email,
      password: password,
    });
    if (res.data.user == "updatedsuccessfully") {
      alert("Password changed successfully");
      window.location = "/login";
    } else {
      alert("error");
    }
  }
  async function onSubmitotp(values) {
    if (checkotp > 0) {
      if (checkotp === values.otp) {
        setpasswordfield(true);
      } else {
        alert("otp is incorrect.. Please try again");
        window.location = "/login";
      }
    }
  }
  return (
    <div>
      <div className="h-screen w-screen bg-forgetpassword bg-cover flex justify-center items-center">
        {otpfield === false && (
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col items-center justify-around bg-indigo-500 bg-opacity-95 w-full mx-4 md:m-0 md:w-1/3 h-80 shadow-lg"
          >
            <div className="flex justify-center text-2xl text-white underline font-medium">
              Forget password
            </div>
            <div className="flex flex-col items-center space-y-2 w-full">
              <label htmlFor="email_" className="text-white text-base">
                Enter your email*
              </label>
              <input
                type="text"
                id="email_"
                name="email"
                //form register
                {...register("email", {
                  required: true,
                })}
                className="ring-1 ring-gray-200 w-3/4 bg-gray-100 text-indigo-900 rounded-md p-2 shadow-lg focus:outline-none h-10 focus:ring-1 mb-10 focus:ring-black"
              ></input>
              {/* errors */}
              {errors.email && errors.email.type === "required" && (
                <span>Please fill this field</span>
              )}
            </div>
            <button
              type="submit"
              className="bg-white hover:text-white hover:bg-black text-indigo-900 py-2 px-8 mt-10 rounded-md shadow-md"
            >
              Next
            </button>
          </form>
        )}
        {otpfield === true && passwordfield === false && (
          <form
            onSubmit={handleSubmit(onSubmitotp)}
            className="flex flex-col items-center justify-around bg-indigo-500 bg-opacity-95 w-full mx-4 md:m-0 md:w-1/3 h-80 shadow-lg"
          >
            <div className="flex justify-center text-white">
              OTP expires in 5 min.
            </div>
            <div className="flex flex-col items-center space-y-2 w-full -mt-4">
              <label htmlFor="otp_" className="text-white text-lg">
                Enter otp*
              </label>
              <input
                type="text"
                id="otp_"
                name="otp"
                //form register
                {...register("otp", {
                  required: true,
                })}
                className="ring-1 ring-gray-200 w-3/4 bg-gray-100 text-indigo-900 rounded-md p-2 shadow-lg focus:outline-none h-10 focus:ring-1 mb-10 focus:ring-black"
              ></input>
              {errors.otp && errors.otp.type === "required" && (
                <span>Please fill this field</span>
              )}
            </div>
            <button
              type="submit"
              className="bg-white border border-indigo-100 hover:text-white hover:bg-black text-indigo-900 py-2 px-8 rounded-md shadow-md"
            >
              Next
            </button>
          </form>
        )}
        {passwordfield === true && (
          <form
            onSubmit={handleSubmit(onSubmitForm_2)}
            className="flex flex-col items-center justify-around bg-indigo-500 bg-opacity-95 w-full mx-4 md:m-0 md:w-1/3 h-96 pt-6 shadow-lg"
          >
            <div className="flex justify-center text-white">
              Change your password
            </div>
            <div className="w-3/4 flex flex-col space-y-3 m-6 text-indigo-900">
              <label htmlFor="password_" className="font-medium text-white">
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

            <div className="w-3/4 flex flex-col space-y-3  text-indigo-900">
              <label
                htmlFor="password_repeat_"
                className="font-medium text-white"
              >
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
              {errors.password_repeat && (
                <p>{errors.password_repeat.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-white border border-indigo-100 hover:text-white hover:bg-black  text-indigo-900 py-2 px-10 mb-10 mt-5 rounded-md shadow-md"
            >
              Next
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Forgetpassword;
