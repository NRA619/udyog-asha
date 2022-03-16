import axios from "axios";
import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import QueueIcon from "@material-ui/icons/Queue";
import { parseCookies } from "../../components/cookie";
import { useCookies } from "react-cookie";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from "next/router";

export default function Admin_training() {
  const [coursefield, setcoursefield] = useState([]);
  const router = useRouter();
  const [isLogged, setisLogged] = useState(false);
  const [loading, setloading] = useState(true);
  const [samcoursefield, setSamcoursefield] = useState({
    name: "",
    video: "",
    details: [],
  });
  const [sam3coursefield, setSam3coursefield] = useState({
    details: [],
  });
  const [sam2coursefield, setSam2coursefield] = useState([]);
  const [sam4coursefield, setSam4coursefield] = useState([]);
  // const [sam5coursefield, setSam5coursefield] = useState([]);
  const [ays, setays] = useState(false);
  const [form2, setform2] = useState(false);
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
    console.log(sam4coursefield);
    const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/admin/save_train", {
      course: values,
      details: sam4coursefield,
    });
    if (res.data.data == "added") {
      alert("data added successfully");
      return (window.location = "/udyog-asha/admin");
    } else {
      return alert("Something went wrong please try again later");
    }
  }
  // async function onSubmitForm5(values) {
  //   setSamcoursefield({
  //     name: "",
  //     video: "",
  //   })
  //   setSam2coursefield([])
  // }
  const onSubmitForm2 = (values) => {
    if (samcoursefield.name != "" && samcoursefield.video != "") {
      let videolink = samcoursefield.video;
      videolink = videolink.replace(/view\?usp\=sharing/g, "preview");
      setcoursefield((coursefield) => ({
        ...coursefield,
        name: samcoursefield.name,
        video: videolink,
        details: [...sam2coursefield],
      }));
      if (values == "mesure") {
        sam4coursefield.push(coursefield);
        console.log(sam4coursefield);
        setSamcoursefield({
          name: "",
          video: "",
        });
        setSam2coursefield([]);
      }
      console.log(coursefield);
      setays(true);
    }
  };
  async function pushfunc() {
    console.log(coursefield);
  }
  async function onSubmitForm3() {
    if (Object.keys(sam3coursefield.details).length != 0) {
      console.log(sam3coursefield);
      sam2coursefield.push(sam3coursefield.details);
      console.log(sam2coursefield);
      setSam3coursefield({
        details: [],
      });
    }
  }

  return (
    <div className="min-h-screen pt-14 w-full">
      <div className="flex justify-center items-center">
        <div className="bg-gray-800 h-full min-h-screen w-full">
          {loading == true && (
            <div className="flex flex-col justify-center items-center h-screen w-screen">
              <BarLoader color="#000000" height={4} width={100} />
            </div>
          )}
          {isLogged == true && loading == false && (
            <div className="flex flex-col w-full">
              <div className="w-full flex justify-center pt-4">
                <span className="text-white text-xl md:text-4xl font-sans font-medium">
                  Hi Admin, Lets Upload some courses
                </span>
              </div>
              <div className="w-full flex justify-center pt-4">
                <span className="bg-yellow-400 h-1 w-40"></span>
              </div>

              {form2 == false && (
                <div className="mt-12 w-full flex flex-col items-center">
                  <div className="w-full flex justify-center pb-16">
                    <span className="text-white text-lg md:text-3xl font-sans font-normal underline ">
                      Begin with adding chapters
                    </span>
                  </div>
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-x-20 gap-y-20">
                    <div className="flex  space-x-10 w-full">
                      <label className="text-yellow-400 ">Course Day</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          setSamcoursefield((prevSamcoursefield) => ({
                            ...prevSamcoursefield,
                            name: e.target.value,
                          }));
                        }}
                        value={samcoursefield.name}
                        className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-9 w-60"
                      ></input>
                    </div>
                    <div className="flex space-x-10 w-full">
                      <label className="text-yellow-400 ">Video Link*</label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setSamcoursefield((prevSamcoursefield) => ({
                            ...prevSamcoursefield,
                            video: e.target.value,
                          }))
                        }
                        value={samcoursefield.video}
                        className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-9 w-60"
                      ></input>
                    </div>
                  </div>
                  <div className="flex justify-center w-full pt-10 text-white text-2xl underline">
                    <span>Add some subchapters</span>
                  </div>
                  <div className="flex md:space-x-10 space-x-5 pt-10 justify-center">
                    <label className="text-yellow-400 ">Sub Chapters*</label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setSam3coursefield((prevSam3coursefield) => ({
                          ...prevSam3coursefield,
                          details: e.target.value,
                        }))
                      }
                      value={sam3coursefield.details}
                      className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-whitel border-0 focus:outline-none h-9 w-48 md:w-60"
                    ></input>
                    <button onClick={onSubmitForm3} className="text-yellow-400">
                      <QueueIcon />
                    </button>
                  </div>
                  <div className="flex justify-center pt-10">
                    {ays == false && (
                      <button
                        onClick={() => {
                          onSubmitForm2("notsure");
                        }}
                        className="bg-yellow-600 px-5 py-2 shadow-md rounded-md text-white"
                      >
                        Next
                      </button>
                    )}
                    {ays == true && (
                      <button
                        onClick={() => {
                          onSubmitForm2("mesure"), setays(false);
                        }}
                        className="bg-yellow-600 px-5 py-2 shadow-md rounded-md text-white"
                      >
                        Are you sure
                      </button>
                    )}
                  </div>
                  <div className="flex justify-center py-10">
                    <button
                      onClick={() => setform2(true)}
                      className="py-2 px-5 bg-gray-900 shadow-md rounded-md text-white"
                    >
                      Finish
                    </button>
                  </div>
                </div>
              )}
              {form2 == true && (
                <div className="w-full h-full">
                  <div className="flex justify-center pt-10">
                    <span className="text-white text-lg md:text-3xl font-sans font-normal underline">
                      Now it is time for add Course
                    </span>
                  </div>
                  <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center mt-10 items-center h-full gap-y-10">
                      <div className="flex flex-col space-y-1">
                        <label className="text-yellow-400">Course Name*</label>
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
                        <input
                          type="text"
                          {...register("description", {
                            // validations
                            required: true,
                          })}
                          name="description"
                          className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-10 w-80"
                        ></input>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-yellow-400">Invigilator*</label>
                        <input
                          type="text"
                          {...register("invigilator", {
                            // validations
                            required: true,
                          })}
                          name="invigilator"
                          className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-10 w-80"
                        ></input>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label htmlFor="category_" className="text-yellow-400">
                          Category*
                        </label>
                        <select
                          type="text"
                          id="category_"
                          name="category"
                          // register field
                          {...register("category")}
                          className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-10 w-80"
                        >
                          <option
                            value="Food and Food Product"
                            className="w-96"
                          >
                            Food and Food Product
                          </option>
                          <option value="Agro-Processing">
                            Agro-Processing
                          </option>
                          <option value="Technical Training">
                            Technical Training
                          </option>
                          <option value="Business Idea">Business Idea</option>
                          <option value="Entrepreneurship Development">
                            Entrepreneurship Development
                          </option>
                        </select>
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
                      <div className="flex flex-col space-y-1">
                        <label htmlFor="featured_" className="text-yellow-400">
                          Featured*
                        </label>
                        <select
                          type="text"
                          id="featured_"
                          name="featured"
                          // register field
                          {...register("featured")}
                          className="shadow-md bg-gray-900 focus:ring-1 focus:ring-yellow-400 text-white border-0 focus:outline-none h-10 w-80"
                        >
                          <option value={true} className="w-96">
                            true
                          </option>
                          <option value={false}>false</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-center py-10 space-x-10">
                      <button
                        onClick={() => setform2(false)}
                        className="py-1.5 px-4 bg-yellow-600 text-white shadow-md rounded-md text-yellow-4000"
                      >
                        Go back
                      </button>
                      <button
                        type="submit"
                        className="py-1.5 px-4 bg-gray-900 text-white shadow-md rounded-md"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
