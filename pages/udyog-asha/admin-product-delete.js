import axios from "axios";
import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { parseCookies } from "../../components/cookie";
import { useCookies } from "react-cookie";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from "next/router";

export default function Admin_product_delete() {
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
    const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/admin/delete_product", {
      values,
    });
    if (res.data.data == "updated") {
      alert("data deleted successfully");
      return (window.location = "/udyog-asha/admin");
    } else {
      return alert("Something went wrong please try again later");
    }
  }

  return (
    <div className="min-h-screen w-full pt-16">
      <div className="min-h-full w-full p-2 md:p-0 flex justify-center items-center">
        <div className="h-3/4 p-10 mt-10 md:mt-8 w-full md:w-1/2 bg-gray-800 flex flex-col">
          {loading == true && (
            <div className="flex flex-col justify-center items-center h-screen w-screen">
              <BarLoader color="#000000" height={4} width={100} />
            </div>
          )}
          {isLogged == true && loading == false && (
            <>
              <div className="flex justify-center text-white text-3xl pb-20">
                <span>Hi Admin, want to delete a product?</span>
              </div>
              <form
                onSubmit={handleSubmit(onSubmitForm)}
                className="space-y-10"
              >
                <div className="text-white flex justify-between">
                  <label>Product name</label>
                  <input
                    type="text"
                    {...register("pname", {
                      // validations
                      required: true,
                    })}
                    className="shadow-md border-0 focus:ring-1 focus:ring-white focus:outline-none h-10 w-60 bg-gray-900"
                  ></input>
                </div>

                <div className="flex justify-center ">
                  <button
                    type="submit"
                    className="text-white py-1.5 px-4 bg-gray-900 shadow-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
