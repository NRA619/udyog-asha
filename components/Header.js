import React, {useEffect} from 'react';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import DehazeRoundedIcon from '@material-ui/icons/DehazeRounded';
import LockIcon from '@material-ui/icons/Lock'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LayersRoundedIcon from '@material-ui/icons/LayersRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { parseCookies } from "../pages/cookie";
import {useCookies} from 'react-cookie';
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/router';



const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    
    }
  }
};
export default function Header() {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(["user"])
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const [isLogged, setisLogged] = React.useState(false);
  useEffect(()=> {
  const data = parseCookies()
  if(data.user){
    setisLogged(true);
  }
  else{
    setisLogged(false);
  }
  // const userdata = data.user
  // console.log("this is user" + userdata.replace(/"/g,"") )
});
  
  const logout = async () => {
    removeCookie("user", {
      path: '/',
      maxAge: 3600, // Expires After 1hr
      sameSite: true,
    })
    setisLogged(false);
    window.location.reload();
  }

  return (

    // Header
    <div className="fixed flex z-50 bg-white justify-between shadow-md border w-full">

      {/*  Hamberger-button */}
      <button className="md:hidden m-3 text-black px-1 shadow-sm" onClick={toggleDrawer}>
        <DehazeRoundedIcon />
      </button>

      {/*  Logo */}
      <h1 className=" text-md flex font-bold text-gray-800 items-center md:ml-5">
      <div className="flex justify-center">
         <Image src = "/MOVTC1.png" width={60} height= {60}></Image>
      </div>
        <span className="text-lg flex">
        <span className="text-red-700">उद्योग</span>
        <span className="text-red-700">आशा</span>
        </span> 
        
      </h1>


      {/*  Drawer */}
      <Drawer open={isOpen} onClose={toggleDrawer} direction='left' style={{ background: 'black' }}>
        <div className="text-white font-semibold pt-3">
          <h1 className="float-left ml-3 font-bold">Udyog-asha</h1>
          <ClearRoundedIcon className="cursor-pointer float-right mr-3" onClick={toggleDrawer} />
          <ul className="mt-20">
         
            <li className="space-x-3 pl-10 py-4 border-t-2 border-b-2 border-gray-900 border-opacity-50 shadow-2xl  hover:bg-gray-800">
              <HomeRoundedIcon />
              <Link className="" href="/">Home</Link>
            </li>
            
            <li className="space-x-3 pl-10 py-4 border-b-2 border-gray-900 border-opacity-50 hover:bg-gray-800">
              <LayersRoundedIcon />
              <Link href="/training/training">Training</Link>
            </li>
            <li className="space-x-3 pl-10 py-4 border-b-2 border-gray-900 border-opacity-50 hover:bg-gray-800">
              <InfoRoundedIcon />
              <a>Services</a>
            </li>
            <li className="space-x-3 pl-10 py-4 border-b-2 border-gray-900 border-opacity-50 hover:bg-gray-800 hover:cursor-pointer">
            
              <SupervisedUserCircleRoundedIcon />
              <Link href="/about" className="">About Us</Link>
            </li>
            <li className="space-x-3 pl-10 py-4 border-b-2 border-gray-900 border-opacity-50 hover:bg-gray-800 hover:cursor-pointer">
            
              <LocalMallIcon color="secondary"/>
              <Link href="/product/product" className="">Shopping</Link>
            </li>
          </ul>
        </div>
      </Drawer>
      
      {/* Desktop screen Navitems */}
      {/* login button and navitems are in same div */}
      <div className="text-black flex mr-1 space-x-0 md:space-x-12">
      <ul className="hidden md:flex md:space-x-8 lg:space-x-16">
      {router.pathname == '/' &&
            <li variants={container} initial="hidden" animate="visible" className="md:pt-4 hover:cursor-pointer">
              <Link href="/">
                <span className= "border-blue-500 border-b-4 text-blue-900 font-bold shadow-md transition duration-700 ease-in-out">Home</span>
              </Link>
            </li>
          } 
          {router.pathname != '/' &&
            <li variants={container} initial="hidden" animate="visible" className="md:pt-4 hover:cursor-pointer">
              <Link href="/">
                <span className= "font-semibold hover:border-blue-500 hover:border-b-4 hover:text-blue-900 hover:font-bold hover:shadow-md">Home</span>
              </Link>
            </li>
          }
          {router.pathname == '/training/training' && 
            <li variants={container} initial="hidden" animate="visible" className="md:pt-4 hover:cursor-pointer">
              <Link href="/training/training">
                <span className="d border-red-500 border-b-4 text-red-900 font-bold shadow-md ">Training</span>
              </Link>
            </li>
            }
            {router.pathname != '/training/training' && 
            <li variants={container} initial="hidden" animate="visible" className="md:pt-4 hover:cursor-pointer">
              <Link href="/training/training">
                <span className="font-semibold hover:border-red-500 hover:border-b-4 hover:text-red-900 hover:font-bold hover:shadow-md transition duration-700 hover:ease-in-out">Training</span>
              </Link>
            </li>
            }  
            <li variants={container} initial="hidden" animate="visible" className="md:pt-4 hover:cursor-pointer">
              <a className="font-semibold hover:border-blue-500 hover:border-b-4 hover:text-blue-900 hover:font-bold hover:shadow-md transition duration-700 hover:ease-in-out" >Services</a>
            </li>
            {router.pathname == '/about' && 
            <li variants={container} initial="hidden" animate="visible" className="md:pt-4 hover:cursor-pointer">
              <Link href="/about">
              <span className=" border-blue-500 border-b-4 text-blue-900 font-bold shadow-md transition duration-700 hover:ease-in-out">About Us</span>
              </Link>
            </li>
            }
            {router.pathname != '/about' && 
            <li variants={container} initial="hidden" animate="visible" className="md:pt-4 hover:cursor-pointer">
              <Link href="/about">
              <span className="font-semibold hover:border-blue-500 hover:border-b-4 hover:text-blue-900 hover:font-bold hover:shadow-md transition duration-700 hover:ease-in-out">About Us</span>
              </Link>
            </li>
            }
            <motion.li variants={container} initial="hidden" animate="visible" className="pt-4 space-x-1 flex hover:cursor-pointer">
              
              <Link href = "/product/product" className="">
                <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 40
                }} 
                >
                <LocalMallIcon color="secondary" className="" />
                </motion.div>
              </Link>
              
              <span className="font-semibold hover:text-blue-900 hover:font-bold transition duration-700 hover:ease-in-out">
                <Link href = "/product/product">Shopping</Link>
              </span>
              
              
            </motion.li>
          </ul>
      
      {/*  Login button */}    
      {isLogged == false && 
      <button className="justify-self-end space-x-0.5 md:p-2 md:m-2 bg-black text-white text-md m-1.5 rounded-md shadow-md px-1.5 ouline hover:opacity-75">
        <span>
          <LockIcon fontSize="small"></LockIcon>
        </span>
        <Link href ="/login"><span className="ml-2 items-center">Login</span></Link>
      </button>
      }
      {isLogged == true && 
      <button onClick={() => logout()} className="justify-self-end space-x-0.5 md:p-2 md:m-2 bg-black text-white text-md m-1.5 rounded-md shadow-md px-1.5 ouline hover:opacity-75">
        <span>
          <LockIcon fontSize="small"></LockIcon>
        </span>
        <span className="ml-2 items-center" >Logout</span>
      </button>
      }
    </div>



    </div>

  )
}
Header.getInitialProps = async ({ res, req }) => {
  const data = parseCookies(req)
  console.log(data)
  return {
    data: data,
  }
}
