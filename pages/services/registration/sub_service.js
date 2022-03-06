import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "../../../components/cookie";
import { useForm } from "react-hook-form";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from "next/router";

export const Sub_services = () => {
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
        console.log(email);
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
        } else if(res.data.applied == "false"){
          setloading(false);
          alert(
            "Wait for 1-2 weeks for verification for your files, we will mail you once it verified"
          );
          return window.location = "/"
        }else {
          return alert("Something went wrong")
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
        <div className=" flex justify-center z-20 fixed bg-black bg-cover bg-opacity-40 min-h-screen h-full w-full  min-w-full">
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
                          *All files are necessary and must be in pdf format
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>
                      <div className="flex justify-start items-center px-6 space-x-2 mt-12">
                        <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                        <span className="text-xl font-medium text-yellow-600">
                          Identity Proof of Directors and Shareholders
                        </span>
                      </div>
                      <div className="h-1 w-10 rounded-full  bg-yellow-900 mt-1 mx-10"></div>
                      <div className="grid grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.identity_proof.map((idp, index) => (
                          <div className="flex flex-col space-y-2" key={index}>
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
                      <div className="flex justify-start items-center px-6 space-x-2 mt-12">
                        <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                        <span className="text-xl font-medium text-yellow-600">
                          Address Proof of Directors and Shareholders
                        </span>
                      </div>
                      <div className="h-1 w-10 rounded-full  bg-yellow-900 mt-1 mx-10"></div>
                      <div className="grid grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.address_proof.map((adp, index) => (
                          <div className="flex flex-col space-y-2" key={index}>
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
                      <div className="flex justify-start items-center px-6 space-x-2 mt-12">
                        <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                        <span className="text-xl font-medium text-yellow-600">
                          Proof of Registered office
                        </span>
                      </div>
                      <div className="h-1 w-10 rounded-full  bg-yellow-900 mt-1 mx-10"></div>
                      <div className="grid grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.proof_of_registered_office.map((rdp, index) => (
                          <div className="flex flex-col space-y-2" key={index}>
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
                          className="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                          *All files are necessary and must be in pdf format
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>
                      <div className="flex mt-4 justify-start items-center space-x-2 px-6">
                        <div className="h-2 w-2 bg-yellow-600 rounded-full"></div>
                        <span className="text-yellow-600 text-lg font-medium">
                          Who needs a GST Registration?
                        </span>
                      </div>
                      <div className="flex flex-col justify-center items-start px-10">
                        <span className="text-md text-justify mt-1">
                          Every business or corporation that is involved in the
                          buying and selling and good of services has to
                          register for GST. It is mandatory for companies whose
                          turnover is more than Rs.20 lakhs (for the supply of
                          services) and Rs. 40 lakhs ( for the supply of goods)
                          yearly to register for a GST.
                        </span>
                        <span className="text-md text-justify">
                          All businesses making interstate outward supplies of
                          goods have to register for a GST too. The same applies
                          to businesses making taxable supplies on behalf of
                          other taxable persons, for example, Agents, and
                          Brokers.
                        </span>
                        <span className="text-md text-justify">
                          Also, as per the recent notification, e-commerce
                          sellers/aggregators need not register if total sales
                          are less than Rs.20 lakhs.
                        </span>
                      </div>
                      <div className="flex mt-8 justify-start items-center space-x-2 px-6">
                        <div className="h-2 w-2 bg-yellow-600 rounded-full"></div>
                        <span className="text-lg text-yellow-600 font-medium">
                          Mandatory documents for Online GST registration
                        </span>
                      </div>
                      <div className="h-1 w-10 rounded-full  bg-yellow-900 mt-1 mx-10"></div>
                      <div className="form-check pt-10 flex flex-col items-start px-10 md:flex-row md:justify-around md:items-center ">
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(true),
                                setpriv(false),
                                settype_of_service("Proprietorship");
                            }}
                            className="form-check-input appearance-none  rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="Private_Limited_Company"
                            name="type_of_service"
                          />
                          Private_Limited_Company
                        </div>
                      </div>
                      {pro == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.Proprietorship.map((idp, index) => (
                            <div className="flex flex-col space-y-2" key={index}>
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
                            <div className="flex flex-col space-y-2" key={index}>
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
                      <div className="flex justify-start items-center px-6 space-x-2 mt-10">
                        <div className="h-2 w-2 rounded-full bg-yellow-600"></div>
                        <span className="text-yellow-600 font-medium text-lg">
                          The following can be shown as proof of address of a
                          director
                        </span>
                      </div>
                      <div className="h-1 w-10 rounded-full  bg-yellow-900 mt-1 mx-10"></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.proof_of_address_of_director.map((adp, index) => (
                          <div className="flex flex-col space-y-2" key={index}>
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
                          className="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                          *All files are necessary and must be in pdf format
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>
                      <div className="flex mt-8 justify-start items-center space-x-2 px-6">
                        <div className="h-2 w-2 bg-yellow-600 rounded-full"></div>
                        <span className="text-lg text-yellow-600 font-medium">
                          Mandatory documents for Online PAN Card registration
                        </span>
                      </div>
                      <div className="h-1 w-10 rounded-full  bg-yellow-900 mt-1 mx-10"></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.documents.map((doc, index) => (
                          <div className="flex flex-col space-y-2" key={index}>
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
                          className="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                          *All files are necessary and must be in pdf format
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>
                      <div className="flex mt-8 justify-start items-center space-x-2 px-6">
                        <div className="h-2 w-2 bg-yellow-600 rounded-full"></div>
                        <span className="text-lg text-yellow-600 font-medium">
                          Documents required for Trademark Registration
                        </span>
                      </div>
                      <div className="h-1 w-10 rounded-full  bg-yellow-900 mt-1 mx-10"></div>
                      <div className="flex justify-start mt-4 items-center px-10 text-justify">
                        <div className="flex flex-col space-y-2">
                          <span>
                            Trademark registration is an essential mechanism
                            through which a brand can be protected from unwanted
                            use and infringement. The Indian Government has
                            simplified the trademark registration process. The
                            Entrepreneurs can now easily obtain trademark
                            registration for their brands within a few months.
                            In this article, we look at the documents required
                            for obtaining trademark registration in India.
                          </span>
                          <span>
                            Note: During the trademark application process,
                            there is no requirement for submitting original
                            documents. Scan copy of the original document would
                            suffice the requirement.
                          </span>
                        </div>
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
                            className=" appearance-none  rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="Other_Applicants"
                            name="type_of_service"
                          />
                          Other Applicants
                        </div>
                      </div>
                      {pro == true && (
                        <div>
                        <div className="flex justify-start  px-20 text-justify mt-10">
                          <span>
                            Any individual - Indian National or Foreign
                            National can easily register a trademark in India.
                            There is no requirement for forming a legal entity
                            or business entity to register a trademark.
                            Further, the documents required to register a
                            trademark in the name of a proprietorship are the
                            same as that of an individual as under:
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.Individuals_Sole_Proprietorship.map(
                            (doc, index) => (
                              <div className="flex flex-col space-y-2" key={index}>
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
                        </div>
                      )}
                      {priv == true && (
                        <div>
                        <div className="flex justify-start  px-20 text-justify mt-10">
                          <span>
                            The trademark registration fee varies from Rs.4500
                            to Rs.9500. For small enterprises, startups,
                            proprietorships and individuals, the lower
                            trademark fee of Rs.4500 is applicable. For all
                            other entities, the trademark government fee
                            applicable is Rs.9500. To be classified as a small
                            enterprise, the applicant would have to provide
                            Udyog Aadhar registration certificate. Further, in
                            addition to the Udyog Aadhar registration, the
                            following details would be required.
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.Partnership_LLP_Company_Small_Enterprise_Startup.map(
                            (doc, index) => (
                              <div className="flex flex-col space-y-2" key={index}>
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
                        </div>
                      )}
                      {oth == true && (
                        <div>
                        <div className="flex justify-start  px-20 text-justify mt-10">
                          <span>
                            All other applicants, including companies that do
                            not have Udyog Aadhar registration, will have to
                            submit the following documents to obtain trademark
                            registration in India.
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.Other_Applicants.map((doc, index) => (
                            <div className="flex flex-col space-y-2" key={index}>
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
                        </div>
                      )}
                      <div className="flex justify-center mt-5 items-center">
                        <input
                          className="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                    <div className="flex mt-4 justify-start items-center px-6 space-x-2">
                      <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                      <span className="text-yellow-600 text-xl font-medium">Other Related Guides</span>
                    </div>
                    <div className="mx-10 w-10 h-1 rounded-full bg-yellow-900"></div>
                    <div className="flex flex-col px-10 justify-start mt-4 pb-10">
                      <div className="flex flex-col">
                        <span className="text-yellow-500 text-lg font-base ">Trademark Class 29: Meat, Fruits, Milk and Oils</span>
                        <span className="">Trademark Class 29: Meat, Fruits, Milk and Oils A comprehensive guide to Class 29 of the Trademark Filing Classification. Trademarks must be applied ...</span>
                        </div>
                        <div className="flex flex-col">
                        <span className="text-yellow-500 text-lg font-base ">Trademark Class 37: Building Construction and Repa...</span>
                        <span className="">Trademark Class 37: Building Construction and Repairs A comprehensive guide to Class 37 of the Trademark Filing Classification. Trademarks must be ap...</span>
                        </div>
                        <div className="flex flex-col">
                        <span className="text-yellow-500 text-lg font-base ">Shape Trademark in India</span>
                        <span className="">Shape Trademark in India A distinctive shape of goods or its packaging or any three dimensional object capable of being represented graphically, can ...</span>
                        </div>
                        <div className="flex flex-col">
                        <span className="text-yellow-500 text-lg font-base ">Trademark Class 14: Jewellery, Precious Metals and...</span>
                        <span className="">Trademark Class 14: Jewellery, Precious Metals and Stones A comprehensive guide to Class 14 of the Trademark Filing Classification. Trademarks must b...</span>
                        </div>
                        <div className="flex flex-col">
                        <span className="text-yellow-500 text-lg font-base ">Penalty for Trademark Infringement in India</span>
                        <span className="">Penalty for Trademark Infringement in India A registered trademark is a distinctive mark or symbol to which a person or company has declared ownershi...</span>
                        </div>
                    </div>
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
                          *All files are necessary and must be in pdf format
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>
                      <div className="flex justify-start px-10 text-justify mt-10">
                        <span>According to the Food Safety and Standards Act, an FSSAI registration is mandatory for all food business operators. This registration must be obtained through the FSSAI Food Licensing and Registration System. When applying for this license, keep a document checklist handy for ease.</span>
                      </div>
                      <div className="form-check pt-10 flex flex-col items-start px-10 md:flex-row justify-around md:items-center ">
                        <div>
                          <input
                            type="radio"
                            onClick={() => {
                              setpro(true), setpriv(false);
                            }}
                            className="form-check-input appearance-none  rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                              <div className="flex flex-col space-y-2" key={index}>
                                <label className="text-yellow-600 font-medium flex space-x-1">
                                  <span>*{doc}</span>
                                  <div className="group text-black flex"></div>
                                </label>
                                <input
                                  type="file"
                                  {...register(`cdp${index}`, {
                                    // validations
                                    required:true,
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
                            <div className="flex flex-col space-y-2" key={index}>
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
                      <div className="flex justify-start items-center px-6 mt-8 space-x-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                        <span className="text-yellow-600 font-medium text-xl">Where to File</span>
                      </div>
                      <div className="mt-3 flex justify-start px-10 text-justify">
                        <span>The FSSAI license, whether of the central or state variety, may be initiated online by submitting an application in Form B to the Food Safety and Standards Authority of India on their website. Click here to know more on How to get FSSAI certificate.</span>
                      </div>
                      <div className="flex justify-start items-center px-6 mt-4 space-x-2">
                         <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                         <span className="text-yellow-600 font-medium text-xl">Things to Remember</span>
                      </div>
                      <div className="mt-3 flex justify-start px-10 text-justify">
                        <span>For medium and large scale FBO businesses, it is mandatory to obtain an FSSAI license. Medium scale FBOs such as manufacturing units, marketers, transporters, traders and so on must also apply to the state government. Large scale FBOs such as manufacturers, exporters, importers and so on must apply to the central government.</span>
                      </div>
                      <div className="flex justify-center mt-5 items-center">
                        <input
                          className="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                          *All files are necessary and must be in pdf format
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                        {data.documents.map((doc, index) => (
                          <div className="flex flex-col space-y-2" key={index}>
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
                          className="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                          *All files are necessary and must be in pdf format
                        </span>
                        <span>*Maximum size allowed is 100KB</span>
                      </div>
                      <div className="flex mt-4 justify-start items-center px-6 space-x-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                        <span className="text-yellow-600 text-lg font-medium">Benefits of filing Import Export Code</span>
                      </div>
                      <div className="flex mt-3 justify-start px-10 text-justify">
                        <span>It acts as a license for Importing and Exporting goods. Through IEC number, Goods are cleared from the customs authorities. It provides dealer code details along with the details of the port from which goods are being imported and export. With the help of Import Export Code, it reduces the transport of illegal goods.</span>
                      </div>
                      <div className="flex mt-4 justify-start items-center px-6 space-x-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                        <span className="text-yellow-600 text-lg font-medium">Service Inclusions</span>
                      </div>
                      <div className="flex flex-col mt-3 items-start px-10 text-justify">
                        <span className="">1.	Assistance in applying for Import Export Certificate</span>
                        <span>2.	Assistance in Documentation</span>
                        <span>3.	Guidance in Registration</span>
                        <span>4.	Information on document requirements.</span>
                        <span>5.	Information on the process.</span>
                      </div>
                      <div className="flex mt-4 justify-start items-center px-6 space-x-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                        <span className="text-yellow-600 text-lg font-medium">Service Exclusion</span>
                      </div>
                      <div className="flex flex-col mt-3 items-start px-10 text-justify">
                        <span className="">Follow-ups with the associated government department.</span>
                      </div>
                      <div className="flex mt-4 justify-start items-center px-6 space-x-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                        <span className="text-yellow-600 text-lg font-medium">Average Time For Process</span>
                      </div>
                      <div className="flex flex-col mt-3 items-start px-10 text-justify">
                        <span className="">Five Day Check Out</span>
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
                            className="form-check-input appearance-none  rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="LLP_Company_Proprietor"
                            name="type_of_service"
                            defaultChecked
                          />
                          LLP/Company/Proprietors
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
                            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            value="Other_Applicants"
                            name="type_of_service"
                          />
                          Other Applicants
                        </div>
                      </div>
                      {pro == true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mt-14 gap-y-6 justify-items-stretch gap-x-10">
                          {data.LLP_Company_Proprietor.map((doc, index) => (
                            <div className="flex flex-col space-y-2" key={index}>
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
                              <div className="flex flex-col space-y-2" key={index}>
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
                            <div className="flex flex-col space-y-2" key={index}>
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
                          className="form-check-input appearance-none h-4 w-4 border border-yellow-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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

export default Sub_services;
