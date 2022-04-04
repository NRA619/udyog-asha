import Review from "./Review";
import Image from "next/image";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

export default function Reviews() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
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
      <div className="p-4 text-md">
        <span className="block text-2xl font-bold text-">Success stories</span>
        <span className="w-12 mb-10  mt-2 block h-1 rounded bg-black"></span>

        <div className="hidden md:block">
          <Slider {...settings}>
            <div className="h-full w-full px-2 ">
              <Image
                src="/ss/1.png"
                className="mx-2"
                height={500}
                width={900}
              ></Image>
            </div>
            <div className="h-full w-full px-2 ">
              <Image
                src="/ss/2.png"
                className="mx-2"
                height={500}
                width={900}
              ></Image>
            </div>
            <div className="h-full w-full px-2 ">
              <Image
                src="/ss/3.png"
                className="mx-2"
                height={500}
                width={900}
              ></Image>
            </div>
            <div className="h-full w-full px-2 ">
              <Image
                src="/ss/4.png"
                className="mx-2"
                height={500}
                width={900}
              ></Image>
            </div>
            <div className="h-full w-full px-2 ">
              <Image
                src="/ss/5.png"
                className="mx-2"
                height={500}
                width={900}
              ></Image>
            </div>
            <div className="h-full w-full px-2 ">
              <Image
                src="/ss/7.png"
                className="mx-2"
                height={500}
                width={900}
              ></Image>
            </div>
          </Slider>
        </div>
        <div className="block md:hidden">
          <Slider {...settings1}>
          <div className="h-full w-full px-2">
              <Image
                src="/ss/1.png"
                className="mx-2"
                height={640}
                width={900}
              ></Image>
            </div>
            <div className="h-full w-full px-2">
              <Image
                src="/ss/2.png"
                className="mx-2"
                height={640}
                width={900}
              ></Image>
            </div>
            <div className="h-full w-full px-2">
              <Image
                src="/ss/3.png"
                className="mx-2"
                height={640}
                width={900}
              ></Image>
            </div>
            <div className="h-full w-full px-2">
              <Image
                src="/ss/4.png"
                className="mx-2"
                height={640}
                width={900}
              ></Image>
            </div>
            <div className="h-full w-full px-2">
              <Image
                src="/ss/5.png"
                className="mx-2"
                height={640}
                width={900}
              ></Image>
            </div>
            <div className="h-full w-full px-2">
              <Image
                src="/ss/7.png"
                className="mx-2"
                height={640}
                width={900}
              ></Image>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}
