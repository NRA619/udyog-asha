import React from "react"

const thankyou = () => {

    function homepage() {
        window.location = "/"
    }

    return (
        <div className="">
            <div className="h-screen bg-white text-black space-y-4 w-screen  flex flex-col justify-center items-center">
                <div>
                    Thanks for choosing us, Please Check your Email
                </div>
                <div>
                    You have paid Successfully,
                </div>
                <button onClick = {homepage} className= "bg-indigo-700 px-4 py-2 text-white">
                    Go to home Page
                </button>
            
            </div>
        </div>
    )
}

export default thankyou;
