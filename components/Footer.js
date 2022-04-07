import CallIcon from '@material-ui/icons/Call';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import CopyrightRoundedIcon from '@material-ui/icons/CopyrightRounded';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";




export default function Footer() {
    const router = useRouter();
     
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  async function loginform(values) {
      const name = values.name;
      const email = values.email;
      const query = values.query;
      const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/user/sendmail", {
        name:name,
        email:email,
        query:query,
      });

      if(res.data.done === true) {
          alert("Mail send successfully");
          window.location.reload();
      }else {
          alert("Oops! Something went wrong");
      }
  }
    return (
        <div className="h-full w-full bg-black flex flex-col">   
           <div className='px-6 pt-6 text-md font-semibold divide-y divide-white md:divide-y-0 flex-col md:flex md:flex-row md:justify-between shadow-xl'>
            {/* Address */}
            <div className="flex flex-col">
            <div className="p-4">
                <span className="text-lg border-b-4 border-white text-white font-semibold ">
                    our office
                </span>

                <span className="block mt-4">
                    <CallIcon className="text-white"></CallIcon>
                    <span className="text-white ml-2">+919850016113</span>
                </span>
                <div className="font-light text-white">
                    <span className="block">12, Ramkrishna apartment</span>
                    <span className="block">Vidyanagar sevanil</span>
                    <span className="block">Aurangabad</span>
                </div>
             </div>
             <div className="p-4">
                <span className="text-lg border-b-4 border-white text-white font-semibold ">
                    our office
                </span>
                
                <span className="block mt-4">
                    <CallIcon className="text-white"></CallIcon>
                    <span className="text-white ml-2">+918275282238</span>
                </span>
                <span className='text-white'>
                udyogaasha@gmail.com 
                </span>
                <div className="font-light text-white">
                    <span className="block">45, Hubtown coontriwood society</span>
                    <span className="block">tilekar Nagar konda budruk</span>
                    <span className="block">Pune</span>
                </div>
             </div>
             </div>


           
           {/* Contact Forum */}

            <div className="p-4 md:flex md:flex-col md:items-center">
                <span className="text-lg border-b-4 border-white text-white font-semibold">
                    Contact us
                </span>

                <form onSubmit={handleSubmit(loginform)} className="mt-4">
                    <div className="mb-2">
                        <label htmlFor="name_" className="block font-semibold text-white ">
                            Name
                        </label>
                        <input id="name_"
                          // register field
                          {...register("name", {
                            // validations
                            required: true,
                          })} name="name" className="appearance-none border rounded md:w-96 w-full p-2 font-semibold focus:outline-none focus:shadow-inner " ></input>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="email_" className="block font-semibold text-white ">
                            e-mail
                        </label>
                        <input type="email" id="email_"
                          // register field
                          {...register("email", {
                            // validations
                            required: true,
                          })}
                          name="email" className="appearance-none border rounded w-full p-2 font-semibold"></input>
                    </div>


                    <div className="mb-2">
                        <label htmlFor="query_" className="block font-semibold text-white ">
                            query
                        </label>
                        <input type="text" id="query_"
                          // register field
                          {...register("query", {
                            // validations
                            required: true,
                          })}
                          name="query" className="appearance-none border rounded w-full p-2 font-semibold"></input>
                    </div>

                    <div className="md:flex md:flex-col md:items-center">
                        <button type="submit" className="md:w-1/4 w-3/4 hover:cursor-pointer py-2 text-lg font-extrabold bg-white mt-2 text-blue-500">Submit</button>
                    </div>
                </form>
            </div>
           
            {/* Social Handles */}
            <div className="p-4 flex flex-col justify-between">
               <div className="md:flex md:flex-col md:items-center">
                <span className="text-lg border-b-4 border-white text-white font-semibold">
                    Connect with us
                </span>

                <div className="flex md:justify-center text-white w-1/2 p-2 space-x-5">
                    <InstagramIcon fontSize="small" className=""></InstagramIcon>
                    <Link href = "https://www.facebook.com/udyogaasha/">
                    <FacebookIcon  fontSize="small" className=""></FacebookIcon>
                    </Link>
                    <TwitterIcon fontSize="small"></TwitterIcon>
                </div>
                </div>
                <div className="md:flex md:flex-col md:items-center">
                <span className="text-lg border-b-4 border-white text-white font-semibold">
                    Quick Links
                </span>

                <div className="flex flex-col md:justify-center text-white w-1/2 p-2">
                    <Link href="/about">About Us</Link>
                    <Link href="/training/training">Courses</Link>
                    <Link href="/product/products">Products</Link>
                    
                </div>
                </div>
                <div className="mt-5 md:mt-0">
                    <span className="text-white">
                        2021<CopyrightRoundedIcon /> All rights reserved.
                    </span>
                </div>
                
            </div>
            </div>
            
            <div className='text-white right-0 flex justify-end px-5 pb-2 space-x-4 '>
                <Link href="https://docs.google.com/document/d/1i6jUvcB56olicNp8lqeuLNBlFxQb94kO/edit?usp=sharing&ouid=100880902003497145432&rtpof=true&sd=true" > Terms and Conditions</Link>
                <Link href="https://docs.google.com/document/d/12qjjEmtflMlgXpEAfJRgl-y8QVO4we18/edit?usp=sharing&ouid=100880902003497145432&rtpof=true&sd=true"> Privacy Policy</Link>
                <Link href="https://docs.google.com/document/d/19hT01rqH1XHwsckiGgeHnEnImFPgc9kt/edit?usp=sharing&ouid=100880902003497145432&rtpof=true&sd=true"> Return and Refund Policy</Link>
            </div>
            
        </div>
     
    )
}
