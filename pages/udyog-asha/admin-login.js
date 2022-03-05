import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import { Controller, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function Admin_login() {
    const [cookie, setCookie] = useCookies(["user"]);
    const router = useRouter();
    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        watch,
      } = useForm();
      
  async function loginform(values) {
      const username = values.username;
      const password = values.password;
      const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/admin/login", {
          username: username,
          password: password,

      })
      if(res.data.user == true) {
        let buff = new Buffer.from(username);
        let stringToBase64 = buff.toString('base64');
        setCookie("user_admin", JSON.stringify(stringToBase64), {
          path: "/",
          maxAge: 3600, // Expires After 1hr
          sameSite: true,
        });
        window.location = "/udyog-asha/admin"
      }else {
          return alert("username and password is incorrect")
      }
  }

    return(
        <div className="min-h-screen w-full ">
            <div className="min-h-screen w-500 flex justify-center items-center">
                <div className="h-96 w-128 bg-blue-400">
                    <div className="flex justify-center mt-4 text-4xl text-white">Welcome Admin</div>
                    <form onSubmit={handleSubmit(loginform)} className="flex flex-col mt-10 items-center h-full space-y-10">
                        <div className="flex flex-col space-y-1">
                            <label className="text-blue-50">Username*</label>
                            <input type = "text"  {...register("username", {
                            // validations
                            required: true,
                          })}
                          name="username" className="bg-white focus:outline-none px-2 h-10 w-80 shadow-sm rounded-md"></input>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label className="text-blue-50">Password*</label>
                            <input type = "password"  {...register("password", {
                            // validations
                            required: true,
                          })}
                          name="password" className="bg-white focus:outline-none px-2 h-10 w-80 shadow-sm rounded-md"></input>
                        </div>
                        <div>
                            <button className="py-1.5 px-4 bg-white shadow-sm rounded-sm text-blue-900">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}