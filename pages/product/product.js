import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";

// export const getStaticProps = async () => {
//   const res = await fetch("https://murmuring-eyrie-62394.herokuapp.com/product/Getproduct");
//   if(res) {
//     const data = await res.json();
//     return {
//       props: { ninjas: data },
//     };
//   }else {
//     const data = "empty"
//     return {
//       props: { ninjas: data },
//     };
//   }

// };

const Product = () => {
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(true);
  const [ninjas, setninjas] = useState([]);

  useEffect(async () => {
    const res = await axios.post(
      "https://murmuring-eyrie-62394.herokuapp.com/product/Getproduct"
    );
    setninjas(res.data);
    console.log(res.data);
    
      setloading(false);
   
  }, []);

  return (
    <main className="bg-red-600 bg-opacity-5">
      {loading == true && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
          <BarLoader color="#D0021B" height={4} width={100} />
        </div>
      )}
      {loading == false && (
        <div className="pt-14 ">
          <div className="mt-6  w-full hidden  md:flex  justify-between ">
            <div className="w-1/4 flex h-10 ml-10">
              <input
                id="search_course"
                type="text"
                list="title_product"
                placeholder="Search.."
                className="shadow-md w-full border border-red-900"
                value={search.toLowerCase()}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>
            <button
              onClick={() => (window.location = "/product/cart")}
              className="flex justify-center items-center"
            >
              <div className="mr-2 stroke-cyan-500 rounded-full flex justify-center items-center bg-red-100 shadow-md border border-gray-100 bg-opacity-40 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  className="stroke-cyan-500 fill-red-600"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm9.804-16.5l-3.431 12h-2.102l2.542-9h-5.993c.113.482.18.983.18 1.5 0 3.59-2.91 6.5-6.5 6.5-.407 0-.805-.042-1.191-.114l1.306 3.114h13.239l3.474-12h1.929l.743-2h-4.196zm-6.304 15c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-4.5-10.5c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z" />
                </svg>
              </div>
              <span className="mr-10 font-semibold text-xl text-black">
                Cart
              </span>
            </button>
          </div>
          <div className="mt-6 md:hidden ml-1 flex justify-between">
            <div className="w-2/3 flex h-10 ml-1">
              <input
                id="search_course"
                type="text"
                list="title_product"
                placeholder="Search.."
                className="shadow-md w-full border border-red-900"
                value={search.toLowerCase()}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>
            <button
              onClick={() => (window.location = "/product/cart")}
              className="flex justify-center items-center"
            >
              <div className="mr-2 stroke-cyan-500 rounded-full flex justify-center items-center bg-red-100 shadow-md border border-gray-100 bg-opacity-40 p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  className="stroke-cyan-500 fill-red-600"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm9.804-16.5l-3.431 12h-2.102l2.542-9h-5.993c.113.482.18.983.18 1.5 0 3.59-2.91 6.5-6.5 6.5-.407 0-.805-.042-1.191-.114l1.306 3.114h13.239l3.474-12h1.929l.743-2h-4.196zm-6.304 15c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-4.5-10.5c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z" />
                </svg>
              </div>
              <span className="mr-2 font-semibold text-lg text-black">
                Cart
              </span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pb-14 p-5 md:mt-32 mt-10">
            {ninjas
              .filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.pname.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((ninja) => (
                <div className="bg-gray-50 hover:shadow-2xl" key={ninja._id}>
                  <div>
                    <Image
                      src={ninja.img}
                      width={1200}
                      height={650}
                      layout="responsive"
                    ></Image>

                    <div className="ml-5 font-semibold text-lg">
                      {ninja.pname}
                    </div>

                    <div className="ml-5">Rs.{ninja.price / 100}</div>
                    <div className="ml-5 text-blue-900 font-bold">
                      {ninja.Mode}
                    </div>
                    <div className="flex flex-col float-right">
                      <div className="float-right flex flex-col">
                        <div className="float-right mr-5 mt-1 mb-2 flex justify-center">
                          <Link href={`${ninja._id}`}>
                            <button className="bg-red-500 text-white text-sm px-2 py-1 rounded-sm">
                              Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Product;
