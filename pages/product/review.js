import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { parseCookies } from "../../components/cookie";
import BarLoader from "react-spinners/BarLoader";

export const Review = () => {
  const router = useRouter();
  const [done, setdone] = useState(" ");
  const [emaillog, setemaillog] = useState(" ")
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const [loading, setloading] = useState(true)
  const pid = router.query.data
  useEffect(async () => {
    window.scrollTo(0, 0)
    const check = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/product/checkproduct", {
      pid: pid
    })
    if (check.data.product === true) {
      const data = parseCookies();
      if (data.user) {
        let buff_dec = new Buffer.from(data.user, 'base64');
        let xyz = buff_dec.toString('ascii');
        var email = xyz;
        if (email && pid) {
          email = email.replace(/"/g, "");
          setemaillog(email)
          const response = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/product/reviewvalidate", {
            email: email,
            pid: pid
          })
          setloading(false);
          if (response.data.Done === true) {
            setdone(true);
          } else {
            setdone(false);
          }
        }
      }
    }else {
      alert("404. Page Not Found")
    }

  }, [pid, emaillog])
  async function onSubmitForm(values) {
    const product_quality = values.product_quality;
    const product_use = values.product_use;
    const comparison = values.comparison;
    const money = values.money;
    const recommendation = values.recommendation;
    const review = values.review;
    const data = parseCookies();
    if (data.user) {
      let buff_dec = new Buffer.from(data.user, 'base64');
      let xyz = buff_dec.toString('ascii');
      var email = xyz;
      email = email.replace(/"/g, "");
      const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/product/review", {
        email: email,
        pid: pid,
        product_quality: product_quality,
        product_use: product_use,
        comparison: comparison,
        money: money,
        recommendation: recommendation,
        review: review,
      })
    }
  }
  return (
    <div className="h-full w-full pt-6">
      {loading == true && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
          <BarLoader color="#000000" height={4} width={100} />
        </div>
      )}
      {emaillog === " " && loading == false &&  (
        <div className="flex justify-center items-center h-screen w-full">
          404. Page Not Found

        </div>
      )}
      {emaillog !== " " && loading == false && (
        <div className="bg-feed bg-cover h-full w-full flex justify-center ">
          <div className="bg-white bg-opacity-95 border border-blue-400 h-1/2 w-full   md:w-3/4 my-20 shadow-xl">
            <div className="flex justify-center">
              <span className="p-4 pt-10 text-3xl font-bold underline">
                FeedBack Form
              </span>
            </div>
            <div>
              {done === false && (
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className="md:px-10 px-4 space-y-2">
                    <label>What is the quality of the product?</label>
                    <fieldset id="product_quality" className="flex justify-between">
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="excellent"
                          name="product_quality"
                          id="exc"
                          {...register("product_quality", {
                            required: true,
                          })}
                        />
                        <label htmlFor="exc" className="text-sm md:text-base">Excellent</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="better"
                          name="product_quality"
                          id="int"
                          {...register("product_quality", {
                            required: true,
                          })}
                        />
                        <label htmlFor="int" className="text-sm md:text-base">Better</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="good"
                          name="product_quality"
                          id="nbd"
                          {...register("product_quality", {
                            required: true,
                          })}
                        />
                        <label htmlFor="nbd" className="text-sm md:text-base">Good</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="poor"
                          name="product_quality"
                          id="nit"
                          {...register("product_quality", {
                            required: true,
                          })}
                        />
                        <label htmlFor="nit" className="text-sm md:text-base">Poor</label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="md:px-10 px-4 space-y-2 pt-10">
                    <label>
                      How often do you use our products?
                    </label>
                    <fieldset id="product_use" className="flex justify-between">
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="always"
                          name="product_use"
                          id="alw"
                          {...register("product_use", {
                            required: true,
                          })}
                        />
                        <label htmlFor="alw" className="text-sm md:text-base">Always</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="frequently"
                          name="product_use"
                          id="fre"
                          {...register("product_use", {
                            required: true,
                          })}
                        />
                        <label htmlFor="fre" className="text-sm md:text-base">Frequently</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="sometimes"
                          name="product_use"
                          id="som"
                          {...register("product_use", {
                            required: true,
                          })}
                        />
                        <label htmlFor="som" className="text-sm md:text-base">Some Times</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="Never"
                          name="product_use"
                          id="nev"
                          {...register("product_use", {
                            required: true,
                          })}
                        />
                        <label htmlFor="nev" className="text-sm md:text-base">Never</label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="md:px-10 px-4 space-y-2 pt-10">
                    <label>How would you compare our products to our competitors?</label>
                    <fieldset id="comparison" className="flex justify-between">
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="excellent"
                          name="comparison"
                          id="excell"
                          {...register("comparison", {
                            required: true,
                          })}
                        />
                        <label htmlFor="excell" className="text-sm md:text-base">Excellent</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="better"
                          name="comparison"
                          id="bet"
                          {...register("comparison", {
                            required: true,
                          })}
                        />
                        <label htmlFor="bet" className="text-sm md:text-base">Better</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="good"
                          name="comparison"
                          id="good"
                          {...register("comparison", {
                            required: true,
                          })}
                        />
                        <label htmlFor="good" className="text-sm md:text-base">good</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start ">
                        <input
                          type="radio"
                          value="poor"
                          name="comparison"
                          id="poor"
                          {...register("comparison", {
                            required: true,
                          })}
                        />
                        <label htmlFor="poor" className="text-sm md:text-base">Poor</label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="md:px-10 px-4 space-y-2 pt-10">
                    <label>How would you rate the value for money?</label>
                    <fieldset
                      id="money"
                      className="flex justify-between"
                    >
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="costly"
                          name="money"
                          id="alwa"
                          {...register("money", {
                            required: true,
                          })}
                        />
                        <label htmlFor="alwa" className="text-sm md:text-base">Costly</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="normal"
                          name="money"
                          id="freq"
                          {...register("money", {
                            required: true,
                          })}
                        />
                        <label htmlFor="freq" className="text-sm md:text-base">Normal</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="cheap"
                          name="money"
                          id="some"
                          {...register("money", {
                            required: true,
                          })}
                        />
                        <label htmlFor="some" className="text-sm md:text-base">Cheap</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="very_cheap"
                          name="money"
                          id="neve"
                          {...register("money", {
                            required: true,
                          })}
                        />
                        <label htmlFor="neve" className="text-sm md:text-base">Very cheap</label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="md:px-10 px-4 space-y-2 pt-10">
                    <label>Would you recommend thid product to others?</label>
                    <fieldset id="recommendation" className="flex justify-around">
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="yes"
                          name="recommendation"
                          id="excellent"
                          {...register("recommendation", {
                            required: true,
                          })}
                        />
                        <label htmlFor="excellent" className="text-sm md:text-base">Yes</label>
                      </div>
                      <div className="md:space-x-2 space-x-1 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="no"
                          name="recommendation"
                          id="better"
                          {...register("recommendation", {
                            required: true,
                          })}
                        />
                        <label htmlFor="better" className="text-sm md:text-base">No</label>
                      </div>

                    </fieldset>
                  </div>
                  <div className="flex flex-col md:p-10 px-4  pt-12 space-y-2">
                    <label>Help us to improve more</label>
                    <textarea className="bg-gray-100 mx-2 border border-blue-800 shadow-sm p-2 text-sm md:text-base focus:outline-none h-28" {...register("review")}></textarea>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-white border border-indigo-100 hover:text-white hover:bg-indigo-500  text-indigo-900 py-2 px-8 mb-10 mt-10 rounded-md shadow-md"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
              {done === true && (
                <div className="flex justify-center items-center pb-5">
                  <span className="text-red-600 font-semibold">
                    You already gave the feedback
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
