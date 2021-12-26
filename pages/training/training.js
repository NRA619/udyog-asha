import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, } from "react";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
// export const getStaticProps = async () => {
//   const res = await fetch("https://murmuring-eyrie-62394.herokuapp.com/tr/GetTraining");
  
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

const Training = () => {
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(true);
  const [ninjas, setninjas] = useState([]);
  const [food, setfood] = useState(0)
  
  useEffect(async () => {
    window.scrollTo(0, 0)
    const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/tr/GetTraining");
    setninjas(res.data);
    console.log(res.data);
    
    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, [])

  

  return (
    <main className="bg-red-600 bg-opacity-5">
      {loading == true && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
        <BarLoader
          color="#D0021B"
          height={4}
          width={100}
         
        />
        </div>
      )}
      {loading == false && (
      <div className="pt-14 ">
      <div className="mt-6 rounded-full w-1/4 bg-red-200 hidden ml-10 shadow-xl md:flex justify-start h-10">
        <button className="p-1 pl-2">
          <SearchSharpIcon color = "primary"></SearchSharpIcon>
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
          <SearchSharpIcon color = "primary"></SearchSharpIcon>
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
      <div className="mt-20  text-red-500 text-sm md:text-md w-full md:flex grid grid-cols-3">
        <button onClick={() => setfood(0)} className="">
          {food == 0 ? <div className="text-red-500 px-3 py-1 border-b-2 bg-white font-medium border-red-500">Food and Food Product</div> : <div className="text-red-500 px-3 py-1 ">Food and Food Product</div>}
        </button>
        <button onClick={() => setfood(1)} className="text-red-500">
        {food == 1 ? <div className="text-red-500 px-3 py-1 border-b-2 bg-white font-medium border-red-500">Agro-Processing</div> : <div className="text-red-500 px-3 py-1">Agro-Processing</div>}
        </button>
        <button onClick={() => setfood(2)} className="text-red-500">
        {food == 2 ? <div className="text-red-500 px-3 py-1 border-b-2 bg-white font-medium border-red-500">Technical Training</div> : <div className="text-red-500 px-3 py-1">Technical Training</div>}
        </button>
        <button onClick={() => setfood(3)} className="text-red-500">
        {food == 3 ? <div className="text-red-500 px-3 py-1 border-b-2 bg-white font-medium border-red-500">Business Idea</div> : <div className="text-red-500 px-3 py-1">Business Idea</div>}
        </button>
        <button onClick={() => setfood(4)} className="text-red-500 col-span-2">
        {food == 4 ? <div className="text-red-500 px-3 py-1 border-b-2 bg-white font-medium border-red-500">Entrepreneurship Development</div> : <div className="text-red-500 px-3 py-1">Entrepreneurship Development</div>}
        </button>
      </div>
      <span className="h-2 w-full bg-black mt-4"></span>
      
      {food == 0 && (
        <div className="grid md:grid-cols-3 gap-8 pb-14 m-5">
        {ninjas
          .filter((val) => {
            if (search == "") {
              if (val.category == "food and food product" || val.category == "Food and Food Product") {
                return val;
              }
            } else if (val.pname.toLowerCase().includes(search.toLowerCase())) {
              if (val.category == "food and food product" || val.category == "Food and Food Product") {
                return val;
              }
            }
          })
          .map((ninja) => (
            <Link href={`${ninja._id}`} key={ninja.id}>
              <div className="bg-gray-50 hover:shadow-2xl">
                <Image
                  src={ninja.img}
                  alt="not found"
                  width={1200}
                  height={650}
                  layout="responsive"
                 
                ></Image>
                <div className="ml-5 font-semibold text-lg">{ninja.pname}</div>
                <div className="ml-5">Rs.{(ninja.price)/100}</div>
                <div className="text-blue-900 font-bold">{ninja.Mode}</div>
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
      )}
      
      {/* Category 2 */}
      {food == 1 && (
        <div className="grid md:grid-cols-3 gap-8 pb-14 m-5">
        {ninjas
          .filter((val) => {
            if (search == "") {
              if (val.category == "agro-processing" || val.category == "Agro-Processing") {
                return val;
              }
            } else if (val.pname.toLowerCase().includes(search.toLowerCase())) {
              if (val.category == "agro-processing" || val.category == "Agro-Processing") {
                return val;
              }
            }
          })
          .map((ninja) => (
            <Link href={`${ninja._id}`} key={ninja.id}>
              <div className="bg-gray-50 hover:shadow-2xl">
                <Image
                  src={ninja.img}
                  width={1200}
                  height={650}
                  layout="responsive"
                 
                ></Image>
                <div className="ml-5 font-semibold text-lg">{ninja.pname}</div>
                <div className="ml-5">Rs.{(ninja.price)/100}</div>
                <div className="text-blue-900 font-bold">{ninja.Mode}</div>
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
      )}
      {/* Category 3 */}
      {food == 2 && (
        <div className="grid md:grid-cols-3 gap-8 pb-14 m-5">
        {ninjas
          .filter((val) => {
            if (search == "") {
              if (val.category == "technical training" || val.category == "Technical Training") {
                return val;
              }
            } else if (val.pname.toLowerCase().includes(search.toLowerCase())) {
              if (val.category == "technical training" || val.category == "Technical Training") {
                return val;
              }
            }
          })
          .map((ninja) => (
            <Link href={`${ninja._id}`} key={ninja.id}>
              <div className="bg-gray-50 hover:shadow-2xl">
                <Image
                  src={ninja.img}
                  width={1200}
                  height={650}
                  layout="responsive"
                 
                ></Image>
                <div className="ml-5 font-semibold text-lg">{ninja.pname}</div>
                <div className="ml-5">Rs.{(ninja.price)/100}</div>
                <div className="text-blue-900 font-bold">{ninja.Mode}</div>
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
      )}
      {/* Category 4 */}
      {food == 3 && (
        <div className="grid md:grid-cols-3 gap-8 pb-14 m-5">
        {ninjas
          .filter((val) => {
            if (search == "") {
              if (val.category == "business idea" || val.category == "Business Idea") {
                return val;
              }
            } else if (val.pname.toLowerCase().includes(search.toLowerCase())) {
              if (val.category == "business idea" || val.category == "Business Idea") {
                return val;
              }
            }
          })
          .map((ninja) => (
            <Link href={`${ninja._id}`} key={ninja.id}>
              <div className="bg-gray-50 hover:shadow-2xl">
                <Image
                  src={ninja.img}
                  width={1200}
                  height={650}
                  layout="responsive"
                 
                ></Image>
                <div className="ml-5 font-semibold text-lg">{ninja.pname}</div>
                <div className="ml-5">Rs.{(ninja.price)/100}</div>
                <div className="text-blue-900 font-bold">{ninja.Mode}</div>
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
      )}
      {/* Category 5 */}
      {food == 4 && (
        <div className="grid md:grid-cols-3 gap-8 pb-14 m-5">
        {ninjas
          .filter((val) => {
            if (search == "") {
              if (val.category == "Entrepreneurship training program" || val.category == "Entrepreneurship Training Program") {
                return val;
              }
            } else if (val.pname.toLowerCase().includes(search.toLowerCase())) {
              if (val.category == "Entrepreneurship training program" || val.category == "Entrepreneurship Training Program") {
                return val;
              }
            }
          })
          .map((ninja) => (
            <Link href={`${ninja._id}`} key={ninja.id}>
              <div className="bg-gray-50 hover:shadow-2xl">
                <Image
                  src={ninja.img}
                  width={1200}
                  height={650}
                  layout="responsive"
                 
                ></Image>
                <div className="ml-5 font-semibold text-lg">{ninja.pname}</div>
                <div className="ml-5">Rs.{(ninja.price)/100}</div>
                <div className="text-blue-900 font-bold">{ninja.Mode}</div>
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
      )}
      
      </div>
        )}
    </main>
  );
};

export default Training;
