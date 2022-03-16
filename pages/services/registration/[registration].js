import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import Image from "next/image";
import { parseCookies } from "../../../components/cookie";
import { useForm } from "react-hook-form";

const Registation = () => {
  const router = useRouter();
  const productId = router.query.registration;
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(async () => {
    if (productId) {
      const res = await axios.post(
        "https://murmuring-eyrie-62394.herokuapp.com/service/servid",
        {
          id: productId,
        }
      );
      setdata(res.data.service_array);
      console.log(res.data.service_array);
    }
    setloading(false);
  }, [productId]);

  async function apply(values) {
    const data = parseCookies();
    if (data.user) {
      router.push({
        pathname: "/services/registration/sub_service",
        query: {
          id: productId,
          sub_service: values,
        },
      });
    } else {
      alert("Please Login First");
    }
  }

  return (
    <div className="h-full min-h-screen w-full pt-14 bg-registration  bg-cover ">
      <div className="min-h-screen w-full px-10 relative bg-gray-800 bg-opacity-80">
        {loading == true && (
          <div className=" flex justify-center items-center min-h-screen min-w-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <BarLoader color="#000000" height={4} width={100} />
            </div>
          </div>
        )}
        {Object.keys(data).length !== 0 && (
          <div className="bg-yellow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-full w-full pt-14 gap-4 pb-10">
            {data.map((data) => (
              <div key={data.name} className="">
                <div
                  className={` bg-${data.img} bg-cover  rounded-lg h-72  shadow-md`}
                >
                  <div className="bg-gray-800 bg-opacity-60 w-full flex flex-col justify-between rounded-lg h-72 shadow-md">
                    <span className="text-xl text-center pt-10 px-5 text-white">
                      {data.name}
                    </span>
                    <button
                      onClick={() => apply(data.name)}
                      className="bg-gray-800 text-white bg-opacity-60 shadow-xl py-4 rounded-b-lg"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Registation;
