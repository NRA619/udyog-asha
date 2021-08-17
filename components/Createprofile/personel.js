import React, { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Login from "../../pages/login";
import Image from "next/image";

const test = (curPassword) => {
  const pass = curPassword;
  return {
    validate: (value) => {
      return value === pass || "The passwords do not match";
    },
  };
};

export default function Personel({ ...data }) {
  const router = useRouter();
  const email = router.query.data;
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const [imgPreview, setImgPreview] = useState("/c1.jpg");

  const [error, setError] = useState(false);

  const handleImageChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  });
  function onSubmitForm(values) {
    values.fullname = values.fullname.trim();
    // const trimvalue = values.trim();
    console.log(values);

    if (values.fullname && values.mobileno) {
      router.push("/");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="md:flex md:flex-col md:items-center"
    >
      <main className="h-screen w-full">
        <div className="flex items-center relative h-1/3 md:h-1/3 w-full">
          <div className="h-full w-full flex justify-center md:block text-yellow-800 bg-gradient-to-r from-black to-indigo-600">
            <div className="float-right w-1/2 h-full hidden md:flex justify-center items-center">
              <span className="text-white  md:w-3/4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                ipsum dolor sit amet, consectetur adipiscing elit consectetur
                adipiscing elit
              </span>
            </div>
            <div className=" h-full w-3/4 md:w-1/2 flex justify-center items-center md:text-4xl text-md text-white space-x-2 md:space-x-5">
              <span>
                <AccountCircleIcon style={{ fontSize: 50 }}  />
              </span>
              <span className="font-semibold">Create Your Profile</span>
            </div>

            <div className="h-0 bg-yellow-100 flex justify-center items-center absolute bottom-0 left-0 right-0 ">
              <Image
                src={imgPreview}
                id="img"
                className="rounded-full md:h-32 md:w-32 h-24 w-24"
                width={128}
                height={128}
              ></Image>
            </div>
          </div>
        </div>
        <div className="h-2/5 md:h-1/3 flex justify-center items-center">
          {
            <div className="flex flex-col justify-center items-center">
                <input
                  type="file"
                  id="file_Upload"
                  name="fileUpload"
                  {...register("fileUpload", {
                    required: true,
                  })}
                  onChange={handleImageChange}
                  className="w-3/4 text-indigo-900 font-semibold"
                />
              <span>(jpg, jpeg or png)</span>
            </div>
          }
        </div>
      </main>

      <div className="relative -mt-28 md:-mt-40 md:w-3/4 flex flex-col justify-center items-center">
        <div className="md:my-0 relative  flex flex-col justify-center items-center">
          <span className="block text-2xl text-indigo-900 font-bold ">
            Personel Details
          </span>
          <span className="w-12 mt-2 block h-1 rounded bg-indigo-900"></span>
        </div>
        <div className="md:h-2/3 my-4 md:justify-items-center flex flex-col justify-center text-white items-center w-5/6 md:grid  md:grid-cols-2 ring-1 ring-gray-200 bg-white rounded-md shadow-xl">
          <div className="w-3/4 flex flex-col space-y-3 m-6 text-indigo-900">
            <label htmlFor="full_name" className="font-medium">
              Full Name*
            </label>
            <input
              type="text"
              id="full_name"
              {...register("fullname", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              name="fullname"
              className="ring-1 ring-gray-200 bg-gray-100 rounded-md p-4 text-indigo-900 shadow-lg h-10 focus:outline-none focus:ring-1 focus:ring-black"
            ></input>
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

          <div className="w-3/4 flex flex-col space-y-3 m-6 text-indigo-900">
            <label htmlFor="age_" className="font-medium">
              Age*
            </label>
            <input
              type="text"
              id="age_"
              name="age"
              {...register("age", {
                required: true,
                pattern: /[0-9]/,
                max: 100,
                min: 18,
              })}
              className="ring-1 ring-gray-200 bg-gray-100 text-indigo-900 rounded-md p-4 shadow-lg focus:outline-none h-10 focus:ring-1 focus:ring-black"
            ></input>
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
            <label htmlFor="gender_" className="font-medium">
              Gender*
            </label>
            <select
              type="text"
              id="gender_"
              name="gender"
              {...register("gender")}
              className="ring-1 ring-gray-200 bg-gray-100 text-indigo-900 rounded-md p-2 shadow-lg focus:outline-none h-10 focus:ring-1 focus:ring-black"
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
              {...register("mobileno", {
                required: true,
                message: "Fill your mobileno",
                pattern: /[0-9]/,
                maxLength: 10,
              })}
              className="ring-1 ring-gray-200 bg-gray-100 text-indigo-900 rounded-md p-4 shadow-lg focus:outline-none h-10 focus:ring-1 focus:ring-black"
            ></input>
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
              {...register("email", {})}
              className="ring-1 ring-gray-200 bg-gray-100 text-indigo-900 rounded-md p-4 shadow-lg focus:outline-none h-10 focus:ring-1 focus:ring-black"
            ></input>

            {errors.email && errors.email.type === "required" && (
              <span>Please fill this field</span>
            )}
          </div>
        </div>
      </div>

      <div className="relative md:w-3/4 mt-20 my-10 flex flex-col justify-center items-center">
        <div className="md:ml-10 md:my-0 my-4 flex flex-col items-center">
          <span className="block text-2xl text-indigo-900 font-bold ">
            Security Details
          </span>
          <span className="w-12 mt-2 flex h-1 rounded bg-indigo-900"></span>
        </div>
        <div className="md:h-2/3 my-4 py-10 flex flex-col justify-center md:justify-items-center items-center w-5/6 md:grid  md:grid-cols-2 ring-1 ring-gray-200 text-white bg-white rounded-md shadow-xl">
          <div className="w-3/4 flex flex-col space-y-3 m-6 text-indigo-900">
            <label htmlFor="password_" className="font-medium">
              New Password*
            </label>
            <input
              type="password"
              id="password_"
              name="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              className="ring-1 ring-gray-200  bg-gray-100 text-indigo-900 rounded-md p-4 shadow-lg focus:outline-none h-10 focus:ring-1 focus:ring-black"
            ></input>
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
              {...register("password_repeat", test(password.current))}
              className="ring-1 ring-gray-200 bg-gray-100 text-indigo-900 rounded-md p-4 shadow-lg focus:outline-none h-10 focus:ring-1 focus:ring-black"
            ></input>
            {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-white border border-indigo-100 hover:text-white hover:bg-indigo-500  text-indigo-900 py-2 px-8 mb-10 rounded-md shadow-md"
        >
          Next
        </button>
      </div>
    </form>
  );
}
