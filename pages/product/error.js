import React from "react"

const error = () => {

    function homepage() {
        window.location = "/"
    }

    return (
        <div className="">
            <div className="h-screen bg-white text-black space-y-4 w-screen  flex flex-col justify-center items-center">
                <div>
                    Oops..!, Something went wrong
                </div>
                <div>
                   Please try Again
                </div>
                <button onClick = {homepage} className= "bg-indigo-700 px-4 py-2 text-white">
                    Go to home Page
                </button>
            
            </div>
        </div>
    )
}

export default error;
