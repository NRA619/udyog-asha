import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Admin_training() {
  const [count, setcount] = useState(0);
  const [coursefield, setcoursefield] = useState([
    {
      chapter: count,
    },
  ]);

  const [subcount, setsubcount] = useState(0);
  const [subcoursefield, setsubcoursefield] = useState([
    {
      chapter: subcount,
    },
  ]);
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const [formdata, setformdata] = useState([]);
  const [subformdata, setsubformdata] = useState([]);
  const [detailsdata, setdetailsdata] = useState([
    {
      name: "adss",
    },
  ]);
  const [formindex, setformindex] = useState(0);

  function addcoursefield() {
    setcoursefield((s) => {
      return [
        ...s,
        {
          chapter: count + 1,
        },
      ];
    });
    setcount(count + 1);
  }
  function addsubcoursefield() {
    setsubcoursefield((s) => {
      return [
        ...s,
        {
          chapter: subcount + 1,
        },
      ];
    });
    setsubcount(subcount + 1);
  }
  function handleRemove(i) {
    if (count >= 0) {
      const values = [...coursefield];
      values.splice(i, 1);
      setcoursefield(values);
      setcount(count - 1);
    }
  }
  function handlesubRemove(i) {
    if (subcount >= 0) {
      const values = [...subcoursefield];
      values.splice(i, 1);
      setsubcoursefield(values);
      setsubcount(subcount - 1);
    }
  }

  async function onSubmitForm(values) {
    setformdata((s) => [...s, values]);
    console.log(formdata);
    setcoursefield((s) => {
      return [
        ...s,
        {
          chapter: count + 1,
        },
      ];
    });
    setcount(count + 1);
    setformindex(formindex + 1);
    reset();
  }
  async function onSubmitForm_2(values) {
    console.log(values);
    setsubformdata((s) => [...s, values]);
    console.log(subformdata);
  }
  async function check() {
    const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/tr/posttrain", {
      data: formdata,
    });
    console.log(formdata);
    console.log(res);
  }

  return (
    <div className="min-h-screen py-20 w-full">
      <div className="flex justify-center items-center">
        <div className="bg-red-400 h-full min-h-screen w-256">
          <div className="flex flex-col w-full">
            <div className="w-full flex justify-center pt-4">
              <span className="text-white text-4xl font-sans font-medium">
                Upload Courses
              </span>
            </div>
            <div className="mt-16 m-4">
              {coursefield.map((course, index) => (
                <>
                  {formindex == index && (
                    <form
                      key={index}
                      className="flex flex-col items-center mx-10 space-y-10"
                      onSubmit={handleSubmit(onSubmitForm)}
                    >
                      <div className="flex space-x-4 justify-between w-96">
                        <label className="text-red-50 flex items-center">
                          Course Day {index}*
                        </label>
                        <input
                          type="text"
                          {...register(`chapter`, {
                            // validations
                            required: true,
                          })}
                          className="bg-red-50 shadow-sm rounded-sm h-9 w-60"
                        ></input>
                      </div>
                      <div className="flex space-x-4 w-96 justify-between">
                        <label className="text-red-50 flex items-center">
                          Video Link*
                        </label>
                        <input
                          type="text"
                          {...register(`chapter`, {
                            // validations
                            required: true,
                          })}
                          className="bg-red-50 shadow-sm rounded-sm h-9 w-60"
                        ></input>
                      </div>
                      <div className="bg-white h-10 w-60 flex items-center justify-between px-5 mt-10 mb-2 mx-10">
                        <span>Add Sub-chapters</span>
                        <span
                          className="text-xl hover:cursor-pointer"
                          onClick={() => addsubcoursefield(subcount)}
                        >
                          +
                        </span>
                        <span
                          className="text-xl hover:cursor-pointer"
                          onClick={() => handlesubRemove(subcount)}
                        >
                          -
                        </span>
                      </div>

                      <button type="submit">Next</button>
                    </form>
                  )}
                </>
              ))}
              {subformdata.map((formd, index) => (
                <div key={index} className="flex flex-col">
                  {formd.chapter}
                </div>
              ))}
              <form
                className="bg-black p-10 space-y-10 flex flex-col "
                onSubmit={handleSubmit(onSubmitForm_2)}
              >
                {subcoursefield.map((details, index) => (
                  <div className="px-10 text-white flex flex-col " key={index}>
                    <span>Sub-Chapter {details.chapter}</span>
                    <input
                      type="text"
                      className="h-10 px-4 focus:outline-none rounded-md text-red-900"
                      {...register(`chapter ${index}`, {
                        // validations
                        required: true,
                      })}
                    ></input>
                  </div>
                ))}
                <button className="text-white" type="submit">
                  Next
                </button>
              </form>
              {/* <form className="" onSubmit={handleSubmit(onSubmitForm)}>
                <div className="grid grid-cols-2 justify-items-center gap-y-10">
                  <div className="flex flex-col space-y-2">
                    <label className="px-2 text-red-50">Course name</label>
                    <input
                      type="text"
                      className="h-10 w-96 rounded-full shadow-sm px-5 focus:outline-none"
                    ></input>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="px-2 text-red-50">Img Link</label>
                    <input
                      type="text"
                      className="h-10 w-96 rounded-full shadow-sm px-5 focus:outline-none"
                    ></input>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="px-2 text-red-50">Category</label>
                    <select className="px-5 text-red-900 h-10 w-96 rounded-full shadow-sm focus:outline-none">
                      <option>Food and Food product</option>
                      <option>Food and Food product</option>
                      <option>Food and Food product</option>
                      <option>Food and Food product</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="px-2 text-red-50">Description</label>
                    <input
                      type="text"
                      className="h-10 w-96 rounded-full shadow-sm px-5 focus:outline-none"
                    ></input>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="px-2 text-red-50">Invigilator</label>
                    <input
                      type="text"
                      className="h-10 w-96 rounded-full shadow-sm px-5 focus:outline-none"
                    ></input>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="px-2 text-red-50">Featured</label>
                    <input
                      type="text"
                      className="h-10 w-96 rounded-full shadow-sm px-5 focus:outline-none"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 m-10 items-center justify-center">
                  <span className="h-10 bg-white w-96 flex justify-between items-center px-10">
                    <span>Add chapters</span>
                    <span
                      onClick={() => addcoursefield(count)}
                      className="text-2xl hover:cursor-pointer"
                    >
                      +
                    </span>
                    <span
                      onClick={() => handleRemove(count)}
                      className="text-2xl hover:cursor-pointer"
                    >
                      -
                    </span>
                  </span>
                  {coursefield.map((course, index) => (
                    <div className="flex flex-col w-3/4" key={index}>
                      <div className="flex flex-col space-y-2">
                        <label className="text-white">
                          chapter {course.chapter}
                        </label>
                        <input
                          type="text"
                          className="h-10 px-4 focus:outline-none rounded-md text-red-900"
                          name={course.chapter}
                          {...register(`chapter ${course.chapter}`, {
                            // validations
                            required: true,
                          })}
                        ></input>
                        <label className="text-white">Video Link</label>
                        <input
                          type="text"
                          className="h-10 px-4 focus:outline-none rounded-md text-red-900"
                        ></input>
                      </div>
                      <div className="bg-white h-10 w-80 flex items-center justify-between px-5 mt-10 mb-2 mx-10">
                        <span>Add Sub-chapters</span>
                        <span
                          className="text-xl hover:cursor-pointer"
                          onClick={() => addsubcoursefield(subcount)}
                        >
                          +
                        </span>
                        <span
                          className="text-xl hover:cursor-pointer"
                          onClick={() => handlesubRemove(subcount)}
                        >
                          -
                        </span>
                      </div>
                      {subcoursefield.map((details, index) => (
                        <div
                          className="px-10 text-white flex flex-col space-y-2"
                          key={index}
                        >
                          <span>Sub-Chapter {details.chapter}</span>
                          <input
                            type="text"
                            className="h-10 px-4 focus:outline-none rounded-md text-red-900"
                            {...register(`subchapter ${count} ${details.chapter}`, {
                                // validations
                                required: true,
                              })}
                          ></input>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div>
                  <button type="submit">Next</button>
                </div>

              </form> */}
              <div>
                {/* <button type="" onClick={check}>
                  asdasd
                </button> */}
              </div>
              {/* <form className="grid">
                                <span onClick={() => addcoursefield(count)} className="hover:cursor-pointer">+</span>
                                {coursefield.map((course, index) => (
                                <div className="flex flex-col" key={index}>
                                    <label>{course.chapter}</label>
                                    <input type="text" className="h-10" value={course.chapter}></input>
                                    <label>Video Link</label>
                                    <input type="text" className="h-10"></input>
                                    <span onClick={() => addsubcoursefield(subcount)}>asdas</span>
                                    {subcoursefield.map((details, index) => (
                                        <div key ={index}>{details.chapter}</div>
                                    ))}
                                </div>
                                ))}
                            </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
