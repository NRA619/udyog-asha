
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Address() {
    const { register, handleSubmit } = useForm();
     
    function onSubmitForm(values) {
      values.firstname = values.firstname.trim();
      
      // const trimvalue = values.trim();
      console.log(values);
    } 
  
     return (
       <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="relative  flex flex-col justify-center items-center">
            <div className ="md:ml-10 md:my-0 my-4">
            <span className="block text-2xl font-bold ">Personel Details</span>
            <span className="w-12 mt-2 block h-1 rounded bg-black"></span>
            </div>
          <div className="md:h-2/3 my-4 py-10 md:justify-items-center items-center w-5/6 md:grid  md:grid-cols-2 bg-blue-50 shadow-xl">
            
            <div className="w-3/4 flex flex-col space-y-3 m-6">
              <label htmlFor="firstname" className="font-medium">Full Name*</label>
              <input type="text" id="firstname" {...register("firstname", {
                required: {
                value: true,
                message: "You need to enter your message"
              },
              })} name="firstname"  className="rounded-3xl p-4 shadow-lg h-10 focus:outline-none focus:ring focus:border-blue-600" required></input>
            </div>
            <div className="w-3/4 flex flex-col space-y-3 m-6">
              <label htmlFor="dateofbirth" className="font-medium">Date of Birth*</label>
              <input type="text" id="dateofbirth" {...register("dateofbirth", {
                required: {
                value: true,
                message: "You need to enter your message"
              },
              })} className="rounded-3xl p-4 shadow-lg h-10 focus:outline-none focus:ring focus:border-blue-300"></input>
            </div>
            <div className="w-3/4 flex flex-col space-y-3 m-6">
              <label htmlFor="age" className="font-medium">Age*</label>
              <input type="text" id="age" className="rounded-3xl p-4 shadow-lg focus:outline-none h-10 focus:ring focus:border-blue-300" ></input>
            </div>
            
     
          </div>
        </div>
        <button type="submit"> Submit </button>
        </form>
    
     );
            }