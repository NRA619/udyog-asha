import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import Link from "next/Link";
import Image from "next/image";
import { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";


export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/product/Getproduct");
  const data = await res.json();

  return {
    props: { ninjas: data },
  };
};

const Product = ({ ninjas }) => {
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(true);
  useEffect(async () => {
    // let data = 'nimeshdeuja.com';
    // let buff = new Buffer.from(data);
    // let stringToBase64 = buff.toString('base64');
    // let buff_dec = new Buffer.from(stringToBase64, 'base64');
    // let xyz = buff_dec.toString('ascii');
    // console.log(stringToBase64);
    // console.log(xyz);
    setTimeout(() => {
      setloading(false);
    }, 3000);
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
          <div className="mt-6 rounded-full w-1/4 bg-red-200 hidden ml-10 shadow-xl md:flex justify-start h-10">
            <button className="p-1 pl-2">
              <SearchSharpIcon color="primary"></SearchSharpIcon>
            </button>
            <input
              id="search_course"
              type="text"
              list="title_product"
              placeholder="Search.."
              className="bg-red-200 text-blue-800 rounded-full focus:outline-none w-3/4 m-0 pl-1"
              value={search.toLowerCase()}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
          <div className="mt-6 rounded-full bg-red-200 md:hidden ml-10 shadow-xl flex justify-start h-10 w-3/4">
            <button className="p-1 pl-2">
              <SearchSharpIcon color="primary"></SearchSharpIcon>
            </button>
            <input
              id="search_course"
              type="text"
              list="title_product"
              placeholder="Search.."
              className="bg-red-200 text-blue-800 rounded-full focus:outline-none w-3/4 m-0 pl-1"
              value={search.toLowerCase()}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
          {/* Category1 */}
          <div className="mt-20 ml-5 text-red-500 text-4xl  font-bold">
            Recommendation
          </div>
          <div className="mt-2 ml-5 bg-red-400 w-20 rounded-lg h-1"></div>
          <div className="grid md:grid-cols-3 gap-8 mb-14 m-5">
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
                  <div className="bg-gray-50 hover:shadow-2xl" key={ninja.id}>
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
                      
                      <div className="ml-5">Rs.{ninja.price}</div>
                      <div className="ml-5 text-blue-900 font-bold">
                        {ninja.Mode}
                      </div>
                      <div className = "flex flex-col float-right">
                      
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
          {/* Category 2 */}
          <div className="mt-20 ml-5 text-red-500 text-4xl  font-bold">
            Popular
          </div>
          <div className="mt-2 ml-5 bg-red-400 w-12 rounded-lg h-1"></div>
          <div className="grid md:grid-cols-3 gap-8 mb-14 m-5">
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
                <Link href={"/ninjas/" + ninja.id} key={ninja.id}>
                  <div className="bg-gray-50 hover:shadow-2xl">
                    <Image
                      src="/1.png"
                      width={1200}
                      height={650}
                      layout="responsive"
                    ></Image>
                    <div className="ml-5 font-semibold text-lg">
                      {ninja.pname}
                    </div>
                    <div className="ml-5">Rs.{ninja.price}</div>
                    <div className="ml-5 text-blue-900 font-bold">
                      {ninja.Mode}
                    </div>
                    <div className="float-right mr-5 mt-1 mb-2">
                      <Link href={`${ninja._id}`}>
                        <button className="bg-red-500 text-white text-sm px-2 py-1 rounded-sm">
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          {/* Category 3 */}
          <div className="mt-20 ml-5 text-red-500 text-4xl  font-bold">
            Live Lectures
          </div>
          <div className="mt-2 ml-5 bg-red-400 w-20 rounded-lg h-1"></div>
          <div className="grid md:grid-cols-3 gap-8 mb-14 m-5">
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
                <Link href={"/ninjas/" + ninja.id} key={ninja.id}>
                  <div className="bg-gray-50 hover:shadow-2xl">
                    <Image
                      src="/1.png"
                      width={1200}
                      height={650}
                      layout="responsive"
                    ></Image>
                    <div className="ml-5 font-semibold text-lg">
                      {ninja.pname}
                    </div>
                    <div className="ml-5">Rs.{ninja.price}</div>
                    <div className="ml-5 text-blue-900 font-bold">
                      {ninja.Mode}
                    </div>
                    <div className="float-right mr-5 mt-1 mb-2">
                      <Link href={`${ninja._id}`}>
                        <button className="bg-red-500 text-white text-sm px-2 py-1 rounded-sm">
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Product;
