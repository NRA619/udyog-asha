import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "../cookie";
import BarLoader from "react-spinners/BarLoader";

const cart = () => {
  const router = useRouter();
  const [emaillog, setemaillog] = useState("");
  const [pname, setpname] = useState({});
  const [total, settotal] = useState(0);
  const [totalprice, settotalprice] = useState(0);
  const [details, setdetails] = useState({})
  const [fname, setfname] = useState(" ");
  const [mno, setmno] = useState(" ");
  const [loading, setloading] = useState(true);

  useEffect(async () => {
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
    //   const send_data = await  axios.post("http://localhost:5000/Cart/SaveCart/", {
    //   });
    
 
    
    if (Object.keys(pname).length === 0) {
      const get_data = await axios.post("http://localhost:5000/Cart/GetCart", {
        email: email,
      });

      setpname(get_data.data.product_array);
    }
    if (Object.keys(pname).length !== 0) {
      var x = 0;
      pname.map((item) => {
        x = x + item.quantity;
      });
    }
    settotal(x);
    
    if (Object.keys(pname).length !== 0) {
      var y = 0;
      pname.map((item) => {

        y = y + (item.quantity * item.price);
        console.log(y);
      });
      settotalprice(y);
    }
    const res = await axios.post("http://localhost:5000/user/get_address", {
      email: email,
    });
    console.log(res)
    if (Object.keys(res.data.address).length !== 0  ) {
      if(Object.keys(details).length === 0){
        setdetails(res.data.address);
      } 
    }
    if(Object.keys(emaillog).length !== 0) {
      const resuser = await axios.post("http://localhost:5000/user/getdata", {
        email: emaillog,
    });
    console.log(resuser);
      setfname(resuser.data.fullname);
      setmno(resuser.data.mobileno);
  }
  console.log(details)
  }, [details]);

  const increment = async (pid) => {
    console.log(pid);
    if (Object.keys(pname).length !== 0) {
      setpname((pname) =>
        pname.map((item) =>
          pid === item.productid
            ? {
                ...item,
                quantity: item.quantity + (item.quantity < 10 ? 1 : 0),
              }
            : item
        )
      );
    }
    const quan = pname.map((item) => {
      if (item.productid === pid) {
        updatequantity({
          ...item,
          quantity: item.quantity + (item.quantity < 10 ? 1 : 0),
        });
        settotalprice(totalprice + (item.quantity < 10 ? 1*item.price : 0))
      }
    });
  };
  const decrement = async (pid) => {
    console.log(pid);
    if (Object.keys(pname).length !== 0) {
      setpname((pname) =>
        pname.map((item) =>
          pid === item.productid
            ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
            : item
        )
      );
    }
    const quan = pname.map((item) => {
      if (item.productid === pid) {
        updatequantity({
          ...item,
          quantity: item.quantity - (item.quantity > 1 ? 1 : 0),
        });
        settotalprice(totalprice - (item.quantity > 1 ? 1*item.price : 0))
      }
    });
  };
  const updatequantity = async (xyz) => {
    const pid = xyz.productid;
    const qty = xyz.quantity;
    const update = await axios.post("http://localhost:5000/Cart/SaveCart", {
      email: emaillog,
      productId: pid,
      quantity: qty,
    });
    console.log(update);
  };

  const removecart = async (pid) => {
    const remove = await axios.post("http://localhost:5000/Cart/remove", {
      email: emaillog,
      id: pid,
    })
    if(remove.data.deleted_successfully === true) {
      console.log("hello world");
      window.location.reload();
    }
    else{
      alert("oops! Something went wrong")
    }
    
  }
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
    console.log(totalprice);
    console.log(total);
    var str = ""
    pname.map((data_product) => {
      str = str + "product:"+ " " + data_product.product_name + " " + "|" + " " + "qty:" + " "  + data_product.quantity + " " + "|" + " " + "Price:" + " " + "Rs." + data_product.price + "\n"
    })
    console.log(str);
    const responsed = await axios.post(
      "http://localhost:5000/payment/createorder",
      {
        price: totalprice*100,
      }
    );
    console.log(responsed);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_A6By7nQZCu7J7J", // Enter the Key ID generated from the Dashboard
      amount: totalprice*100,
      name: fname,
      description: str,
      order_id: responsed.data.id,
      handler: async function (response) {
        const data = {
          orderCreationId: responsed.data.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const res = await axios.post(
          `http://localhost:5000/payment/payments/${data.razorpayPaymentId}`, {
            product_array: pname,
          }
        );
        if(res.data.paymentSuccess === true ) {
          window.location = "/product/thanks"
        }else {
          window.location = "/product/error"
        } 
      },
      prefill: {
        name: fname,
        email: emaillog,
        contact: "+91" + mno,
      },
      notes: {
        address: details[0][0].addressline1 + "," + " " + details[0][0].addressline2 + "," + " " + details[0][0].city + "," + " " + details[0][0].pincode + "," + " " + details[0][0].state,
      },
      theme: {
        color: "#FF0000",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  function addresspage() {
    window.location = "/product/address"
  }

  return (
    <main className="w-full -mb-10 bg-cartbag bg-cover">
      {loading == true && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
          <BarLoader color="#FFFFFF" height={4} width={100} />
        </div>
      )}
        <div className="pt-20 "></div>
        {loading === false && (
        <div>
        {Object.keys(emaillog).length !== 0 && (
        <div>
          <div className="flex flex-col justify-center items-center md:flex-row md:flex md:justify-between bg-black rounded-lg p-3 mx-10">
            <div className=" py-1 px-8 text-blue-500 font-semibold text-xl">Address</div>
            <div className="py-1 text-white break-all">
              You can change your address / If you are visiting cart first time then please enter your address 
            </div>
            <button className=" bg-blue-800 px-6 mx-4 py-1 text-white" onClick={addresspage}>
              Change 
            </button>
          </div>
          {Object.keys(pname).length === 0 && (
                    <div className="h-screen pb-20 w-full  space-y-2 flex flex-col justify-center items-center">
                      <span className="text-white font-semibold text-2xl">
                      Your Cart is Empty
                      </span>
                      <span className="text-white font-semibold ">
                        Please Add something
                      </span>
                    </div>
                  )}
          <div className="shadow-3xl md:m-10 pb-10">
            {!(Object.keys(pname).length === 0) && (
              <div className=" md:flex md:flex-row flex flex-col">
                <div className="bg-white mt-10 shadow-xl w-full md:w-3/4 flex flex-col">
                  <span className="text-black  pb-6">
                    <div className="flex flex-col float-left text-3xl font-bold pl-2 md:pl-10  p-6">
                      <span>
                      Shopping Cart
                      </span>
                      <span className="bg-black h-1 w-16 mt-2"></span>
                    </div>
                    <div className="float-right py-8 text-lg pr-2 md:pr-16 flex space-x-1">
                      <div className="font-semibold text-blue-800">{total}</div><div>items</div>
                    </div>
                  </span>
                  {pname.map((detail) => (
                    <div className="">
                      <div>
                        <div
                          className="flex justify-between px-2 py-8  border-t border-green-900 mx-2  md:mx-16"
                          key={detail.productid}
                        >
                          <div className="md:w-1/3 w-1/5  text-lg break-all">{detail.product_name}</div>
                          <div className="flex justify-end mr-0 md:mr-16">
                            <button className="font-bold text-blue-900" onClick={() => increment(detail.productid)}>
                              +
                            </button>
                            <div className="flex items-center">
                              <div className="bg-black border  text-white font-semibold border-black px-2 py-0.5 mx-1">
                              {detail.quantity}
                              </div>
                            </div>
                            <div></div>
                            <button className="font-bold text-blue-900" onClick={() => decrement(detail.productid)}>
                              -
                            </button>
                          </div>
  
                          <div className="w-1/5  flex  space-x-1 justify-end items-center">
                            <div className="text-blue-800 font-semibold">Rs. </div><div className="font-semibold">{detail.price * detail.quantity}</div>
                            <button className="pl-4 md:pl-8" onClick= {() => removecart(detail.productid)}>
                              x
                            </button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                  
                </div>
                <div className="bg-black text-black shadow-xl w-full md:w-1/4">
                  <div className="pt-16 px-6 font-semibold text-2xl text-white">
                    Summary
                  </div>
                  <div className="h-0.5 mt-6 bg-blue-800 mx-6"></div>
                  {(Object.keys(details).length !== 0) && (
                    <div className="m-6 mt-10 flex flex-col h-3/4 justify-around text-white">
                      <div>
                      <div className="flex justify-center">
                        <span className="text-xl font-medium">Address</span>
                      </div>
                      <div className="flex justify-center mt-4">
                        <span className="flex justify-center break-all text-center italic">
                        {details[0][0].addressline1}, {details[0][0].addressline2}, {details[0][0].city}, {details[0][0].pincode}, {details[0][0].state}.
                        </span>
                      </div>
                      </div>
                      <div className="bg-blue-800 mx-4 py-4 flex flex-col justify-center mt-4 md:mt-4">
                      <div className="flex justify-center">
                        <span className="text-xl font-medium">TOTAL PRICE</span>
                      </div>
                      <div className="flex justify-center">
                        <span className="flex justify-center break-all text-center ">
                          Rs. {totalprice}
                        </span>
                      </div>
                      </div>
                      <div className="flex justify-center">
                    <button
                      onClick={displayRazorpay}
                      className="m-10 bg-white px-4 text-black font-medium py-2"
                    >
                      Checkout 
                    </button>
                    
                  </div>
                    </div>
                  )}
                  {Object.keys(details).length === 0 && (
                    <div className="m-6 mt-10 flex flex-col h-1/2 justify-center space-y-2 text-white">
                      <div className="flex justify-center items-center">
                        Please Add Your address.
                      </div>
                      <button
                      onClick={addresspage}
                      className=" bg-white px-4 text-black font-medium py-2"
                    >
                      Add Adress
                    </button>
                    </div>
                  )}
                  
                  
                  {/* {total !== 0 && 
              
                 } */}
                </div>
              </div>
            )}
          </div>
          <div className="mb-4"></div>
        </div>
      )}
      {Object.keys(emaillog).length === 0 && (
        <div className="h-screen w-screen bg-white flex justify-center items-center -mt-10">
          Please login 
        </div>
      )} 
      </div>
      )}
    
    </main>
  );
};

export default cart;
