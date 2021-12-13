import axios from 'axios';
import Image from 'next/image'
import { useState,useEffect } from 'react';



export default function Courses() {
    
    const [details,setDetails] = useState([]);

    useEffect(async () => {
        window.scrollTo(0, 0)
        const res = await axios.post("https://murmuring-eyrie-62394.herokuapp.com/tr/GetTraining");
        setDetails(res.data);
    }, [])
    return (
        <div className="mb-2">
            <span className="block text-2xl font-bold text-">Featured courses</span>
            <span className="w-12 mt-2 block h-1 mb-2 rounded bg-black"></span>

            <div className="grid md:grid-cols-3 gap-4 ">

            {details.map(item => (
                    <div key={item._id} className="mt-5 cursor-pointer hover:opacity-75 md:p-2">
                        <Image src={item.img} alt="cource1" width={1350} height={650} layout="responsive"></Image>
                    </div>

                ))}



                <div className="w-full">

                    <button className="w-1/2 py-2 px-2 md:px-4 text-base md:text-xl font-medium rounded-lg text-center bg-black text-white  ">show more</button>

                </div>
            </div>

        </div>
    )
}
