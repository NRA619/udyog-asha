import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { parseCookies } from "../../components/cookie";
import BarLoader from "react-spinners/BarLoader";

const Address = () => {
 
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const [check, setcheck] = useState(" ");
  const [details, setdetails] = useState({})
  const [emaillog, setemaillog] = useState(" ");
  const [loading, setloading] = useState(true);
  
  useEffect(async () => {
    window.scrollTo(0, 0)
    const data = parseCookies();
    if(data.user) {
    let buff_dec = new Buffer.from(data.user, "base64");
    let xyz = buff_dec.toString("ascii");
    var email = xyz;
    if (email) {
        email = email.replace(/"/g, "");
      }
    setemaillog(email);
    }
    setTimeout(() => {
      setloading(false);
    }, 3000);
    const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/user/get_address", {
      email: email,
    });
    if (Object.keys(res.data.address).length !== 0  ) {
      setcheck("true");
      if(Object.keys(details).length === 0){
        setdetails(res.data.address);
      }
    }else {
        setcheck("false");   
    } 
  }, [details]);
  async function onSubmitForm(values) {
    const addline1 = values.addressline1;
    const addline2 = values.addressline2;
    const city = values.city;
    const pincode = values.pincode;
    const state = values.state;
    const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/user/update_address", {
      email: emaillog,
      addline1: addline1,
      addline2: addline2,
      city: city,
      pincode: pincode,
      state: state,
    });
    if(res.data.updatedsuccessfully === true) {
      window.location = "/product/cart"
    }else {
      alert("oops! Something went wrong")
    }
  }
  async function onSubmitForm_add(values) { 
    const addline1 = values.addressline1;
    const addline2 = values.addressline2;
    const city = values.city;
    const pincode = values.pincode;
    const state = values.state;
    const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/user/update_address", {
      email: emaillog,
      addline1: addline1,
      addline2: addline2,
      city: city,
      pincode: pincode,
      state: state,
    });
    if(res.data.updatedsuccessfully === true) {
      window.location = "/product/cart"
    }else {
      alert("oops! Something went wrong")
    }
  }
  function cartpage() {
    window.location = "/product/cart"
  }
  return (
    <main className="pt-16 w-full h-full bg-addressfinal bg-opacity-10 bg-cover">
      {loading == true && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
          <BarLoader color="#000000" height={4} width={100} />
        </div>
      )}
      {loading === false && (
      <div>
      <button className="bg-blue-800 text-white py-2 px-4 mt-6 shadow-lg font-medium mx-10" onClick={cartpage}>
        Go back to Cart 
      </button>
      {check === "true" && 
      <div className="p-1 pt-10 md:p-10 text-white h-full md:flex md:flex-row flex flex-col">
        {Object.keys(details).length !== 0 &&
        <div className="bg-black bg-opacity-95 px-4 py-10 md:p-10 flex flex-col md:w-1/2 w-full space-y-12">
          <div claaName="px-6 ">
            <span className="font-bold text-2xl">Current Address</span>
          </div>
          <div className="flex justify-between">
            <span>Address line 1</span>
            <span className="underline break-all">{details[0].addressline1}</span>
          </div>
          <div className="flex justify-between">
            <span>Address line 2</span>
            <span className="underline break-all">{details[0].addressline2}</span>
          </div>
          <div className="flex justify-between">
            <span>City</span>
            <span className="underline break-all">{details[0].city}</span>
          </div>
          <div className="flex justify-between">
            <span>State</span>
            <span className="underline break-all">{details[0].state}</span>
          </div>
          <div className="flex justify-between">
            <span>Pin Code</span>
            <span className="underline break-all">{details[0].pincode}</span>
          </div>
        </div>
        }
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="bg-gray-200 bg-opacity-95  px-4 py-10  md:p-10 w-full md:w-1/2 space-y-12"
        >
          <div claaName="px-6 ">
            <span className="font-bold text-2xl text-blue-800">Change Address</span>
          </div>
          <div className="flex justify-between">
            <label htmlFor="al1" className="text-blue-900">Address line 1</label>
            <input
              id="adl"
              type="text"
              name="addressline1"
              {...register("addressline1", {
                required: true,
              })}
              className="border-b-2 bg-transparent text-blue-900 border-blue-900 focus:outline-none w-2/3 "
            ></input>
          </div>
          <div className="flex justify-between">
            <label htmlFor="al2" className="text-blue-900">Address line 2</label>
            <input
              id="ad2"
              type="text"
              name="addressline2"
              {...register("addressline2", {
                required: true,
              })} 
              className="border-b-2 bg-transparent text-blue-900 border-blue-900 focus:outline-none w-2/3 "
            ></input>
          </div>
          <div className="flex justify-between ">
            
              <label htmlFor="cty" className="text-blue-900">City</label>
              <input
                id="cty"
                type="text"
                name="city"
                {...register("city", {
                  required: true,
                })}
                className="border-b-2 bg-transparent text-blue-900 border-blue-900 p-1 focus:outline-none w-2/3 "
              ></input>
            </div>
          <div className="flex justify-between">
              <label htmlFor="pc" className="text-blue-900">Pin Code</label>
              <input
                id="pc"
                type="text"
                name="pincode"
                {...register("pincode", {
                  required: true,
                })}
                className="border-b-2 bg-transparent text-blue-900 border-blue-900 p-1 focus:outline-none w-2/3 "
              ></input>
            
          </div>
          <div className="flex justify-between">
            <label htmlFor="ste" className="text-blue-900">State</label>
            <select
              type="text"
              id="ste"
              name="state"
              {...register("state", {
                required: true,
              })}
              className=" bg-transparent text-blue-900 border-b-2 border-blue-900 w-2/3 focus:outline-none"
            >
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <button
          type="submit"
          className="bg-white border border-indigo-100  hover:text-white hover:bg-blue-900 text-indigo-900 py-2 px-8  rounded-md shadow-md"
   
        >
          Update
        </button>
          
        </form>
      </div>
      }
      {check === "false" &&
      <div className="flex justify-center mt-10">
      <form
      onSubmit={handleSubmit(onSubmitForm_add)}
      className="bg-black px-5 py-10 md:p-10 md:w-1/2 w-full space-y-12 shadow-sm mb-10"
    >
      <div className="px-6 flex justify-center ">
        <span className="font-bold text-2xl text-white">Add Address</span>
      </div>
      <div className="flex text-white justify-between">
        <label htmlFor="al1">Address line 1</label>
        <input
          id="adl"
          type="text"
          name="addressline1"
          {...register("addressline1", {
            required: true,
          })}
          className="border-b-2 bg-transparent border-red-500 focus:outline-none w-2/3 text-white"
        ></input>
      </div>
      <div className="flex text-white justify-between">
        <label htmlFor="al2">Address line 2</label>
        <input
          id="ad2"
          type="text"
          name="addressline2"
          {...register("addressline2", {
            required: true,
          })}
          className="border-b-2 bg-transparent border-red-500 focus:outline-none w-2/3 text-white"
        ></input>
      </div>
      <div className="flex text-white justify-between ">
          <label htmlFor="cty">City</label>
          <input
            id="cty"
            type="text"
            name="city"
            {...register("city", {
              required: true,
            })}
            className="border-b-2 bg-transparent border-red-500 p-1 focus:outline-none w-2/3 text-white"
          ></input>
        </div>
        <div className="flex text-white justify-between">
          <label htmlFor="pc">Pin Code</label>
          <input
            id="pc"
            type="text"
            name="pincode"
            {...register("pincode", {
              required: true,
            })}
            className="border-b-2 bg-transparent border-red-500 p-1 focus:outline-none w-2/3 text-white"
          ></input>
    
      </div>
      <div className="flex text-white justify-between">
        <label htmlFor="ste">State</label>
        <select
          type="text"
          id="ste"
          name="state"
          {...register("state", {
            required: true,
          })}
          className="text-black bg-transparent border-b-2 border-red-500 w-2/3 focus:outline-none"
        >
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>
      </div>
      <button
          type="submit"
          className="bg-white border border-indigo-100 hover:text-white hover:bg-indigo-500  text-indigo-900 py-2 px-8  rounded-md shadow-md"
   
        >
          Add
        </button>
      
    </form>
    </div> 
      }
      </div>
        )}
    </main>
  );
};

export default Address;
