import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { useRef } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "../../components/cookie";
import axios from "axios";

const App_pdf = () => {
  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);
  const router = useRouter();
  const productId = router.query.data;
  const [fname, setfname] = useState("");
  const [info, setinfo] = useState([]);
  const [paidid, setpaidid] = useState("");

  useEffect(async () => {
    const data = parseCookies();
    if (productId && data.user) {
      let buff_dec = new Buffer.from(data.user, "base64");
      let xyz = buff_dec.toString("ascii");
      var email = xyz;
      if (email) {
        email = email.replace(/"/g, "");
        const res = await axios.post(
          "https://murmuring-eyrie-62394.herokuapp.com/user/getdata",
          {
            email: email,
          }
        );
        setfname(res.data.fullname);
        console.log(res);
        const resp = await fetch(
          `https://murmuring-eyrie-62394.herokuapp.com/tr/Details/${productId}`
        );
        const post = await resp.json();
        setinfo(post);
        console.log(post);
        const respt = await axios.post(
          "https://murmuring-eyrie-62394.herokuapp.com/tr/get_paid_id",
          {
            email: email,
            pid: productId,
          }
        );
        if (respt.data.data == "Not found") {
          return window.location == "/";
        } else {
          setpaidid(respt.data.data);
        }
      }
    }
  }, [productId]);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  const handleExportWithFunction = (event) => {
    savePDF(contentArea.current, { paperSize: "A4" });
  };

  return (
    <div className="min-h-screen h-full w-full">
      {paidid != "" && productId && fname != "" && (
        <>
          <PDFExport ref={pdfExportComponent} paperSize="A4">
            <div
              ref={contentArea}
              className="flex h-156 w-full justify-between relative bg-yellow-500 py-10 font-sans"
            >
           
              <div className="flex justify-between right-0 h-full w-full">
              <div className="w-44 h-full flex flex-col justify-end">
                <Image
                        src="/cert.png"
                        height={900}
                        width={180}
                      ></Image> 
                </div>
                <div className="flex flex-col items-center bg-white w-6/7">
                <div className="flex pt-2 space-x-3">
                  <div className="flex flex-col items-end text-sm">
                    <div className="font-bold text-red-600">UDYOGAASHA</div>
                    <div className="text-xs pt-1 text-indigo-800 font-bold">
                      Vocational Education and Training Board
                    </div>
                    <div className="text-xs pt-0.5 font-bold text-indigo-800">
                      Maharashtra
                    </div>
                  </div>
                  <div className="h-16 w-0.5 bg-black"></div>
                  <div className="flex flex-col items-start text-sm">
                    <div className="font-sans ">
                      <Image
                        src="/udyogasha.png"
                        height={60}
                        width={180}
                      ></Image>
                    </div>
                  </div>
                </div>
                <div className="text-xxs pt-4">
                  An ISO 9000-2015 Certified Vocation Training Board
                </div>
                <div className="text-xxs">
                  An Autonomous Body Vocational Educational and Training Board
                </div>
                <div className="text-xxs">
                  Established under 1860 and 1950 Act. Reg. No.
                  MH/1140/2021-F-56196/PN
                </div>
                <div className="text-xxs">
                  Niti Aayog NGO Darpan Reg. No. MH/2022/0305637
                </div>
                <div className="text-xxs">
                  Ministry of Micro, Small and Medium Enterprises Reg. No.
                  MH/26/0143867
                </div>
                <div className="text-xxs">
                  MIIRD CR Act 1957 Govt. of India.
                </div>
                <div className="text-xxs">
                  Board for Implementation of Vocational Training Schemes Govt.
                  of Maharashtra
                </div>

                <div className="pt-4 text-2xl font-semibold text-red-600 pr-2">
                  <Image src="/udyogmiddle.png" height={30} width={380}></Image>
                </div>
                <div className="text-indigo-800 font-semibold">
                  MAHARASHTRA OPEN VOCATIONAL TRAINING CENTER
                </div>
                <div className="text-xxs font-medium">
                  (National Skill Development Corporation Training Partner Reg.
                  No. 055402)
                </div>
                <div className="flex items-end space-x-4 pt-2">
                  <span className="text-4xl flex text-red-600 font-semibold">
                    Certificate
                  </span>
                  <span className="text-xs">no.</span>
                  <span className="text-xxs">{paidid}</span>
                </div>
                <div className="flex items-end pt-4 space-x-2 text-xl font-Hurricane">
                  <span className="">
                    This is to Certify that Shri./Smt./Ram.
                  </span>
                  <div className="flex flex-col items-center">
                
                    <span className="h-0.1 w-40 bg-black"></span>
                  </div>
                </div>
                <div className="flex items-end pt-4 space-x-2 text-xl font-Hurricane">
                  <div className="flex flex-col items-center">
                  <span className="text-indigo-800 ">{fname}</span>
                  <span className="h-0.1 w-72 bg-black"></span>
                  </div>
                  <span>Having Attended and</span>
                </div>
                <div className="flex items-end pt-4 space-x-2 text-xl font-Hurricane">
                  <span>Successfully completed a Course in</span>
                  <div className="flex flex-col items-center">
                    <span></span>
                    <span className="h-0.1 w-52 bg-black"></span>
                  </div>
                </div>
                <div className="flex items-end pt-4 font-Hurricane">
                  <div className="flex flex-col items-center">
                    <span className="text-indigo-800">{info.pname}</span>
                    <span className="h-0.1 w-96 bg-black"></span>
                    
                  </div>
                  <span className="h-0.1 w-5 bg-black"></span>
                </div>

                <div className="flex items-end pt-4 text-xl  font-Hurricane">
                  <span>by the training centre</span>
                  <div className="flex flex-col items-center">
                    <span className="text-indigo-800">Udyog Asha</span>
                    <span className="h-0.1 w-64 ml-4 bg-black"></span>
                  </div>
                  <span className="h-0.1 w-6 bg-black"></span>
                </div>
                <div className="flex justify-around h-full w-full pt-20 ">
                  <div ca>Center Head</div>
                  <div>Director</div>
                </div>
              </div>
              
              </div>
            </div>
          </PDFExport>
          <div className=" py-10 flex justify-center">
            <button
              className="bg-gray-900 py-2 px-4 text-gray-100 shadow-md glow glow-gray-600-md rounded-full hover:bg-gray-800 hover:text-gray-100 transform delay-200 transition hover:scale-105"
              onClick={handleExportWithComponent}
            >
              Download Certificate
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App_pdf;
