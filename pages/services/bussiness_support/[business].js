import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import Image from "next/image";
import { parseCookies } from "../../../components/cookie";
import { useForm } from "react-hook-form";

const business = () => {
  const router = useRouter();
  const productId = router.query.business;
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(async () => {
    if (productId) {
      const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/service/servid", {
        id: productId,
      });
      setdata(res.data.service_array);
      console.log(res.data.service_array);
    }
    setloading(false);
  }, [productId]);

  async function apply(values) {
    const data = parseCookies();
    if (data.user) {
      let buff_dec = new Buffer.from(data.user, "base64");
        let xyz = buff_dec.toString("ascii");
        var email = xyz;
        if (email) {
          email = email.replace(/"/g, "");
        }
        const response = await axios.post("http://murmuring-eyrie-62394.herokuapp.com/service/checkservice", {
          email: email,
          service_name: values
        });
        if(!(response.data.paid)){
          router.push({
            pathname: "/services/business_support/business_sub_service",
            query: {
              id: productId,
              sub_service: values,
            },
          });
        }else {
          return alert("You have Already applied this service")
        }
      // const res = await axios.post
      
    } else {
      alert("Please Login First");
    }

  }

  return (
    <div className="h-full min-h-screen w-full pt-14 bg-bsupport bg-cover">
      <div className="w-full min-h-screen h-full bg-green-200 bg-opacity-90 px-10 relative">
      {loading == true && (
        <div className=" flex  justify-center fixed z-20 pt-5 -mx-10 min-h-screen w-500 min-w-full">
          <div className="flex flex-col justify-center items-center bg-black bg-opacity-80 w-256 h-128">
            <BarLoader color="#000000" height={4} width={100} />
          </div>
        </div>
      )}
      {Object.keys(data).length !== 0 && (
        <div className="bg-green grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-full w-full pt-14 gap-4 pb-10">
          {data.map((data) => (
            <div key={data.name} className="">
              <div className="flex flex-col justify-between bg-green-600 rounded-lg h-72  shadow-md">
                <span className="text-xl text-center pt-10 px-5 text-black">
                  {data.name}
                </span>
                <button
                  onClick={() => apply(data.name)}
                  className="bg-green-100 text-gray-800 bg-opacity-60 shadow-xl py-4 rounded-b-lg"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default business;
