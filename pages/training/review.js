import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { parseCookies } from "../../components/cookie";

export const Review = () => {
  const router = useRouter();
  const [done, setdone] = useState(" ");
  const [emaillog, setemaillog] = useState(" ");
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const pid = router.query.data;
  useEffect(async () => {
    window.scrollTo(0, 0);
    const check = await axios.post(
      "http://localhost:5000/tr/checkproduct",
      {
        pid: pid,
      }
    );
    if (check.data.product === true) {
      const data = parseCookies();
      if (data.user) {
        let buff_dec = new Buffer.from(data.user, "base64");
        let xyz = buff_dec.toString("ascii");
        var email = xyz;
        if (email && pid) {
          email = email.replace(/"/g, "");
          setemaillog(email);
          const response = await axios.post(
            "http://localhost:5000/tr/reviewvalidate",
            {
              email: email,
              pid: pid,
            }
          );
          if (response.data.Done === true) {
            setdone(true);
          } else {
            setdone(false);
          }
        }
      }
    }
  }, [pid, emaillog]);
  async function onSubmitForm(values) {
    const audio = values.audio;
    const experience = values.experience;
    const interaction = values.interaction;
    const interesting = values.interesting;
    const question_answered = values.question_answered;
    const review = values.review;
    const data = parseCookies();
    if (data.user) {
      let buff_dec = new Buffer.from(data.user, "base64");
      let xyz = buff_dec.toString("ascii");
      var email = xyz;
      email = email.replace(/"/g, "");
      const res = await axios.post("http://localhost:5000/tr/review", {
        email: email,
        pid: pid,
        audio: audio,
        experience: experience,
        interaction: interaction,
        interesting: interesting,
        question_answered: question_answered,
        review_comment: review,
      });
    }
  }
  return (
    <div className="h-full w-full pt-6">
      {emaillog === " " && (
        <div className="h-screen w-full flex justify-center items-center">
          404. Page not found
        </div>
      )}
      {emaillog !== " " && (
        <div className="bg-feed bg-cover h-full w-full flex justify-center">
          <div className="bg-white bg-opacity-95 border border-blue-400 h-1/2 w-3/4 my-20 shadow-xl">
            <div className="flex justify-center">
              <span className="p-4 pt-10 text-3xl font-bold underline">
                FeedBack Form
              </span>
            </div>
            <div>
              {done === false && (
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className="px-10 space-y-2">
                    <label>Is this course is interesting?</label>
                    <fieldset id="interesting" className="flex justify-between">
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="excellent"
                          name="interesting"
                          id="exc"
                          {...register("interesting", {
                            required: true,
                          })}
                        />
                        <label htmlFor="exc">Excellent</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="interesting"
                          name="interesting"
                          id="int"
                          {...register("interesting", {
                            required: true,
                          })}
                        />
                        <label htmlFor="int">Interesting</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="notbad"
                          name="interesting"
                          id="nbd"
                          {...register("interesting", {
                            required: true,
                          })}
                        />
                        <label htmlFor="nbd">Not Bad</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="notinteresting"
                          name="interesting"
                          id="nit"
                          {...register("interesting", {
                            required: true,
                          })}
                        />
                        <label htmlFor="nit">Not Interesting</label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="px-10 space-y-2 pt-10">
                    <label>
                      Was the classroom delivery audible and understandable?
                    </label>
                    <fieldset id="audio" className="flex justify-between">
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="always"
                          name="audio"
                          id="alw"
                          {...register("audio", {
                            required: true,
                          })}
                        />
                        <label htmlFor="alw">Always</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="frequently"
                          name="audio"
                          id="fre"
                          {...register("audio", {
                            required: true,
                          })}
                        />
                        <label htmlFor="fre">Frequently</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="sometimes"
                          name="audio"
                          id="som"
                          {...register("audio", {
                            required: true,
                          })}
                        />
                        <label htmlFor="som">Some Times</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="Never"
                          name="audio"
                          id="nev"
                          {...register("audio", {
                            required: true,
                          })}
                        />
                        <label htmlFor="nev">Never</label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="px-10 space-y-2 pt-10">
                    <label>
                      General interaction of instructior with you was?
                    </label>
                    <fieldset id="interaction" className="flex justify-between">
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="excellent"
                          name="interaction"
                          id="excell"
                          {...register("interaction", {
                            required: true,
                          })}
                        />
                        <label htmlFor="excell">Excellent</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="better"
                          name="interaction"
                          id="bet"
                          {...register("interaction", {
                            required: true,
                          })}
                        />
                        <label htmlFor="bet">Better</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="good"
                          name="interaction"
                          id="good"
                          {...register("interaction", {
                            required: true,
                          })}
                        />
                        <label htmlFor="good">good</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start ">
                        <input
                          type="radio"
                          value="poor"
                          name="interaction"
                          id="poor"
                          {...register("interaction", {
                            required: true,
                          })}
                        />
                        <label htmlFor="poor">Poor</label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="px-10 space-y-2 pt-10">
                    <label>Were questions answered satisfactorly?</label>
                    <fieldset
                      id="question_answered"
                      className="flex justify-between"
                    >
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="always"
                          name="question_answered"
                          id="alwa"
                          {...register("question_answered", {
                            required: true,
                          })}
                        />
                        <label htmlFor="alwa">Always</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="frequently"
                          name="question_answered"
                          id="freq"
                          {...register("question_answered", {
                            required: true,
                          })}
                        />
                        <label htmlFor="freq">Frequently</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="sometimes"
                          name="question_answered"
                          id="some"
                          {...register("question_answered", {
                            required: true,
                          })}
                        />
                        <label htmlFor="some">Some Times</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="Never"
                          name="question_answered"
                          id="neve"
                          {...register("question_answered", {
                            required: true,
                          })}
                        />
                        <label htmlFor="neve">Never</label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="px-10 space-y-2 pt-10">
                    <label>Overall experience with this course?</label>
                    <fieldset id="experience" className="flex justify-between">
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="excellent"
                          name="experience"
                          id="excellent"
                          {...register("experience", {
                            required: true,
                          })}
                        />
                        <label htmlFor="excellent">Excellent</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="better"
                          name="experience"
                          id="better"
                          {...register("experience", {
                            required: true,
                          })}
                        />
                        <label htmlFor="better">Better</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start">
                        <input
                          type="radio"
                          value="good"
                          name="experience"
                          id="good_"
                          {...register("experience", {
                            required: true,
                          })}
                        />
                        <label htmlFor="good_">good</label>
                      </div>
                      <div className="space-x-2 flex items-center w-1/6  justify-start ">
                        <input
                          type="radio"
                          value="poor"
                          name="experience"
                          id="poor_"
                          {...register("experience", {
                            required: true,
                          })}
                        />
                        <label htmlFor="poor_">Poor</label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="flex flex-col p-10 pt-12 space-y-2">
                    <label>Help us to improve more</label>
                    <textarea
                      className="bg-gray-100 mx-2 border border-blue-800 shadow-sm p-2 text-sm focus:outline-none h-28"
                      {...register("review")}
                    ></textarea>
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

export default review;
