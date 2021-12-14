import React from "react";

export const service = () => {

    async function bussiness() {
        window.location = "/services/bussiness_support/bussiness_support"
    }
    function registration() {
        window.location = "/services/registration/registration"
    }
    function printmedia() {
        window.location = "/services/printmedia/printmedia"
    }
    function marketing() {
        window.location = "/services/marketing/marketing"
    }

    return (
        <div className="h-full min-h-screen w-full pt-20 px-10">
            <div className="bg-yellow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-full w-full mt-20 gap-4 mb-20">
                <div onClick={bussiness} className="flex flex-col justify-between bg-yellow-400 rounded-lg h-72  shadow-md">
                    <span className="text-center pt-10 px-5 text-black">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.         
                    </span>
                    <button className="bg-yellow-100 hover:bg-black hover:text-white rounded-b-lg text-gray-800 bg-opacity-60 shadow-xl py-4">
                        Bussiness Support
                    </button>
                </div>
                <div onClick={registration} className="flex flex-col justify-between bg-green-400 rounded-lg h-72  shadow-md">
                    <span className="text-center pt-10 px-5 text-black">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.         
                    </span>
                    <button className="bg-green-100 hover:bg-black hover:text-white rounded-b-lg text-gray-800 bg-opacity-60 shadow-xl py-4">
                        Registration
                    </button>
                </div>
                <div onClick={printmedia} className="flex flex-col justify-between bg-blue-400 rounded-lg h-72  shadow-md">
                    <span className="text-center pt-10 px-5 text-black">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.         
                    </span>
                    <button className="bg-blue-100 hover:bg-black hover:text-white rounded-b-lg text-gray-800 bg-opacity-60 shadow-xl py-4">
                        Print Media
                    </button>
                </div>
                <div onClick={marketing} className="flex flex-col justify-between bg-red-400 rounded-lg h-72  shadow-md">
                    <span className="text-center pt-10 px-5 text-black">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.         
                    </span>
                    <button className="bg-red-100 hover:bg-black hover:text-white rounded-b-lg text-gray-800 bg-opacity-60 shadow-xl py-4">
                        Social Media Marketing
                    </button>
                </div>
            </div>
        </div>
    )
}

export default service;