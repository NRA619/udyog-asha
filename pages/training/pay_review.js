import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "../../components/cookie";
import BarLoader from "react-spinners/BarLoader";
import Link from 'next/link'

const Thumbnail = () => {
  const router = useRouter();
  const productId = router.query.data;
  const [isLogged, setisLogged] = React.useState(false);
  const [fname, setfname] = useState(" ");
  const [mno, setmno] = useState(" ");
  const [emaillog, setemaillog] = useState(" ");
  const [info, setinfo] = useState([]);
  
  const [loading, setloading] = useState(true);

  useEffect(async () => {
    window.scrollTo(0, 0)
    const data = parseCookies();
    if(data.user) {
    let buff_dec = new Buffer.from(data.user, 'base64');
    let xyz = buff_dec.toString('ascii');
    var email = xyz;
    if (email) {
      email = email.replace(/"/g, "");
    }
    }
    if (email) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
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

    // const response = await fetch("https://murmuring-eyrie-62394.herokuapp.com/payment/createorder");
    // const data = await response.json();
    // console.log(data);
    if (Object.keys(info).length === 0) {
      getdata();
    }

    if (Object.keys(info).length !== 0) {
      const p = info.price;

      // if (Object.keys(details).length === 0) {
      //   try {
      //     const res = await axios.post(
      //       "https://murmuring-eyrie-62394.herokuapp.com/payment/createorder",
      //       {
      //         price: p,
      //       }
      //     );
      //     setdetails(res);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }
    }
   setTimeout(() => {
      setloading(false);
    }, 5000);
  }, [info, productId]);

  async function getdata() {
    if (productId) {
      const respo = await fetch(
        `https://murmuring-eyrie-62394.herokuapp.com/tr/Details/${productId}`
      );
      const dat = await respo.json();
      setinfo(dat);
    }
  }
  const onBuyNowClick = async() => {
		const data = {
			purpose: info.pname,
			amount: info.price/100,
			buyer_name: fname,
			email: emaillog,
			phone: '9960119040',
			redirect_url: `https://murmuring-eyrie-62394.herokuapp.com/payment/payment/callback?user_id=${emaillog}`,
      product: info,
		};
    
		await axios.post( 'https://murmuring-eyrie-62394.herokuapp.com/payment/createorder', data )
			.then( res => {
				console.log( 'resp', res.data );
				window.location.href = res.data.url;
			} )
			.catch( ( error ) => console.log( error.response.data ) );
	};

  // function loadScript(src) {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // }

  // async function displayRazorpay() {
  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   );

  //   if (!res) {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //     return;
  //   }

  //   const options = {
  //     key: "rzp_live_iQ0qtIQjfOGyaB", // Enter the Key ID generated from the Dashboard
  //     amount: details.data.amount,
  //     name: fname,
  //     description:
  //       "Course_name: " +
  //       info.pname +
  //       " " +
  //       "|" +
  //       " " +
  //       "Rs. " +
  //       info.price / 100,
  //     order_id: details.data.id,
  //     handler: async function (response) {
  //       const data = {
  //         orderCreationId: details.data.id,
  //         razorpayPaymentId: response.razorpay_payment_id,
  //         razorpayOrderId: response.razorpay_order_id,
  //         razorpaySignature: response.razorpay_signature,
  //       };

  //       const res = await axios.post(
  //         `http://localhost:5000/payment/payments/${data.razorpayPaymentId}`,
  //         {
  //           product_array: info,
  //           status: "completed",
  //         }
  //       );
  //       if (res.data.paymentSuccess === true) {
  //         window.location = "/training/thankyou";
  //       } else {
  //         window.location = "/training/errorpage";
  //       }
  //     },
  //     prefill: {
  //       name: fname,
  //       email: emaillog,
  //       contact: "+91" + mno,
  //     },
  //     theme: {
  //       color: "#FF0000",
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // }
  return (
    <main className="">
      {info == undefined && loading === true && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
          <BarLoader
          color="#D0021B"
          height={4}
          width={100}
         
        />
        </div>
      )}
      {info == undefined && loading === false && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
          <div>404. Page Not Found</div>
        </div>
      )}
      {isLogged == false && info !== undefined && loading === false && (
       <div className="flex flex-col justify-center items-center h-screen w-screen">
         <span>
           Please login
         </span>
       </div>
      )}
      {isLogged == true && info !== undefined && (
        <div className="h-full w-full flex space-x-10  bg-redback bg-cover">
          <div className="w-full md:w-3/4 h-full pt-20 block md:flex  items-center bg-white">
            <div className="w-full px-5 md:w-1/2 flex md:pl-20 flex-col justify-center h-full">
              <span className="text-red-900 flex justify-start text-2xl pt-2 font-semibold underline">
                Guidelines and Instruction
              </span>

              <span className="text-black flex pt-4 text-justify">
                - Please Dont reload this page. Keep your calm.
              </span>

              <span className="text-black flex pt-4 text-justify">
                - Once payment is done we will mail you the recipet.
              </span>
              <span className="text-black flex pt-4 text-justify">
                - For any query please fill the form on the footer.
              </span>
            </div>
            <div className="bg-redback md:bg-white mt-20 bg-cover md:shadow-xl md:border md:border-red-600 w-full md:w-1/2 h-full  md:h-3/4 pb-2 md:pb-0 justify-center md:my-10 md:transform md:translate-x-36">
              <div className="bg-white m-2 md:m-0 md:border-none md:transform-none border border-red-600 transform -translate-y-10">
              <div className="text-red-800 text-xl flex justify-center pt-6 font-medium">
                Payment Details
              </div>
              <div className="flex justify-between pt-10">
                <span className="flex items-center ml-5 md:ml-10">Name</span>
                <p className="border-b-2 w-1/2  mr-10 border-red-800 py-2 text-sm">
                  {fname}
                </p>
              </div>
              <div className="flex justify-between  pt-4">
                <span className="flex items-center ml-5 md:ml-10">Email</span>
                <span className="border-b-2 w-1/2 truncate mr-10 border-red-800 py-2 text-sm">
                  {emaillog}
                </span>
              </div>
              <div className="flex justify-between  pt-4">
                <span className="flex items-center ml-5 md:ml-10">Phone no.</span>
                <span className="border-b-2 w-1/2 mr-10 border-red-800 py-2 text-sm">
                  +91{mno}
                </span>
              </div>
              <div className="flex justify-between  pt-4">
                <span className="flex items-center ml-5 md:ml-10">Order Name</span>
                <span className="border-b-2 w-1/2 mr-10 border-red-800 py-2 text-sm">
                  {info.pname}
                </span>
              </div>
              <div className="flex justify-between  pt-4">
                <span className="flex items-center ml-5 md:ml-10">Amount</span>
                <span className="border-b-2 w-1/2 mr-10 border-red-800 py-2 text-sm">
                  {(info.price)/100}
                </span>
              </div>
              <div className="flex justify-center py-10">
              
              
              <button
                onClick={() => onBuyNowClick()}
                className="bg-red-700 text-white py-2 px-6 rounded-sm shadow-xl flex justify-center"
              >
                PAY NOW
              </button>
                
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Thumbnail;
