
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";


export default function Certificates() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      swipeToSlide: true,
    };
    var settings1 = {
    
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      swipeToSlide: true,
    };
    // grid md:grid-cols-2 gap-4
    return (
      <>
        <div className="p-4 text-md pb-20 h-full">
          <span className="block text-2xl font-bold text-">Certificates</span>
          <span className="w-12 mb-10  mt-2 block h-1 rounded bg-black"></span>
  
          <div className="hidden md:block">
            <Slider {...settings} className="sapce-x-2">
               <div className="h-full w-full px-2 ">
                   <Image src="/certificate/21.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/22.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/20.png"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/19.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/18.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/17.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/16.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/15.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/14.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/13.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/12.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/11.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/10.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/9.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/8.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/7.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/6.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/5.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/4.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/3.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/2.jpg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/1.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
            </Slider>
          </div>
          <div className="md:hidden block ">
            <Slider {...settings1} className="sapce-x-2">
               <div className="h-full w-full px-2">
                   <Image src="/certificate/21.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/22.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/20.png"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/19.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/18.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/17.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/16.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/15.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/14.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/13.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/12.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/11.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/10.jpeg" className="mx-2" height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/9.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/8.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/7.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/6.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/5.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/4.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/3.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/2.jpg"  className="mx-2"height={400} width={400}></Image>
               </div>
               <div className="h-full w-full px-2">
                   <Image src="/certificate/1.jpeg"  className="mx-2"height={400} width={400}></Image>
               </div>
            </Slider>
          </div>
        </div>
      </>
    );
  }
  