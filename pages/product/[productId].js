import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import { parseCookies } from "../../components/cookie";
import Image from "next/image";

const ProductDetail = () => {
  const router = useRouter();
  const productId = router.query.productId;
  const [info, setinfo] = useState([]);
  const [loading, setloading] = useState(true);
  const [addoption, setaddoption] = useState(false);
  const [paid, setpaid] = useState(false);
  const [emaillog, setemaillog] = useState(" ");

  useEffect(async () => {
    const data = parseCookies();
    if (data.user) {
      let buff_dec = new Buffer.from(data.user, "base64");
      let xyz = buff_dec.toString("ascii");
      var email = xyz;
      if (email) {
        email = email.replace(/"/g, "");
        setemaillog(email);
      }
    }
    if (productId) {
      const check = await axios.post(
        "https://murmuring-eyrie-62394.herokuapp.com/product/checkproduct",
        {
          pid: productId,
        }
      );
      if (check.data.product === true && Object.keys(info).length === 0) {
        const res = await fetch(
          `https://murmuring-eyrie-62394.herokuapp.com/product/Details/${productId}`
        );
        const post = await res.json();
        setinfo(post);
        checkPaid();
      }
    }
   
      setloading(false);
    
  }, [productId, emaillog]);
  async function paymentpage() {
    await router.push({
      pathname: "/thumbnail",
      query: { data: productId }, // passing email variable
    });
  }
  async function checkPaid() {
    if (emaillog !== " ") {
      const resp = await axios.post(
        "https://murmuring-eyrie-62394.herokuapp.com/product/reviewcheck",
        {
          email: emaillog,
          pid: productId,
        }
      );
      if (resp.data.paid === true) {
        setpaid(true);
      }
    }
  }

  async function addtocart(e) {
    if (emaillog && Object.keys(info).length !== 0) {
      const name = info.pname;
      const price = info.price;
      const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/Cart/SaveCart", {
        email: emaillog,
        productId: productId,
        quantity: 1,
        pname: name,
        price: price,
      });

      setaddoption(true);
    } else {
      alert("Please Login");
    }
  }
  function cartpage() {
    window.location = "/product/cart";
  }
  async function reviewpage() {
    await router.push({
      pathname: "/product/review",
      query: { data: productId }, // passing email variable
    });
  }

  async function loginpage() {
    window.location = "../login";
  }

  return (
    <main className="">
      {loading == true && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
          <BarLoader color="#D0021B" height={4} width={100} />
        </div>
      )}
      {loading == false && Object.keys(info).length === 0 && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
          <div>404. Page Not Found</div>
        </div>
      )}
      {Object.keys(info).length !== 0 && loading == false && (
        <div className="pt-16 md:pt-20 bg-white bg-cover w-full h-3/4 flex justify-between">
          <div className="mx-4 md:mx-10 mt-10 w-full">
            <div className="flex md:flex-row flex-col md:space-x-10">
              <div className="md:mt-3 flex justify-center glow-red-400-2xl shadow-2xl h-full ">
                
                  <Image
                    src={info.img}
                    width={1300}
                    height={750}
                    
                  ></Image>
                
              </div>
              <div className="mt-10 shadow-2xl py-10  md:w-full h-full pb-16 md:-mt-10 border border-red-500 md:shadow-xl px-4 text-black mb-10 ">
                <div className=" text-3xl font-bold text-red-900 underline">
                  Highlights:
                </div>
                <ul className="mt-16 space-y-2 text-justify ">
                  <li className="flex space-x-2">
                    
                    <span className="text-2xl font-semibold text-black capitalize">{info.pname}</span>
                  </li>
                  <li className="flex space-x-2">
                    <span className="text-red-500 font-semibold">Price:</span>
                    <span className="flex space-x-1 font-medium text-black capitalize">
                      <span>Rs.</span>
                      <span>{info.price / 2}</span>
                    </span>
                  </li>
                  <li className="">
                    <span className="text-black font-medium capitalize">
                    {info.discription}
                    </span>
                  </li>
                </ul>
                <div className="mt-10 flex flex-col md:flex md:flex-row md:space-x-4">
                  {addoption == false && emaillog !== " " && (
                    <button
                      className="flex justify-start"
                      onClick={addtocart}
                    >
                      <span className="w-36 md:w-40 bg-gray-100 mx-0 mt-14   hover:bg-black hover:text-white shadow-lg text-red-500 font-semibold px-4 py-2.5  rounded-sm text-md">Add to Cart</span>
                    </button>
                  )}
                  {addoption == true && emaillog !== " " && (
                    <button
                      className="flex justify-start"
                      onClick={addtocart}
                    >
                      <span className="w-36 md:w-40 mx-0 mt-14 text-sm bg-gray-100  shadow-lg text-red-500 font-semibold px-4 py-3  rounded-sm ">Sucessfully Added</span>
                    </button>
                  )}
                  {emaillog !== " " && (
                    <button
                      className="flex justify-start"
                      onClick={cartpage}
                    >
                      <span className="w-36 md:w-40 mx-0 mt-4 md:mt-14 bg-gray-100 hover:bg-black hover:text-white shadow-lg text-red-500 font-semibold px-4 py-2.5  rounded-sm text-md">Go to cart</span>
                    </button>
                  )}
                  {paid === true && emaillog !== " " && (
                    <div className="">
                      <button
                        className="w-36 md:w-40 mx-0 mt-4 md:mt-14 bg-gray-100 hover:bg-black hover:text-white shadow-lg text-red-500 font-semibold px-4 py-2.5  rounded-sm text-md"
                        onClick={reviewpage}
                      >
                        FeedBack
                      </button>
                    </div>
                  )}
                  {emaillog === " " && (
                    <button
                      className="w-36 mx-0 mt-14  bg-gray-100 hover:bg-black hover:text-white shadow-lg text-red-500 font-semibold px-4 py-2  rounded-sm text-lg"
                      onClick={loginpage}
                    >
                      Login Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
