import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Image from "next/image";
import { parseCookies } from "../../components/cookie";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import Link from "next/link";

const Lecture = () => {
  const router = useRouter();
  const productId = router.query.data;
  const check = router.query.check;
  const [info, setinfo] = useState([]);
  const [vedio_link, setVedio_link] = useState(" ");
  const [invi, setInvi] = useState(" ");
  const [dropdown, setdropdown] = useState(-1);
  const [paid, setpaid] = useState(false);
  const [material, setmaterial] = useState([]);

  useEffect(async () => {
    const data = parseCookies();

    if (productId && data.user) {
      let buff_dec = new Buffer.from(data.user, "base64");
      let xyz = buff_dec.toString("ascii");
      var email = xyz;
      if (email) {
        email = email.replace(/"/g, "");
        const res = await fetch(
          `https://murmuring-eyrie-62394.herokuapp.com/tr/Details/${productId}`
        );
        const post = await res.json();
        if(post.materials != undefined)(
          setmaterial(post.materials)
          
        )
        setinfo(post.details);
        setVedio_link(post.details[0].link);
        setInvi(post.invigilator);
        if (post.price === 0) {
          setpaid(true);
        } else {
          const resp = await axios.post(
            "https://murmuring-eyrie-62394.herokuapp.com/tr/reviewcheck",
            {
              email: email,
              pid: productId,
            }
          );
          if (resp.data.paid === true) {
            setpaid(true);
          }
        }
      }
    }
  }, [productId, paid]);

  return (
    <main className="min-h-screen h-full w-full pt-14 bg-white text-white">
      {paid == true && (
        <div className="h-full min-h-screen w-full grid md:grid-flow-col grid-flow-row mt-1">
        <div className="h-full w-full col-span-2">
          <div
            className="h-2/3 bg-black relative w-full border-2 border-white border-r-0"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div
              className="absolute h-14 w-14 bg-black right-0.5 top-0.5"
              onClick={() => (window.location = "/")}
            >
              <Image
                src="/MOVTC13.png"
                width={110}
                height={110}
                className="object-contain h-14 w-14"
              ></Image>
            </div>
            <iframe
              src={vedio_link}
              width="100%"
              height="100%"
              allowFullScreen="true"
              allow="autoplay"
              className=""
            />
          </div>
          <div className="h-14 w-full  border-white flex flex-col items-center">
              <div className="w-full bg-red-500 ">
                <ul>
                  <li className="text-xl bg-red-600 w-40 h-14  flex items-center justify-center text-white">
                  Study Materials
                  </li>
                </ul>
              </div>
            </div>
            {material.map((mat, index) => (
                    <div key={index} className="text-black mx-10 mt-4">
                      <Link className="text-blue-700" href="https://drive.google.com/file/d/0Bwep5dehKW7yRGR6OTMwSlY0WUE/view?usp=sharing&resourcekey=0-9ae8dkZ-TypULIQ5IDf-xA"  download = "file.pdf" data-keyboard="false">
                        <span className="text-blue-700 underline hover:cursor-pointer">
                        Material {index + 1}
                        </span>
                      </Link>
                      
                    </div>

                  ))}
          
         
        </div>

        <div className="bg-red-50 mt-10 md:mt-0 md:h-full h-full w-full">
          <div className="text-3xl bg-red-50 flex text-red-900 justify-center font-medium shadow-xl rounded-sm py-3">
            Lectures
          </div>
          {info.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex">
                <button className="bg-red-100 md:w-full w-screen flex justify-between items-center text-red-500 text-left pb-5 border-b border-red-50 ">
                  <div
                    className="rounded-sm font-bold text-lg mt-5 px-5 float-left"
                    onClick={() => setVedio_link(item.link)}
                  >
                    Day {index + 1}: Topic {index + 1}
                  </div>
                  {dropdown != -1 && dropdown == index ? (
                    <div className="mt-5 px-5" onClick={() => setdropdown(-1)}>
                      <ArrowDropUpIcon />
                    </div>
                  ) : (
                    <div
                      className="mt-5 px-5"
                      onClick={() => setdropdown(index)}
                    >
                      <ArrowDropDownCircleIcon />
                    </div>
                  )}
                </button>
              </div>
              {dropdown == index && (
                <div>
                  <div className="bg-red-400 w-full">
                    {item.details.map((details, index) => (
                      <div className="flex w-80 min-w-full p-2" key={index}>{details}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      )}
      {paid == false && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
        <BarLoader color="#D0021B" height={4} width={100} />
      </div>
      )}
    </main>
  );
};

export default Lecture;
