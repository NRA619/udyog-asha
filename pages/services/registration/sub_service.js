import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "../../../components/cookie";
import { useForm } from "react-hook-form";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from "next/router";

export const sub_services = () => {
  const router = useRouter();
  const pid = router.query.id;
  const ss = router.query.sub_service;
  const [data, setdata] = useState([]);
  const [pro, setpro] = useState(true);
  const [priv, setpriv] = useState(false);
  const [oth, setoth] = useState(false);

  const [loading, setloading] = useState(true);
  const [s, sets] = useState("");

  const [type_of_service, settype_of_service] = useState("");

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  useEffect(async () => {
    if (pid && ss) {
      const res = await axios.post(
        "https://murmuring-eyrie-62394.herokuapp.com/service/subservdata",
        {
          pid: pid,
          name: ss,
        }
      );
      setdata(res.data[0].service_array);
      sets(res.data[0].service_array[0].name);
      console.log(Object.keys(type_of_service).length);
      if (s == "GST" && Object.keys(type_of_service).length == 0) {
        settype_of_service("Proprietorship");
      } else if (
        s == "Trademark registration" &&
        Object.keys(type_of_service).length == 0
      ) {
        settype_of_service("Individuals and SoleProprietorship");
      } else if (
        s == "food licence and registration" &&
        Object.keys(type_of_service).length == 0
      ) {
        settype_of_service("For_the_FSSAI_Central_License");
      } else if (
        s == "import export code" &&
        Object.keys(type_of_service).length == 0
      ) {
        settype_of_service("LLP_Company_Proprietor");
      }
    }
    console.log(type_of_service);
    setloading(false);
  }, [pid, ss, s, type_of_service]);

  async function onSubmitForm(values) {
    let k;
    for (k in values) {
      if (values[k][0] != undefined) {
        console.log(values[k][0]);
        if (values[k][0].type != "application/pdf") {
          return alert(values[k][0].type + "Please upload in pdf format");
        } else if (values[k][0].size > 100000) {
          return alert(values[k][0].type + "Please upload smaller than 100kb");
        }
      }
    }

    console.log("haha");
    setloading(true);
    const data = parseCookies();
    if (data.user) {
      console.log("hahaha");
      let buff_dec = new Buffer.from(data.user, "base64");
      let xyz = buff_dec.toString("ascii");
      var email = xyz;
      if (email) {
        email = email.replace(/"/g, "");
        let formdata = new FormData();
        let z;
        for (z in values) {
          console.log("hahagaga");
          if (Object.keys(type_of_service).length != 0) {
            if (type_of_service == "Proprietorship") {
              if (
                z != "rdp0" &&
                z != "rdp1" &&
                z != "rdp2" &&
                z != "rdp3" &&
                z != "rdp4" &&
                z != "rdp5" &&
                z != "rdp6"
              ) {
                formdata.append("file", values[z][0]);
              }
            } else if (type_of_service == "Private_Limited_Company") {
              if (z != "idp0" && z != "idp1" && z != "idp2" && z != "idp3") {
                formdata.append("file", values[z][0]);
              }
            } else {
              console.log("hahafdfdfdfd");
              formdata.append("file", values[z][0]);
              console.log(values[z][0]);
            }
          } else {
            formdata.append("file", values[z][0]);
          }
        }
        if (Object.keys(type_of_service).length != 0) {
          formdata.append("type_of_service", type_of_service);
        } else {
          formdata.append("type_of_service", "NULL");
        }

        if (Object.keys(s).length != 0) {
          formdata.append("subservice", s);
        } else {
          return alert("error");
        }
        formdata.append("email", email);
        formdata.append("service", "registration");
        console.log("213131231313123");
        const res = await axios.post(
          "https://murmuring-eyrie-62394.herokuapp.com/service/apply",
          formdata
        );
        console.log(res);
        if (res.data.applied == "already_applied") {
          setloading(false);
          alert("Already applied for this service...");
          return window.location.reload();
        } else {
          setloading(false);
          alert(
            "Wait for 1-2 weeks for verification for your files, we will mail you once it verified"
          );
          return window.location.reload();
        }
      }
    }
  }
  //   let k,
  //     x = 0;
  //   for (k in values) {
  //     if (k != "idp0" && k != "idp1" && k != "idp2" && k != "idp3") {
  //       console.log(values[k]);
  //     }
  //     if (values[k][0] == undefined) {
  //       console.log(true);
  //     }
  //   }
  // }
  return (
    <div className="bg-black bg-opacity-80 flex justify-center pt-14   min-h-screen w-full h-full">
      {loading == true && (
        <div className=" flex justify-center z-20 absolute bg-black bg-opacity-40 min-h-screen  min-w-full">
          <div className="flex flex-col justify-center items-center w-full min-h-screen h-full">
            <BarLoader color="#ffffff" height={4} width={100} />
          </div>
        </div>
      )}
      {Object.keys(data).length !== 0 && (
        <>
          {data.map((data) => (
            <>
              {data.name ==
                "Busniess registration (LLP partnership proprietorship up Private Limited public limited)" && (
                <div className="bg-white " key={data.name}>
                  <div className=" ">
                    <form
                      onSubmit={handleSubmit(onSubmitForm)}
                      className="flex flex-col w-256 h-full"
                    >
                      <div className="flex justify-center pt-4">
                        <span className="text-4xl space-x-1.5">
                          <span className="text-yellow-600">Verification</span>
                          <span>Form</span>
                        </span>
                      </div>
                      <div className="flex flex-col items-center mt-10">
                        <span>
                          *All files are necessary and must be in pdf format.
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>

                      <div className="grid grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.identity_proof.map((idp, index) => (
                          <div className="flex flex-col space-y-2">
                            <label className="text-yellow-600 font-medium flex space-x-1">
                              <span>*{idp}</span>
                              <div className="group text-black flex"></div>
                            </label>
                            <input
                              type="file"
                              {...register(`idp${index}`, {
                                // validations
                                required: true,
                              })}
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                            ></input>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.address_proof.map((adp, index) => (
                          <div className="flex flex-col space-y-2">
                            <label className="text-yellow-600 font-medium flex space-x-1">
                              <span>*{adp}</span>
                              <div className="group text-black flex"></div>
                            </label>
                            <input
                              type="file"
                              {...register(`adp${index}`, {
                                // validations
                                required: true,
                              })}
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                            ></input>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.proof_of_registered_office.map((rdp, index) => (
                          <div className="flex flex-col space-y-2">
                            <label className="text-yellow-600 font-medium flex space-x-1">
                              <span>*{rdp}</span>
                              <div className="group text-black flex"></div>
                            </label>
                            <input
                              type="file"
                              {...register(`rdp${index}`, {
                                // validations
                                required: true,
                              })}
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                            ></input>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-5 items-center">
                        <input
                          class="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="checkbox"
                          required
                        ></input>
                        <label>Are you sure?</label>
                      </div>
                      <div className="flex justify-center pb-10">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-yellow-600 brightness-105 glow-yellow-900-md hover:text-yellow-500 hover:bg-white hover:border hover:border-yellow-500 hover:scale-105 ease-in-out transform delay-150 mt-10 shadow-sm rounded-sm text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {data.name == "GST" && (
                <div className="bg-white " key={data.name}>
                  <div className=" ">
                    <form
                      onSubmit={handleSubmit(onSubmitForm)}
                      className="flex flex-col w-full h-full"
                    >
                      <div className="flex justify-center pt-4">
                        <span className="text-4xl space-x-1.5">
                          <span className="text-yellow-600">Verification</span>
                          <span>Form</span>
                        </span>
                      </div>
                      <div className="flex flex-col items-center mt-10">
                        <span>
                          *All files are necessary and must be in pdf format.
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>
                      <div className="form-check pt-10 flex flex-col items-start px-10 md:flex-row md:justify-around md:items-center ">
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(true),
                                setpriv(false),
                                settype_of_service("Proprietorship");
                            }}
                            class="form-check-input appearance-none  rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="Proprietorship"
                            name="type_of_service"
                            defaultChecked
                          />
                          Proprietorship
                        </div>
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(false),
                                setpriv(true),
                                settype_of_service("Private_Limited_Company");
                            }}
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="Private_Limited_Company"
                            name="type_of_service"
                          />
                          Private_Limited_Company
                        </div>
                      </div>
                      {pro == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.Proprietorship.map((idp, index) => (
                            <div className="flex flex-col space-y-2">
                              <label className="text-yellow-600 font-medium flex space-x-1">
                                <span>*{idp}</span>
                                <div className="group text-black flex"></div>
                              </label>
                              <input
                                type="file"
                                {...register(`idp${index}`, {
                                  // validations
                                  required: true,
                                })}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                              ></input>
                            </div>
                          ))}
                        </div>
                      )}
                      {priv == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.Private_Limited_Company.map((rdp, index) => (
                            <div className="flex flex-col space-y-2">
                              <label className="text-yellow-600 font-medium flex space-x-1">
                                <span>*{rdp}</span>
                                <div className="group text-black flex"></div>
                              </label>
                              <input
                                type="file"
                                {...register(`rdp${index}`, {
                                  // validations
                                  required: true,
                                })}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                              ></input>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.proof_of_address_of_director.map((adp, index) => (
                          <div className="flex flex-col space-y-2">
                            <label className="text-yellow-600 font-medium flex space-x-1">
                              <span>*{adp}</span>
                              <div className="group text-black flex"></div>
                            </label>
                            <input
                              type="file"
                              {...register(`adp${index}`, {
                                // validations
                                required: true,
                              })}
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                            ></input>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-5 items-center">
                        <input
                          class="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="checkbox"
                          required
                        ></input>
                        <label>Are you sure?</label>
                      </div>
                      <div className="flex justify-center pb-10">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-yellow-600 brightness-105 glow-yellow-900-md hover:text-yellow-500 hover:bg-white hover:border hover:border-yellow-500 hover:scale-105 ease-in-out transform delay-150 mt-10 shadow-sm rounded-sm text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {data.name == "PAN card" && (
                <div className="bg-white " key={data.name}>
                  <div className=" ">
                    <form
                      onSubmit={handleSubmit(onSubmitForm)}
                      className="flex flex-col w-full h-full"
                    >
                      <div className="flex justify-center pt-4">
                        <span className="text-4xl space-x-1.5">
                          <span className="text-yellow-600">Verification</span>
                          <span>Form</span>
                        </span>
                      </div>
                      <div className="flex flex-col items-center mt-10">
                        <span>
                          *All files are necessary and must be in pdf format.
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.documents.map((doc, index) => (
                          <div className="flex flex-col space-y-2">
                            <label className="text-yellow-600 font-medium flex space-x-1">
                              <span>*{doc}</span>
                              <div className="group text-black flex"></div>
                            </label>
                            <input
                              type="file"
                              {...register(`cdp${index}`, {
                                // validations
                                required: true,
                              })}
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                            ></input>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-5 items-center">
                        <input
                          class="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="checkbox"
                          required
                        ></input>
                        <label>Are you sure?</label>
                      </div>
                      <div className="flex justify-center pb-10">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-yellow-600 brightness-105 glow-yellow-900-md hover:text-yellow-500 hover:bg-white hover:border hover:border-yellow-500 hover:scale-105 ease-in-out transform delay-150 mt-10 shadow-sm rounded-sm text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {data.name == "Trademark registration" && (
                <div className="bg-white " key={data.name}>
                  <div className=" ">
                    <form
                      onSubmit={handleSubmit(onSubmitForm)}
                      className="flex flex-col w-full h-full"
                    >
                      <div className="flex justify-center pt-4">
                        <span className="text-4xl space-x-1.5">
                          <span className="text-yellow-600">Verification</span>
                          <span>Form</span>
                        </span>
                      </div>
                      <div className="flex flex-col items-center mt-10">
                        <span>
                          *All files are necessary and must be in pdf format.
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>
                      <div className="form-check pt-10 flex md:flex-row flex-col px-10 md:px-2 justify-start items-start md:justify-around md:items-center">
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(true),
                                setpriv(false),
                                setoth(false),
                                settype_of_service(
                                  "Individuals and SoleProprietorship"
                                );
                            }}
                            class=" appearance-none  rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="Individuals and SoleProprietorship"
                            name="type_of_service"
                            defaultChecked
                          />
                          Individuals and SoleProprietorship
                        </div>
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(false),
                                setpriv(true),
                                setoth(false),
                                settype_of_service(
                                  "Partnership/LLP/Company-Small-Enterprise or Startup"
                                );
                            }}
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="Partnership_LLP_Company_Small_Enterprise_Startup"
                            name="type_of_service"
                          />
                          Partnership/LLP/Company-Small-Enterprise or Startup
                        </div>
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(false),
                                setpriv(false),
                                setoth(true),
                                settype_of_service("Other Applicants");
                            }}
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="Other_Applicants"
                            name="type_of_service"
                          />
                          Other Applicants
                        </div>
                      </div>
                      {pro == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.Individuals_Sole_Proprietorship.map(
                            (doc, index) => (
                              <div className="flex flex-col space-y-2">
                                <label className="text-yellow-600 font-medium flex space-x-1">
                                  <span>*{doc}</span>
                                  <div className="group text-black flex"></div>
                                </label>
                                <input
                                  type="file"
                                  {...register(`cdp${index}`, {
                                    // validations
                                    required: true,
                                  })}
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                                ></input>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      {priv == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.Partnership_LLP_Company_Small_Enterprise_Startup.map(
                            (doc, index) => (
                              <div className="flex flex-col space-y-2">
                                <label className="text-yellow-600 font-medium flex space-x-1">
                                  <span>*{doc}</span>
                                  <div className="group text-black flex"></div>
                                </label>
                                <input
                                  type="file"
                                  {...register(`cdp${index}`, {
                                    // validations
                                    required: true,
                                  })}
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                                ></input>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      {oth == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.Other_Applicants.map((doc, index) => (
                            <div className="flex flex-col space-y-2">
                              <label className="text-yellow-600 font-medium flex space-x-1">
                                <span>*{doc}</span>
                                <div className="group text-black flex"></div>
                              </label>
                              <input
                                type="file"
                                {...register(`cdp${index}`, {
                                  // validations
                                  required: true,
                                })}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                              ></input>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex justify-center mt-5 items-center">
                        <input
                          class="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="checkbox"
                          required
                        ></input>
                        <label>Are you sure?</label>
                      </div>
                      <div className="flex justify-center pb-10">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-yellow-600 brightness-105 glow-yellow-900-md hover:text-yellow-500 hover:bg-white hover:border hover:border-yellow-500 hover:scale-105 ease-in-out transform delay-150 mt-10 shadow-sm rounded-sm text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {data.name == "food licence and registration" && (
                <div className="bg-white " key={data.name}>
                  <div className=" ">
                    <form
                      onSubmit={handleSubmit(onSubmitForm)}
                      className="flex flex-col w-full h-full"
                    >
                      <div className="flex justify-center pt-4">
                        <span className="text-4xl space-x-1.5">
                          <span className="text-yellow-600">Verification</span>
                          <span>Form</span>
                        </span>
                      </div>
                      <div className="flex flex-col items-center mt-10">
                        <span>
                          *All files are necessary and must be in pdf format.
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>
                      <div className="form-check pt-10 flex flex-col items-start px-10 md:flex-row justify-around md:items-center ">
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(true), setpriv(false);
                            }}
                            class="form-check-input appearance-none  rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="For_the_FSSAI_Central_License"
                            name="type_of_service"
                            defaultChecked
                          />
                          For the FSSAI Central License
                        </div>
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(false), setpriv(true);
                            }}
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="For_the_State_License"
                            name="type_of_service"
                          />
                          For the State License
                        </div>
                      </div>
                      {pro == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.For_the_FSSAI_Central_License.map(
                            (doc, index) => (
                              <div className="flex flex-col space-y-2">
                                <label className="text-yellow-600 font-medium flex space-x-1">
                                  <span>*{doc}</span>
                                  <div className="group text-black flex"></div>
                                </label>
                                <input
                                  type="file"
                                  {...register(`cdp${index}`, {
                                    // validations
                                  })}
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                                ></input>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      {priv == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.For_the_State_License.map((doc, index) => (
                            <div className="flex flex-col space-y-2">
                              <label className="text-yellow-600 font-medium flex space-x-1">
                                <span>*{doc}</span>
                                <div className="group text-black flex"></div>
                              </label>
                              <input
                                type="file"
                                {...register(`cdp${index}`, {
                                  // validations
                                  required: true,
                                })}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                              ></input>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex justify-center mt-5 items-center">
                        <input
                          class="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="checkbox"
                          required
                        ></input>
                        <label>Are you sure?</label>
                      </div>
                      <div className="flex justify-center pb-10">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-yellow-600 brightness-105 glow-yellow-900-md hover:text-yellow-500 hover:bg-white hover:border hover:border-yellow-500 hover:scale-105 ease-in-out transform delay-150 mt-10 shadow-sm rounded-sm text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {data.name == "msme registration udyami" && (
                <div className="bg-white " key={data.name}>
                  <div className=" ">
                    <form
                      onSubmit={handleSubmit(onSubmitForm)}
                      className="flex flex-col w-full h-full"
                    >
                      <div className="flex justify-center pt-4">
                        <span className="text-4xl space-x-1.5">
                          <span className="text-yellow-600">Verification</span>
                          <span>Form</span>
                        </span>
                      </div>
                      <div className="flex flex-col items-center mt-10">
                        <span>
                          *All files are necessary and must be in pdf format.
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.documents.map((doc, index) => (
                          <div className="flex flex-col space-y-2">
                            <label className="text-yellow-600 font-medium flex space-x-1">
                              <span>*{doc}</span>
                              <div className="group text-black flex"></div>
                            </label>
                            <input
                              type="file"
                              {...register(`cdp${index}`, {
                                // validations
                                required: true,
                              })}
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                            ></input>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-5 items-center">
                        <input
                          class="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="checkbox"
                          required
                        ></input>
                        <label>Are you sure?</label>
                      </div>
                      <div className="flex justify-center pb-10">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-yellow-600 brightness-105 glow-yellow-900-md hover:text-yellow-500 hover:bg-white hover:border hover:border-yellow-500 hover:scale-105 ease-in-out transform delay-150 mt-10 shadow-sm rounded-sm text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {data.name == "import export code" && (
                <div className="bg-white " key={data.name}>
                  <div className=" ">
                    <form
                      onSubmit={handleSubmit(onSubmitForm)}
                      className="flex flex-col w-full h-full"
                    >
                      <div className="flex justify-center pt-4">
                        <span className="text-4xl space-x-1.5">
                          <span className="text-yellow-600">Verification</span>
                          <span>Form</span>
                        </span>
                      </div>
                      <div className="flex flex-col items-center mt-10">
                        <span>
                          *All files are necessary and must be in pdf format.
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>
                      <div className="form-check pt-10 flex px-10 flex-col md:flex-row items-start justify-around md:items-center">
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(true),
                                setpriv(false),
                                setoth(false),
                                settype_of_service("LLP_Company_Proprietor");
                            }}
                            class="form-check-input appearance-none  rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="LLP_Company_Proprietor"
                            name="type_of_service"
                            defaultChecked
                          />
                          LLP/Company/Proprietor's
                        </div>
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(false),
                                setpriv(true),
                                setoth(false),
                                settype_of_service(
                                  "Partners_Directors_Proprietor"
                                );
                            }}
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="Partners_Directors_Proprietor"
                            name="type_of_service"
                          />
                          Partners/Directors/Proprietor
                        </div>
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(false),
                                setpriv(false),
                                setoth(true),
                                settype_of_service("Other_Applicants");
                            }}
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="Other_Applicants"
                            name="type_of_service"
                          />
                          Other Applicants
                        </div>
                      </div>
                      {pro == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.LLP_Company_Proprietor.map((doc, index) => (
                            <div className="flex flex-col space-y-2">
                              <label className="text-yellow-600 font-medium flex space-x-1">
                                <span>*{doc}</span>
                                <div className="group text-black flex"></div>
                              </label>
                              <input
                                type="file"
                                {...register(`cdp${index}`, {
                                  // validations
                                  required: true,
                                })}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                              ></input>
                            </div>
                          ))}
                        </div>
                      )}
                      {priv == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.Partners_Directors_Proprietor.map(
                            (doc, index) => (
                              <div className="flex flex-col space-y-2">
                                <label className="text-yellow-600 font-medium flex space-x-1">
                                  <span>*{doc}</span>
                                  <div className="group text-black flex"></div>
                                </label>
                                <input
                                  type="file"
                                  {...register(`cdp${index}`, {
                                    // validations
                                    required: true,
                                  })}
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                                ></input>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      {oth == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.Other_Applicants.map((doc, index) => (
                            <div className="flex flex-col space-y-2">
                              <label className="text-yellow-600 font-medium flex space-x-1">
                                <span>*{doc}</span>
                                <div className="group text-black flex"></div>
                              </label>
                              <input
                                type="file"
                                {...register(`cdp${index}`, {
                                  // validations
                                  required: true,
                                })}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                              ></input>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex justify-center mt-5 items-center">
                        <input
                          class="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="checkbox"
                          required
                        ></input>
                        <label>Are you sure?</label>
                      </div>
                      <div className="flex justify-center pb-10">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-yellow-600 brightness-105 glow-yellow-900-md hover:text-yellow-500 hover:bg-white hover:border hover:border-yellow-500 hover:scale-105 ease-in-out transform delay-150 mt-10 shadow-sm rounded-sm text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default sub_services;
