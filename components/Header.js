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
import Link from 'next/Link';
import { motion } from 'framer-motion';
import axios from 'axios';


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
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  // const gettoken = async () => {
  //   const restoken = await axios.get('http://localhost:5000/user/refresh_token');
  //   if (restoken) {
  //     console.log(restoken)
  //   }
  //   else{
  //     console.log("error!!!!!!!!!!")
  //   }
  // }
  // useEffect(() => {
  //   gettoken();
  // })
 
  return (

    // Header
    <div className="fixed flex z-50 bg-white justify-between shadow-md border w-full">

      {/*  Hamberger-button */}
      <button className="md:hidden m-3 text-black px-1 shadow-sm" onClick={toggleDrawer}>
        <DehazeRoundedIcon />
      </button>

      {/*  Logo */}
      <h1 className=" text-md font-bold text-gray-800 pt-3 md:pt-4 md:ml-5">
        <span>
          Udyog
        </span>
        <span>
          Asha
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
              <Link href="/training">Training</Link>
            </li>
            <li className="space-x-3 pl-10 py-4 border-b-2 border-gray-900 border-opacity-50 hover:bg-gray-800">
              <InfoRoundedIcon />
              <a href="#">Services</a>
            </li>
            <li className="space-x-3 pl-10 py-4 border-b-2 border-gray-900 border-opacity-50 hover:bg-gray-800 hover:cursor-pointer">
            
              <SupervisedUserCircleRoundedIcon />
              <Link href="/about" className="">About Us</Link>
            </li>
            <li className="space-x-3 pl-10 py-4 border-b-2 border-gray-900 border-opacity-50 hover:bg-gray-800 hover:cursor-pointer">
            
              <LocalMallIcon color="secondary"/>
              <Link href="/" className="">Shopping</Link>
            </li>
          </ul>
        </div>
      </Drawer>
      
      {/* Desktop screen Navitems */}
      {/* login button and navitems are in same div */}
      <div className="text-black flex mr-1 space-x-0 md:space-x-12">
      <ul className="hidden md:flex md:space-x-10 lg:space-x-16">
            <motion.li variants={container} initial="hidden" animate="visible" className="md:pt-4 hover:cursor-pointer">
              <Link href="/">
                <span className= "font-semibold hover:border-blue-500 hover:border-b-4 hover:text-blue-900 hover:font-bold hover:shadow-md transition duration-700 hover:ease-in-out">Home</span>
              </Link>
            </motion.li>
            <motion.li variants={container} initial="hidden" animate="visible" className="md:pt-4 hover:cursor-pointer">
              <Link href="/training">
                <span className="font-semibold hover:border-blue-500 hover:border-b-4 hover:text-blue-900 hover:font-bold hover:shadow-md transition duration-700 hover:ease-in-out">Training</span>
              </Link>
            </motion.li>
            <motion.li variants={container} initial="hidden" animate="visible" className="md:pt-4 hover:cursor-pointer">
              <a className="font-semibold hover:border-blue-500 hover:border-b-4 hover:text-blue-900 hover:font-bold hover:shadow-md transition duration-700 hover:ease-in-out" >Services</a>
            </motion.li>
            <motion.li variants={container} initial="hidden" animate="visible" className="md:pt-4 hover:cursor-pointer">
              <Link href="/about">
              <span className="font-semibold hover:border-blue-500 hover:border-b-4 hover:text-blue-900 hover:font-bold hover:shadow-md transition duration-700 hover:ease-in-out">About Us</span>
              </Link>
            </motion.li>
            <motion.li variants={container} initial="hidden" animate="visible" className="pt-4 space-x-1 flex hover:cursor-pointer">
              
              <Link href = "/" className="">
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
                Shopping
              </span>
            
              
            </motion.li>
            
          </ul>
      
      {/*  Login button */}     
      <button className="justify-self-end space-x-0.5 md:p-2 md:m-2 bg-black text-white text-md m-1.5 rounded-md shadow-md px-1.5 ouline hover:opacity-75">
        <span>
          <LockIcon fontSize="small"></LockIcon>
        </span>
        <Link href ="/login"><span className="ml-2 items-center">Login</span></Link>
      </button>
    </div>



    </div>

  )
}
