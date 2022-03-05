import axios from "axios";

import React, { useState, useEffect } from "react";
import UpdateIcon from "@material-ui/icons/Update";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import { parseCookies } from "../../components/cookie";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import BarLoader from "react-spinners/BarLoader";

export default function Admin() {
  const [servicedata, setservicedata] = useState([]);
  const [dropdown, setdropdown] = useState("");
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [isLogged, setisLogged] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(async () => {
    const data = parseCookies();
    if (data.user_admin) {
      setloading(false);
      setisLogged(true);
      const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/service/getservices");
      console.log(res);
      setservicedata(res.data);
    } else {
      setloading(false);
      setisLogged(false);
    }
  }, [isLogged, loading]);

  async function unverified(values) {
    const proceed = confirm("Are You sure?");
    if (proceed) {
      console.log(values);
      console.log(dropdown);
      const service = values.serv;
      const subservice = values.subserv;
      const verify = values.verify
      const res = await axios.post("http://murmuring-eyrie-62394.herokuapp.com/service/unverified", {
        email: dropdown,
        service: service,
        subservice: subservice,
        verify: verify,
      });
      return window.location.reload();
    } else {
      return;
    }
  }
  async function logout() {
    removeCookie("user_admin", {
      path: "/",
      maxAge: 3600, // Expires After 1hr
      sameSite: true,
    });
    setisLogged(false);
    window.location = "/udyog-asha/admin-login";
  }
  return (
    <div className="pt-20 bg-white text-black min-h-screen w-full">
      {loading == true && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
          <BarLoader color="#000000" height={4} width={100} />
        </div>
      )}
      {isLogged == true && loading == false && (
        <>
          <div className="flex space-x-1 justify-center">
            <span className="text-4xl font-semibold">Welcome</span>
            <span className="text-blue-600 text-4xl font-semibold ">
              Udyog-Asha
            </span>
            <button
              onClick={() => logout()}
              className="bg-black text-white right-10 py-1.5 px-3 space-x-2 absolute md:flex hidden justify-center items-center"
            >
              <span className="">
                <ExitToAppOutlinedIcon fontSize="small" color="" />
              </span>
              <span className="mt-0.5">Logout</span>
            </button>
          </div>
          <div className="h-20 w-full p-4 flex mb-20">
            <span className="h-20 w-full flex justify-center items-center text-xl text-blue-800">
              <span>Here are all the unverified services.</span>
            </span>
          </div>
          <div className="bg-gray-200 m-4 p-4">
            {servicedata.map((service) => (
              <>
                {service.unverified > 0 && (
                  <div
                    key={service.email}
                    className="flex flex-col bg-gray-100 my-5 p-5"
                  >
                    <span className="text-black space-x-2 flex items-center">
                      <span>
                        <UpdateIcon color="primary" />
                      </span>
                      <span className="bg-gray-200 p-2 rounded-sm shadow-sm flex hover:cursor-pointer">
                        <span>{service.email}</span>
                        {service.email == dropdown ? (
                          <span
                            className="flex justify-center"
                            onClick={() => setdropdown()}
                          >
                            <ArrowDropUpOutlinedIcon />
                          </span>
                        ) : (
                          <span
                            className="flex justify-center"
                            onClick={() => setdropdown(service.email)}
                          >
                            <ArrowDropDownOutlinedIcon />
                          </span>
                        )}
                      </span>
                    </span>
                    {service.email == dropdown && (
                      <div className="mx-8 bg-gray-50 mt-1 shadow-sm rounded-sm p-4">
                        <span className="">
                          {Object.keys(service.registration).length != 0 && (
                            <span>
                              {service.registration.map((registration, key) => (
                                <div
                                  key={registration.subservice}
                                  className="w-full flex justify-between"
                                >
                                  <span className="w-full">
                                    {registration.status == "unverified" && (
                                      <span className="w-full flex justify-between">
                                        <span className="flex items-center space-x-2">
                                          <span className="">
                                            <FiberManualRecordOutlinedIcon fontSize="small" />
                                          </span>
                                          <span className="text-black">
                                            {registration.subservice}
                                          </span>
                                        </span>
                                        <span className="space-x-2">
                                          <button
                                            onClick={() =>
                                              unverified({
                                                serv: "registration",
                                                subserv:
                                                  registration.subservice,
                                                verify: "success",
                                              })
                                            }
                                            className=" bg-blue-600 active:bg-green-100 focus:outline-none my-2 py-1 px-4 text-white rounded-full shadow-md glow-blue-400-md"
                                          >
                                            unverified
                                          </button>
                                          <button
                                            onClick={() =>
                                              unverified({
                                                serv: "registration",
                                                subserv:
                                                  registration.subservice,
                                                verify: "failed",
                                              })
                                            }
                                            className=" bg-blue-600 active:bg-green-100 focus:outline-none my-2 py-1 px-4 text-white rounded-full shadow-md glow-blue-400-md"
                                          >
                                            reject
                                          </button>
                                        </span>
                                      </span>
                                    )}
                                  </span>
                                </div>
                              ))}
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </>
            ))}
          </div>
        </>
      )}
      {isLogged == false && loading == false && (
        <div className="min-h-screen w-full flex justify-center items-center text-black pb-40">
          404. Page Not found
        </div>
      )}
    </div>
  );
}
