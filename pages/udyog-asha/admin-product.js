import React, { useState, useEffect } from "react";
import axios from "axios";
import { set, useForm } from "react-hook-form";
import { parseCookies } from "../../components/cookie";
import { useCookies } from "react-cookie";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from "next/router";

export default function Admin_product() {
  // const [, set] = useState(second)
  const router = useRouter();
  const [isLogged, setisLogged] = useState(false);
  const [loading, setloading] = useState(true);
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  useEffect(async () => {
    setloading(true);
    const data = parseCookies();
    if (data.user_admin) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
    setloading(false);
  }, [isLogged, loading]);

  async function onSubmitForm(values) {
    console.log(values);
    const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/admin/save_product", {
      products: values,
    });
    if (res.data.data == "added") {
      alert("data added successfully");
      return (window.location = "/admin");
    } else {
      return alert("Something went wrong");
    }
  }
  return (
    <div className="min-h-full w-full pt-14">
      <div className="w-full h-full bg-gray-800">
        {loading == true && (
          <div className="flex flex-col justify-center items-center h-screen w-screen">
            <BarLoader color="#000000" height={4} width={100} />
          </div>
        )}
        {isLogged == true && loading == false && (
          <>
            <div className="flex justify-center pt-10">
              <span className="text-white text-xl md:text-4xl font-sans font-normal">
                Hi Admin, Upload Some Products
              </span>
            </div>
            <div className="flex justify-center pt-2 md:pt-4">
              <span className="md:h-1 h-0.5 w-40 bg-yellow-400"></span>
            </div>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center mt-10 items-center h-full gap-y-10">
                <div className="flex flex-col space-y-1">
                  <label className="text-yellow-400">Product Name*</label>
                  <input
                    type="text"
                    {...register("pname", {
                      // validations
                      required: true,
                    })}
                    name="pname"
                    className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-10 w-80"
                  ></input>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-yellow-400">Price*</label>
                  <input
                    type="number"
                    {...register("price", {
                      // validations
                      required: true,
                      valueAsNumber: true,
                    })}
                    name="price"
                    className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-10 w-80"
                  ></input>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-yellow-400">Description*</label>
                  <textarea
                    {...register("description", {
                      // validations
                      required: true,
                    })}
                    name="description"
                    className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-20 w-80"
                  ></textarea>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-yellow-400">Image Link*</label>
                  <input
                    type="text"
                    {...register("img", {
                      // validations
                      required: true,
                    })}
                    name="img"
                    className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-10 w-80"
                  ></input>
                </div>
              </div>
              <div className="flex justify-center py-10 space-x-10">
                <button
                  type="submit"
                  className="py-1.5 px-4 bg-gray-900 text-white shadow-md rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
