import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import { parseCookies } from "../../components/cookie";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const Training = () => {
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(true);
  const [ninjas, setninjas] = useState([]);
  const [food, setfood] = useState(0);
  const [emaillog, setemaillog] = useState(" ");
  const [course, setCourses] = useState([]);
  const [loggedin, Setloggedin] = useState(0);
  const [dropdown, setdropdown] = useState(false);
  const [dropdownvalue, setdropdownvalue] = useState("Food and Food Product");

  useEffect(async () => {
    const data = parseCookies();
    if (data.user) {
      let buff_dec = new Buffer.from(data.user, "base64");
      let xyz = buff_dec.toString("ascii");
      var email = xyz;
      if (email !== undefined) {
        email = email.replace(/"/g, "");
        setemaillog(email);
        Setloggedin(1);
      }
    }

    const res = await axios.post(
      "https://murmuring-eyrie-62394.herokuapp.com/tr/GetTraining"
    );
    setninjas(res.data);

    const res1 = await axios.post(
      "https://murmuring-eyrie-62394.herokuapp.com/payment/Courses",
      {
        email: emaillog,
      }
    );
    setCourses(res1.data);
    console.log(course);
  
      setloading(false);
    
  }, [emaillog, loading, course]);
  return (
    <main className="bg-red-600 bg-opacity-5">
      {loading == true && (
        <div className="flex flex-col justify-center items-center h-screen w-full">
          <BarLoader color="#D0021B" height={4} width={100} />
        </div>
      )}
      {loading == false && (
        <div className="pt-14 ">
          <div className="md:flex flex flex-col md:flex-row items-center md:justify-between">
            <div className="mt-6  w-1/4  hidden ml-10 md:flex justify-start h-10">
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
            <div className="mt-6 md:hidden  flex justify-start h-10 w-3/4">
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
            {/* Category1 */}
            <div className="mt-6 m-2 text-red-500 text-sm md:text-md flex flex-col ">
              <div className="bg-gray-50 border border-gray-200 py-2 px-4 w-72 flex justify-between shadow-sm rounded-sm">
                <span>{dropdownvalue}</span>
                {dropdown == false && (
                  <span>
                    <div className="" onClick={() => setdropdown(true)}>
                      <ArrowDropDownCircleIcon fontSize="small" />
                    </div>
                  </span>
                )}
                {dropdown == true && (
                  <span>
                    <div className="" onClick={() => setdropdown(false)}>
                      <ArrowDropUpIcon />
                    </div>
                  </span>
                )}
              </div>
              {dropdown == true && (
                <div className="relative">
                  <div className="flex absolute z-10 flex-col w-72 bg-white items-start shadow-sm rounded-sm">
                    <div>
                      {loggedin == 1 && (
                        <button
                          onClick={() => {
                            setfood(5),
                              setdropdownvalue("Enrolled Courses"),
                              setdropdown(false);
                          }}
                          className="py-2 px-4"
                        >
                          Enrolled Courses
                        </button>
                      )}
                    </div>
                    <span className="h-0.1 bg-gray-400 w-72"></span>
                    <button
                      onClick={() => {
                        setfood(0),
                          setdropdown(false),
                          setdropdownvalue("Food and Food Product");
                      }}
                      className="py-2 px-4"
                    >
                      Food and Food Product
                    </button>
                    <span className="h-0.1 bg-gray-400 w-72"></span>
                    <button
                      onClick={() => {
                        setfood(1),
                          setdropdown(false),
                          setdropdownvalue("Agro-Processing");
                      }}
                      className="py-2 px-4"
                    >
                      Agro-Processing
                    </button>
                    <span className="h-0.1 bg-gray-400 w-72"></span>
                    <button
                      onClick={() => {
                        setfood(2),
                          setdropdown(false),
                          setdropdownvalue("Technical Training");
                      }}
                      className="py-2 px-4"
                    >
                      Technical Training
                    </button>
                    <span className="h-0.1 bg-gray-400 w-72"></span>
                    <button
                      onClick={() => {
                        setfood(3),
                          setdropdown(false),
                          setdropdownvalue("Business Idea");
                      }}
                      className="py-2 px-4"
                    >
                      Business Idea
                    </button>
                    <span className="h-0.1 bg-gray-400 w-72"></span>
                    <button
                      onClick={() => {
                        setfood(4),
                          setdropdown(false),
                          setdropdownvalue("Entrepreneurship Development");
                      }}
                      className="py-2 px-4"
                    >
                      Entrepreneurship Development
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <span className="h-2 w-full bg-black mt-4"></span>

          {food == 0 && (
            <div className="grid md:grid-cols-3 gap-8 pb-14 m-5 mb-0 mt-32">
              {ninjas
                .filter((val) => {
                  if (search == "") {
                    if (
                      val.category == "food and food product" ||
                      val.category == "Food and Food Product"
                    ) {
                      return val;
                    }
                  } else if (
                    val.pname.toLowerCase().includes(search.toLowerCase())
                  ) {
                    if (
                      val.category == "food and food product" ||
                      val.category == "Food and Food Product"
                    ) {
                      return val;
                    }
                  }
                })
                .map((ninja) => (
                  <Link href={`${ninja._id}`} key={ninja._id}>
                    <div className="bg-gray-50 hover:shadow-2xl">
                      <Image
                        src={ninja.img}
                        alt="not found"
                        width={1200}
                        height={650}
                        layout="responsive"
                      ></Image>
                      <div className="ml-5 font-semibold text-lg">
                        {ninja.pname}
                      </div>
                      <div className="ml-5">Rs.{ninja.price / 100}</div>
                      <div className="text-blue-900 font-bold">
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
          )}

          {/* Category 2 */}
          {food == 1 && (
            <div className="grid md:grid-cols-3 gap-8 pb-14 m-5 mb-0 mt-32">
              {ninjas
                .filter((val) => {
                  if (search == "") {
                    if (
                      val.category == "agro-processing" ||
                      val.category == "Agro-Processing"
                    ) {
                      return val;
                    }
                  } else if (
                    val.pname.toLowerCase().includes(search.toLowerCase())
                  ) {
                    if (
                      val.category == "agro-processing" ||
                      val.category == "Agro-Processing"
                    ) {
                      return val;
                    }
                  }
                })
                .map((ninja) => (
                  <Link href={`${ninja._id}`} key={ninja._id}>
                    <div className="bg-gray-50 hover:shadow-2xl">
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
                      <div className="text-blue-900 font-bold">
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
          )}
          {/* Category 3 */}
          {food == 2 && (
            <div className="grid md:grid-cols-3 gap-8 pb-14 m-5 mb-0 mt-32">
              {ninjas
                .filter((val) => {
                  if (search == "") {
                    if (
                      val.category == "technical training" ||
                      val.category == "Technical Training"
                    ) {
                      return val;
                    }
                  } else if (
                    val.pname.toLowerCase().includes(search.toLowerCase())
                  ) {
                    if (
                      val.category == "technical training" ||
                      val.category == "Technical Training"
                    ) {
                      return val;
                    }
                  }
                })
                .map((ninja) => (
                  <Link href={`${ninja._id}`} key={ninja._id}>
                    <div className="bg-gray-50 hover:shadow-2xl">
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
                      <div className="text-blue-900 font-bold">
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
          )}
          {/* Category 4 */}
          {food == 3 && (
            <div className="grid md:grid-cols-3 gap-8 pb-14 m-5 mb-0 mt-32">
              {ninjas
                .filter((val) => {
                  if (search == "") {
                    if (
                      val.category == "business idea" ||
                      val.category == "Business Idea"
                    ) {
                      return val;
                    }
                  } else if (
                    val.pname.toLowerCase().includes(search.toLowerCase())
                  ) {
                    if (
                      val.category == "business idea" ||
                      val.category == "Business Idea"
                    ) {
                      return val;
                    }
                  }
                })
                .map((ninja) => (
                  <Link href={`${ninja._id}`} key={ninja._id}>
                    <div className="bg-gray-50 hover:shadow-2xl">
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
                      <div className="text-blue-900 font-bold">
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
          )}
          {/* Category 5 */}
          {food == 4 && (
            <div className="grid md:grid-cols-3 gap-8 pb-14 m-5 mb-0 mt-32">
              {ninjas
                .filter((val) => {
                  if (search == "") {
                    if (
                      val.category == "Entrepreneurship training program" ||
                      val.category == "Entrepreneurship Training Program"
                    ) {
                      return val;
                    }
                  } else if (
                    val.pname.toLowerCase().includes(search.toLowerCase())
                  ) {
                    if (
                      val.category == "Entrepreneurship training program" ||
                      val.category == "Entrepreneurship Training Program"
                    ) {
                      return val;
                    }
                  }
                })
                .map((ninja) => (
                  <Link href={`${ninja._id}`} key={ninja._id}>
                    <div className="bg-gray-50 hover:shadow-2xl">
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
                      <div className="text-blue-900 font-bold">
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
          )}

          {/* Category 6 */}

          {food == 5 && Object.keys(course).length !== 0 && (
            <div className="flex flex-col gap-8 pb-14 m-5 mb-0 mt-32 mx-20">
              {course.map((val, index) => (
                <div key={index} className="bg-gray-50 hover:shadow-md">
                  <div>
                    {val.product_array
                      .filter((value) => {
                        if (value.pname != undefined) {
                          return value;
                        }
                      })
                      .map((enrolled, index) => (
                        <div
                          href={`${enrolled._id}`}
                          key={index}
                          className="w-full py-5 border border-gray-300 rounded-lg shadow-sm"
                        >
                          <div>
                            <div className="flex justify-between w-full">
                              <div className="ml-5 font-semibold text-lg">
                                {enrolled.pname}
                              </div>
                              <div className="text-blue-900 font-bold">
                                {enrolled.Mode}
                              </div>
                              <div className="float-right mr-5 mt-1">
                                <Link href={`${enrolled._id}`}>
                                  <button className="bg-red-500 text-white text-sm px-2 py-1 rounded-sm">
                                    Details
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {food == 5 && course.length === 0 && (
            <div className="pb-16 pt-16 md:mt-14 flex flex-col justify-center items-center h-full md:h-screen w-full">
              <div className="text-center font-bold text-2xl md:text-4xl font-serif">
                Enroll In Some Courses
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Training;
