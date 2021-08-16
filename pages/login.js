import CopyrightRoundedIcon from "@material-ui/icons/CopyrightRounded";
import { motion } from "framer-motion";
import GoogleLogin from "react-google-login";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import Image from 'next/image';
{
  /* variants of framer motion line(21) used for animation */
}
const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};


//  const getdata = async () => {
//    const data = await axios.get("http://localhost:5000/tr/GetTraining")
//    console.log(data)
//}
// useEffect(()=> {
 //  getdata();
//})

export default function login()  {
  const router = useRouter();
  const googlesubmit = async (values) => {
    
    console.log(values);
    console.log(values.profileObj);
    const email = values.profileObj.email;
    console.log(email);
    try {
      const res = await axios.post("http://localhost:5000/user/googlelogin", {
        email: email,
      });
      console.log(res);
      if (res.data.isExists == false) {
        router.push({
          pathname: "/createprofile",
          query: { data: values.profileObj.email },
        });
      } else {
        router.push({
          pathname: "/",
        });
      }
    } catch (err) {
      console.log(err);
    }

    //   if(values.profileObj) {router.push({
    //     pathname: '/createprofile',
    //   query: {data: values.profileObj.email}});}
  };

  return (
    <main className="md:flex md:justify-center bg-back-image bg-no-repeat bg-cover">
      {" "}
      {/* background image (to access go to tailwindconfig)*/}
      {/* Login Card && card animation */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center items-center h-screen w-screen"
      >
        {/* Upper part */}
        {/* Upper main class !!imp */}
        <div className="relative bg-cover bg-black md:shadow-2xl h-screen w-screen md:h-3/4 md:w-3/4 mx-96">
          <div className="md:absolute md:inset-y-0 md:right-0 flex flex-col my-20 md:my-0 md:justify-between md:w-1/2 md:float-right">
            <span className="relative flex justify-center text-white font-bold">
              {/* hidden for mobile version */}
              <h1 className="hidden md:flex md:absolute md:inset-y-0 md:right-0 m-5">
                UDYOG-ASHA
              </h1>
              {/* hidden for desktop */}
              <span className="flex md:hidden justify-center font-bold text-white space-x-1 text-2xl">
                <h1>Welcome</h1>
                <h1 className="text-blue-600"> Back!</h1>
              </span>
            </span>
            {/* hidden for desktop */}
            <span className="md:hidden flex justify-center text-white text-center mx-10 my-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </span>
            {/* Desktop right image hidden for mobile version */}
            <span className="hidden relative md:flex md:flex-col justify-center items-center text-center px-5  text-white">
              <Image src="/log1.png"></Image>
            </span>
            {/* invisible for both (for spacing) */}
            <span className="invisible flex justify-center text-center px-5 text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            </span>
          </div>

          {/* Lower part */}
          <div className="">
            {/* lower main class !!imp */}
            <div className="absolute flex justify-center bg-white h-1/2 md:h-full md:w-1/2 inset-x-0 bottom-0 md:inset-y-0 md:right-0 md:rounded-none rounded-t-large">
              <div className="flex flex-col justify-between my-5">
                {/* hidden for mobile version */}
                <span className="hidden md:flex justify-center font-bold text-black space-x-1 text-2xl">
                  <h1>Welcome</h1>
                  <h1 className="text-blue-600"> Back!</h1>
                </span>
                <div className="flex flex-col justify-center items-center space-y-10">
                  {/* Login Button */}
                  {/* button animation */}

                  <GoogleLogin
                    className="flex justify-center bg-black rounded-3xl p-4 shadow-xl transition duration-500 ease-in-out bg-black hover:bg-blue-600 transform hover:-translate-y-1 hover:scale-110"
                    clientId="369653107453-suc1m13pghsvjlo7q1hq7tpmoqb0iaon.apps.googleusercontent.com"
                    buttonText="Sign in with google"
                    onSuccess={googlesubmit}
                    onFailure={googlesubmit}
                    theme="dark"
                    cookiePolicy={"single_host_origin"}
                  />
                  <span className="flex justify-center text-center px-10 text-black font-semibold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </span>
                  <span className="flex justify-center text-black font-bold">
                    Terms and Conditions.
                  </span>
                </div>
                <span className="flex justify-center font-semibold">
                  2021 <CopyrightRoundedIcon />
                  All rights reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* end of card animation */}
    </main>
  );
};

