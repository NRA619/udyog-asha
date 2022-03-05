import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "../../../components/cookie";
import { useForm } from "react-hook-form";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from "next/router";

export const Business_sub_services = () => {
  const router = useRouter();
  const pid = router.query.id;
  const ss = router.query.sub_service;
  const [data, setdata] = useState([]);
  const [fname, setfname] = useState(" ");
  const [mno, setmno] = useState(" ");
  const [emaillog, setemaillog] = useState(" ");
  const [info, setinfo] = useState([]);
  const [details, setdetails] = useState([]);
  const [price, setprice] = useState(0);

  useEffect(async () => {
    if (pid && ss) {
      const data = parseCookies();
      if (data.user) {
        let buff_dec = new Buffer.from(data.user, "base64");
        let xyz = buff_dec.toString("ascii");
        var email = xyz;
        if (email) {
          email = email.replace(/"/g, "");
        }
      }
      const res = await axios.post(
        "https://murmuring-eyrie-62394.herokuapp.com/service/subservdata",
        {
          pid: pid,
          name: ss,
        }
      );
      const p = (res.data[0].service_array[price].price);
      setdata(res.data[0].service_array);
      if (email) {
        if (
          Object.keys(setfname).length === 0 ||
          Object.keys(setmno).length === 0 ||
          Object.keys(setemaillog).length === 0
        ) {
          const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/user/getdata", {
            email: email,
          });
          setfname(res.data.fullname);
          setmno(res.data.mobileno);
          setemaillog(res.data.emaillog);
        }
      }

      try {
        console.log("sdfsdfds");
        const res = await axios.post(
          "https://murmuring-eyrie-62394.herokuapp.com/payment/createorder",
          {
            price: p,
          }
        );
        setdetails(res);
      } catch (err) {
        console.log(err);
      }
    }
  }, [pid, ss]);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    console.log(details);
    const options = {
      key: "rzp_test_A6By7nQZCu7J7J", // Enter the Key ID generated from the Dashboard
      amount: details.data.amount,
      name: fname,
      description: ss,
      order_id: details.data.id,
      handler: async function (response) {
        const info = {
          orderCreationId: details.data.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        
        const res = await axios.post(
          `https://murmuring-eyrie-62394.herokuapp.com/payment/payments/${info.razorpayPaymentId}`,
          {
            product_array: data,
          }
        );
        if (res.data.paymentSuccess === true) {
          console.log(res);
          console.log("sucess");
        } else {
          console.log("error");
        }
      },
      prefill: {
        name: fname,
        email: emaillog,
        contact: "+91" + mno,
      },
      theme: {
        color: "#FF0000",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="min-h-screen w-full pt-12  bg-bsupport bg-cover">
      <div className="h-full min-h-screen w-full flex justify-center items-center bg-green-100 bg-opacity-90">
        {Object.keys(data).length !== 0 && (
          <div className="h-128 w-156 px-4  flex justify-center bg-green-900 shadow-sm my-20  glow-green-400-xl rounded-xl ">
            {data.map((data) => (
              <div className="h-128 w-full flex flex-col justify-between bg-green-50 bg-opacity-95 rounded-2xl  transform  -translate-y-16" key={data.name}>
                <div className="flex justify-center h-16 items-center">
                  <span className="flex text-2xl font-semibold">
                    {data.name}
                  </span>
                </div>
                <div className=" flex text-lg items-center text-justify px-10 h-60 ">
                  <span>{data.description}</span>
                </div>
                {data.name != "Custom" ? (
                  <div className="flex justify-center pb-10">
                    <button
                      onClick={() => displayRazorpay()}
                      className="bg-green-500 text-green-50 px-4 py-1 shadow-md hover:bg-green-50 hover:text-green-500 transform hover:scale-110 ease-in-out delay-100 duration-75  rounded-sm"
                    >
                      Pay Rs. {data.price / 100}
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center pb-10 invisible"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Business_sub_services;
