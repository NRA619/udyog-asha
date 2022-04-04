import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

export default function Courses() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
  };
  var settings1 = {
  
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
  };

  const [details, setDetails] = useState([]);

  useEffect(async () => {
    window.scrollTo(0, 0);
    const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/tr/GetTraining");
    setDetails(res.data);
  }, []);

  return (
    <div className="mb-2">
      <span className="block text-2xl font-bold text-">Featured courses</span>
      <span className="w-12 mt-2 block h-1 mb-2 rounded bg-black"></span>

      <div className="hidden md:block">
        <Slider {...settings}>
          {details
            .filter((val) => {
              if (val.featured == true) {
                return val;
              }
            })
            .map((item) => {
              return (
                <div
                  key={item._id}
                  className="mt-5 cursor-pointer hover:opacity-75 md:p-2"
                >
                  <Image
                    src={item.img}
                    alt="cource1"
                    width={1450}
                    height={850}
                    layout="responsive"
                  ></Image>
                </div>
              );
            })}
        </Slider>
      </div>
      <div className="md:hidden block">
        <Slider {...settings1}>
          {details
            .filter((val) => {
              if (val.featured == true) {
                return val;
              }
            })
            .map((item) => {
              return (
                <div
                  key={item._id}
                  className="mt-5 cursor-pointer hover:opacity-75 md:p-2"
                >
                  <Image
                    src={item.img}
                    alt="cource1"
                    width={1450}
                    height={850}
                    layout="responsive"
                  ></Image>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
}
