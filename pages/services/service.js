import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";


export const Service = () => {

    const [data, setdata] = useState([])

    useEffect(async () => {
        const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/service/servdata");
        console.log(res);
        setdata(res.data);
    }, [])
    
    

    return (
        <div className="h-full min-h-screen w-full pt-20 px-10">
            {Object.keys(data).length !== 0 && (

            <div className="bg-yellow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-full w-full mt-20 gap-4">
                <div className="flex flex-col justify-between bg-registration bg-cover bg-opacity-40 rounded-lg h-72  shadow-md">
                    <span className="text-center pt-10 px-5 rounded-t-lg text-black bg-yellow-100 bg-opacity-50 h-full ">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.         
                    </span>
                    <span className="flex justify-center">
                    <Link href={`registration/${data[0]._id}`} className="">
                        <span className="bg-yellow-300  w-full flex justify-center hover:bg-black hover:text-white font-medium rounded-b-lg text-gray-800 bg-opacity-60 shadow-xl py-4">{data[0].service_name}</span>
                    </Link>
                    </span>
                </div>
                <div className="flex flex-col justify-between bg-bsupport bg-cover rounded-lg h-72  shadow-md">
                    <span className="text-center pt-10 px-5 rounded-t-lg text-black bg-green-100 bg-opacity-60 h-full">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.         
                    </span>
                    <span className="flex justify-center">
                    <Link href={`business_support/${data[1]._id}`} className="">
                      <span className="bg-green-300 w-full flex justify-center rounded-b-lg hover:bg-black font-medium hover:text-white text-gray-800 bg-opacity-60 shadow-xl py-4">{data[1].service_name}</span>
                    </Link>
                    </span>
                </div>
            </div>
        )}
        </div>
    )
}

export default Service;