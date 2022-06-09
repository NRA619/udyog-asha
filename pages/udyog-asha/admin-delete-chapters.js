import axios from "axios";
import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { parseCookies } from "../../components/cookie";
import { useCookies } from "react-cookie";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from "next/router";
import QueueIcon from "@material-ui/icons/Queue";

export default function Admin_add_chapters() {
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

  const [cname, setcname] = useState("");
  const [courseday, setcourseday] = useState("");

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

  async function submitform() {
    console.log(cname);
    console.log(courseday);

    const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/admin/delete_chapters", {
      cname: cname,
      name: courseday,
    });
    if (res.data.data == "updated") {
      alert("data updated successfully");
      return (window.location = "/udyog-asha/admin-train-update");
    } else if (res.data.data == "notexists") {
      return alert("chapter doesn't exits");
    } else {
      return alert("Something went wrong please try again later");
    }
  }

  return (
    <div className="min-h-screen w-full py-16">
      <div className="min-h-full w-full p-2 md:p-0 flex justify-center items-center">
        <div className="h-3/4 p-10 mt-10 md:mt-8 w-full md:w-1/2 bg-gray-800 flex flex-col">
          {loading == true && (
            <div className="flex flex-col justify-center items-center h-screen w-screen">
              <BarLoader color="#000000" height={4} width={100} />
            </div>
          )}
          {isLogged == true && loading == false && (
            <div className="space-y-10 flex flex-col">
              <span className="text-3xl text-white flex justify-center pb-10">
                Delete Chapters
              </span>
              <div className="flex justify-between">
                <label className="text-yellow-400 ">Course name*</label>
                <input
                  type="text"
                  onChange={(e) => setcname(e.target.value)}
                  value={cname}
                  className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-9 w-48 md:w-60"
                ></input>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <label className="text-yellow-400 ">Add Course Day*</label>
                  <input
                    type="text"
                    onChange={(e) => setcourseday(e.target.value)}
                    value={courseday}
                    className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-9 w-48 md:w-60"
                  ></input>
                </div>
              </div>
              <div className="w-full flex justify-center pt-10">
                <button
                  type="submit"
                  onClick={() => submitform()}
                  className="py-1.5 px-4  bg-gray-900 text-white shadow-md rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
