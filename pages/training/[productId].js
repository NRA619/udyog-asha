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
  const [paid, setpaid] = useState();
  const [review, setreview] = useState(false);

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
      const check = await axios.post(
        "https://murmuring-eyrie-62394.herokuapp.com/tr/checkproduct",
        {
          pid: productId,
        }
      );
      if (check.data.product === true && Object.keys(info).length === 0) {
        const res = await fetch(
          `https://murmuring-eyrie-62394.herokuapp.com/tr/Details/${productId}`
        );
        const post = await res.json();
        setinfo(post);
        if (post.price === 0) {
          setpaid(true);
          checkReview();
        } else {
          checkPaid();
          checkReview();
        }
      }
    }

    setloading(false);
  }, [productId, emaillog]);
  async function checkPaid() {
    if (emaillog !== " ") {
      const resp = await axios.post(
        "https://murmuring-eyrie-62394.herokuapp.com/tr/reviewcheck",
        {
          email: emaillog,
          pid: productId,
        }
      );
      if (resp.data.paid === true) {
        setpaid(true);
      } else {
        setpaid(false);
      }
    }
  }

  async function checkReview() {
    const response = await axios.post(
      "https://murmuring-eyrie-62394.herokuapp.com/tr/reviewvalidate",
      {
        email: emaillog,
        pid: productId,
      }
    );
    if (response.data.Done === true) {
      setreview(true);
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

  async function certificatepage() {
    await router.push({
      pathname: "/training/pdf_check",
      query: { data: productId }, // passing email variable
    });
  }

  async function lecturepage() {
    await router.push({
      pathname: "/training/lectures",
      query: {
        data: productId,
      },
    });
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
              <div className="flex md:flex-row flex-col space-x-2">
                <button
                  className="md:mt-28 mt-10 bg-white text-black w-36 py-3 mb-4 ml-2 md:mb-16 rounded-sm text-lg font-bold"
                  onClick={lecturepage}
                >
                  Start Learning
                </button>
                <button
                  className="md:mt-28 my-2 bg-white text-black w-36 py-3 md:mb-16 rounded-sm text-lg font-bold"
                  onClick={reviewpage}
                >
                  FeedBack
                </button>
                {paid === true && emaillog !== " " && review === true && (
                  <button
                    className="md:mt-28 my-4 bg-white text-black w-36 py-3 md:mb-16 rounded-sm text-lg font-bold"
                    onClick={certificatepage}
                  >
                    View Certificate
                  </button>
                )}
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
          <div className="w-1/2 pb-4 relative hidden  md:flex md:flex-col md:items-end mr-10">
            <div
              className="absolute h-16 w-16 -top-0.5 right-0"
              onClick={() => (window.location = "/")}
            >
              <Image
                src="/MOVTC13.png"
                width={100}
                height={100}
                className="object-contain h-16 w-16"
              ></Image>
            </div>
            <iframe
              src={info.intro_link}
              width="100%"
              height="100%"
              allow="autoplay"
              className=""
              frameborder="0"
              scrolling="no"
              seamless=""
            />
          </div>
        </div>
      )}
      {Object.keys(info).length !== 0 && loading == false && (
        <div className="w-full h-0.5 mt-5 border bg-yellow-400"></div>
      )}
      {Object.keys(info).length !== 0 && loading == false && (
        <div className="bg-white w-full h-full block md:flex md:w-full">
          <div className="p-2 w-full  md:w-3/4">
            <div className="w-full h-64 pb-4 relative md:hidden flex justify-center">
              <div
                className="absolute h-16 w-16 -top-0.5 right-0"
                onClick={() => (window.location = "/")}
              >
                <Image
                  src="/MOVTC13.png"
                  width={100}
                  height={100}
                  className="object-contain h-16 w-16"
                ></Image>
              </div>
              <iframe
                src={info.intro_link}
                width="100%"
                height="100%"
                allow="autoplay"
                className=""
                frameborder="0"
                scrolling="no"
                seamless=""
              />
            </div>
            <div className="text-2xl md:text-4xl text-yellow-500 font-bold">
              Details
            </div>
            <div className="w-10 h-1 m-1 bg-yellow-400"></div>
            <div className="mt-5 ml-2 md:ml-10 ">
              {info.details.map((ch, index) => (
                <div key={index}>
                  {
                    <div className="mt-5 ml-2 md:ml-10">
                      <div className="text-xl">Chapter: {ch.name}</div>
                      <div className="flex">
                        <p className="ml-10 md:ml-20">
                          {ch.details.map((ch, index) => (
                            <div key={index}>{ch}</div>
                          ))}
                        </p>
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
              <div className="text-2xl mt-5 ml-5 md:ml-10">
                {info.invigilator}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
