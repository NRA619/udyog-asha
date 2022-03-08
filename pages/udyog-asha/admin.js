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
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

export default function Admin() {
  const [servicedata, setservicedata] = useState([]);
  const [dropdown, setdropdown] = useState("");
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [isLogged, setisLogged] = useState(false);
  const [loading, setloading] = useState(true);
  const [verified, setverified] = useState([]);
  const [inprogress, setinprogress] = useState([])
  const [dropdow, setdropdow] = useState(false);
  const [dropdownvalue, setdropdownvalue] = useState("Pending products");

  useEffect(async () => {
    const data = parseCookies();
    if (data.user_admin) {
      setloading(false);
      setisLogged(true);
      const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/service/getservices");
      console.log(res);
      setservicedata(res.data);
      const res1 = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/payment/check_pending");
      console.log(res1.data);
      setverified(res1.data);
      const res2 = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/payment/check_inprogress");
      console.log(res2.data);
      setinprogress(res2.data); 
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
      const verify = values.verify;
      const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/service/unverified", {
        email: dropdown,
        service: service,
        subservice: subservice,
        verify: verify,
      });
      if(res.data.data == "done"){
        return window.location.reload();
      }else {
        return alert("Something went wrong")
      }
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



  async function pending_data(values) {
    const proceed = confirm("Are You sure?");
    if (proceed) {
      const pay_id = values[0].id;
      const email = values[0].email;
      const timestamp = values[0].created_at;
      console.log(pay_id);
      const res = await axios.post(
        "https://murmuring-eyrie-62394.herokuapp.com/payment/pending_products",
        {
          pay_id: pay_id,
          email: email,
          timestamp: timestamp,
        }
      );
      if(res.data.update){
        alert("data updated successfully");
        return window.location.reload();
      }
    }
  }

  async function inprogress_data(values){
    const pay_id = values[0].id;
    const email = values[0].email;
    const timestamp = values[0].created_at;
    const res = await axios.post(
      "https://murmuring-eyrie-62394.herokuapp.com/payment/inprogress_service",
      {
        pay_id: pay_id,
        email: email,
        timestamp: timestamp,
      }
    );
    if(res.data.update){
      alert("data updated successfully");
      return window.location.reload();
    }
    console.log(res);
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
          <div className="mb-6 m-4 mt-20  text-sm md:text-md flex flex-col ">
            <div className="border border-pink-400 shadow-md py-2 px-4 w-72 flex justify-between rounded-sm">
              <span>{dropdownvalue}</span>
              {dropdow == false && (
                <span>
                  <div className="" onClick={() => setdropdow(true)}>
                    <ArrowDropDownCircleIcon fontSize="small" color= "primary"/>
                  </div>
                </span>
              )}
              {dropdow == true && (
                <span>
                  <div className="" onClick={() => setdropdow(false)}>
                    <ArrowDropUpIcon />
                  </div>
                </span>
              )}
            </div>
            {dropdow == true && (
              <div className="relative ">
                <div className="flex absolute z-10 flex-col w-72 border-pink-900 border bg-white items-start shadow-sm rounded-sm">
                  <div></div>
                  <span className="h-0.1 bg-pink-400 w-72"></span>
                  <button
                    onClick={() => {
                      setdropdow(false), setdropdownvalue("Pending products");
                    }}
                    className="py-2 px-4"
                  >
                    Pending products
                  </button>
                  <span className="h-0.1 bg-pink-400 w-72"></span>
                  <button
                    onClick={() => {
                      setdropdow(false),
                        setdropdownvalue("Unverified services");
                    }}
                    className="py-2 px-4"
                  >
                   Unverified services
                  </button>
                  <span className="h-0.1 bg-pink-400 w-72"></span>
                  <button
                    onClick={() => {
                      setdropdow(false), setdropdownvalue("Business support");
                    }}
                    className="py-2 px-4"
                  >
                    Business support
                  </button>
                </div>
              </div>
            )}
          </div>
      {dropdownvalue == "Unverified services" && (
          <div className="bg-gray-200 m-4 p-4">
            {servicedata.map((service) => (
              <>
                {service.unverified > 0 && (
                  <div
                    key={service.email}
                    className="flex flex-col bg-gray-100 my-5 p-5"
                  >
                    <span className="text-black space-x-2 flex items-center w-full">
                      
                      <span className="bg-gray-200 p-2 rounded-sm shadow-sm flex hover:cursor-pointer">
                        <span className="truncate">{service.email}</span>
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
        
        )}
        
        </>
      )}
      {isLogged == false && loading == false && (
        <div className="min-h-screen w-full flex justify-center items-center text-black pb-40">
          404. Page Not found
        </div>
      )}
      {dropdownvalue == "Pending products" && (
        <>
      {Object.keys(verified).length != 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2">
          {verified.map((data, index) => (
            <div className="h-full w-full" key={index}> 
              <div className="px-4 bg-indigo-600 m-4 py-4 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-white px-2 w-3/5 truncate">
                    {data.result[0].email}
                  </span>
                  <button
                    onClick={() => pending_data(data.result)}
                    className="px-4 py-1 bg-indigo-50 rounded-sm shadow-sm text-indigo-900"
                  >
                    pending
                  </button>
                </div>
                <div className="px-2 text-white space-y-1">
                  {data.product_array.map((data, index) => (
                    <div key={index}>
                      {index + 1}. {data.product_name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </>
      )}
      {dropdownvalue == "Business support" && (
        <>
      {Object.keys(inprogress).length != 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2">
          {inprogress.map((data, index) => (
            <div className="h-full w-full" key={index}>
              <div className="px-4 bg-pink-600 m-4 py-4 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-white px-2 w-3/5 truncate">
                    {data.result[0].email}
                  </span>
                  <button
                    onClick={() => inprogress_data(data.result)}
                    className="px-4 py-1 bg-pink-50 rounded-sm shadow-sm text-pink-900"
                  >
                    pending
                  </button>
                </div>
                <div className="px-2 text-white space-y-1">
                  {data.product_array.map((data, index) => (
                    <div key={index}>
                      {index + 1}. {data.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </>
      )}
    </div>
  );
}
