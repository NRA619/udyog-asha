import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { parseCookies } from "../../components/cookie";

const ProductDetail = () => {
  const router = useRouter();
  const productId = router.query.productId;
  const [info, setinfo] = useState([]);
  const [loading, setloading] = useState(true);
  const [emaillog, setemaillog] = useState(" ");
  const [paid, setpaid] = useState(false);

  useEffect(async () => {
    window.scrollTo(0, 0);
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
      const check = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/tr/checkproduct", {
        pid: productId,
      });
      if (check.data.product === true && Object.keys(info).length === 0) {
        const res = await fetch(
          `https://murmuring-eyrie-62394.herokuapp.com/tr/Details/${productId}`
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
  async function checkPaid() {
    if (emaillog !== " ") {
      const resp = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/tr/reviewcheck", {
        email: emaillog,
        pid: productId,
      });
      if (resp.data.paid === true) {
        setpaid(true);
      }
    }
  }

  async function paymentpage() {
    await router.push({
      pathname: "/training/pay_review",
      query: { data: productId }, // passing email variable
    });
  }

  async function reviewpage() {
    await router.push({
      pathname: "/training/review",
      query: { data: productId }, // passing email variable
    });
  }
  async function loginpage() {
    window.location = "../login";
  }

  async function lecturepage() {
    await router.push({
      pathname: "/training/lectures",
      query: {
        data: productId,
      }
    })
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
        <div className="pt-16 md:pt-20 bg-breakbg bg-cover w-full h-1/2 flex justify-between">
          <div className="ml-5 mr-1 lg:ml-10 mt-10">
            <div className="text-2xl lg:text-4xl text-white">{info.pname}</div>
            <div className="mt-5 w-full md:w-3/4  text-white">
              {info.discription}
            </div>
            {paid === false && emaillog !== " " && (
              <button
                className="mt-20 md:mt-32 bg-white text-black w-40 py-5 mb-16 rounded-sm text-xl font-bold"
                onClick={paymentpage}
              >
                Enroll Now
              </button>
            )}
            {paid === true && emaillog !== " " && (
              <div className="flex space-x-2">
                <button
                  className="md:mt-28 mt-10 bg-white text-black w-36 py-3 mb-16 rounded-sm text-lg font-bold"
                  onClick={lecturepage}
                >
                  Start Learning
                </button>
                <button
                  className="md:mt-28 mt-10 bg-white text-black w-36 py-3 mb-16 rounded-sm text-lg font-bold"
                  onClick={reviewpage}
                >
                  FeedBack
                </button>

              </div>
            )}
            {emaillog === " " && (
              <div className="">
                <button
                  className="md:mt-28 mt-10 bg-white text-black w-36 py-3 mb-16 rounded-sm text-lg font-bold"
                  onClick={loginpage}
                >
                  Login Now
                </button>
              </div>
            )}
          </div>
          <div className="mt-10 w-3/4 md:flex md:flex-col md:items-end mr-10 hidden"></div>
        </div>
      )}
      {Object.keys(info).length !== 0 && loading == false && (
        <div className="w-full h-0.5 mt-5 border bg-yellow-400"></div>
      )}
      {Object.keys(info).length !== 0 && loading == false && (
        <div className="bg-white w-full h-full block md:flex md:w-full">
          <div className="m-10 ml-3 md:ml-10  md:w-3/4">
            <div className="text-2xl md:text-4xl text-yellow-500 font-bold">
              Details
            </div>
            <div className="w-10 h-1 m-1 bg-yellow-400"></div>
            <div className="mt-5 ml-2 md:ml-10 ">
              {info.details.map((ch) => (
                <div key={ch.id}>
                  {
                    <div className="mt-5 ml-2 md:ml-10">
                      <div className="text-xl">Chapter: {ch.name}</div>
                      <div className="flex">
                      <p className="ml-10 md:ml-20">{ch.details}</p>
                      </div>
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>
          <div className="ml-3 w-1/4 md:mr-10 md:flex md:flex-col md:items-end mb-10">
            <div className="mt-10">
              <div className="text-2xl md:text-4xl text-yellow-500 font-bold">
                Invigilator
              </div>
              <div className="w-10 h-1 m-1 bg-yellow-400"></div>
              <div className="text-2xl mt-5 ml-5 md:ml-10">{info.invigilator}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
