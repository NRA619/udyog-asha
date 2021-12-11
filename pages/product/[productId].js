import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import { parseCookies } from "../../components/cookie";
import Image from "next/image";
import image from "next/image";

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
        "http://localhost:5000/product/checkproduct",
        {
          pid: productId,
        }
      );
      if (check.data.product === true && Object.keys(info).length === 0) {
        const res = await fetch(
          `http://localhost:5000/product/Details/${productId}`
        );
        const post = await res.json();
        setinfo(post);
        checkPaid();
      }
    }
    setTimeout(() => {
      setloading(false);
    }, 2000);
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
        "http://localhost:5000/product/reviewcheck",
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
      const res = await axios.post("http://localhost:5000/Cart/SaveCart", {
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
        <div className="pt-16 md:pt-20 bg-breakbg bg-cover w-full h-3/4 flex justify-between">
          <div className="ml-5 mr-1 lg:ml-10 mt-10 w-full">
            <div className="flex md:flex-row flex-col space-x-10">
              <div className="mt-3 flex justify-center md:h-96 h-48 md:w-3/5 mr-3">
                <Image src={info.img} width={1000} height={750}></Image>
              </div>
              <div className="mt-5 md:w-2/5 h-36 w-4/5 text-white mb-11">
                <div className="mt-8 text-3xl font-bold text-white underline">
                  Highlights:
                </div>
                <ul className="space-y-1 md:mr-10 md:h-52 h-36">
                  <li>Name: {info.pname}</li>
                  <li>Price: {info.price}</li>
                  <li>Discription: {info.discription}</li>
                </ul>
              </div>
            </div>
            <div className="block md:flex space-x-4">
              {addoption == false && emaillog !== " " && (
                <button
                  className="mt-2 md:mt-10 bg-white text-black w-40 py-5 mb-16 rounded-sm text-xl font-bold"
                  onClick={addtocart}
                >
                  <span>Add to Cart</span>
                </button>
              )}
              {addoption == true && emaillog !== " " && (
                <button
                  className="mt-20 md:mt-10 bg-white text-black px-6 py-5 mb-16 rounded-sm text-xl font-bold"
                  onClick={addtocart}
                >
                  <span>Sucessfully Added</span>
                </button>
              )}
              {emaillog !== " " && (
                <button
                  className="mt-20 mx-0 md:mt-10 bg-white text-black w-40 py-5 mb-16 rounded-sm text-xl font-bold"
                  onClick={cartpage}
                >
                  Go to cart
                </button>
              )}
              {paid === true && emaillog !== " " && (
                <div className="">
                  <button
                    className=" mx-0 md:mt-10 bg-white text-black w-40 py-5 mb-16 rounded-sm text-xl font-bold"
                    onClick={reviewpage}
                  >
                    FeedBack
                  </button>
                </div>
              )}
              {emaillog === " " && (
                <button
                  className=" mx-0 md:mt-10 bg-white text-black w-40 py-5 mb-16 rounded-sm text-xl font-bold"
                  onClick={loginpage}
                >
                  Login Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
