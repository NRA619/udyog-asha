import CallIcon from '@material-ui/icons/Call';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import CopyrightRoundedIcon from '@material-ui/icons/CopyrightRounded';
import Link from 'next/link';
import TouchAppRoundedIcon from '@material-ui/icons/TouchAppRounded';

export default function Footer() {
    return (
        <div className="bg-black p-6 text-md font-semibold divide-y divide-white md:divide-y-0 flex-col md:flex md:flex-row md:justify-between shadow-xl">   
           
            {/* Address */}
            <div className="flex flex-col">
            <div className="p-4">
                <span className="text-lg border-b-4 border-white text-white font-semibold ">
                    our office
                </span>

                <span className="block mt-4">
                    <CallIcon className="text-white"></CallIcon>
                    <span className="text-white ml-2">+9192939494</span>
                </span>

                <div className="font-light text-white">
                    <span className="block">102 c/26 , Bhawani peth</span>
                    <span className="block">solapur</span>
                    <span className="block">Maharahstra</span>
                </div>
             </div>
             <div className="p-4">
                <span className="text-lg border-b-4 border-white text-white font-semibold ">
                    our office
                </span>

                <span className="block mt-4">
                    <CallIcon className="text-white"></CallIcon>
                    <span className="text-white ml-2">+9192939494</span>
                </span>

                <div className="font-light text-white">
                    <span className="block">102 c/26 , Bhawani peth</span>
                    <span className="block">solapur</span>
                    <span className="block">Maharahstra</span>
                </div>
             </div>
             </div>


           
           {/* Contact Forum */}

            <div className="p-4 md:flex md:flex-col md:items-center">
                <span className="text-lg border-b-4 border-white text-white font-semibold">
                    Contact us
                </span>

                <form className="mt-4">
                    <div className="mb-2">
                        <label className="block font-semibold text-white ">
                            Name
                        </label>
                        <input className="appearance-none border rounded md:w-96 w-full p-2 font-semibold focus:outline-none focus:shadow-inner " ></input>
                    </div>

                    <div className="mb-2">
                        <label className="block font-semibold text-white ">
                            e-mail
                        </label>
                        <input type="email" className="appearance-none border rounded w-full p-2 font-semibold"></input>
                    </div>


                    <div className="mb-2">
                        <label className="block font-semibold text-white ">
                            Phone
                        </label>
                        <input type="" className="appearance-none border rounded w-full p-2 font-semibold"></input>
                    </div>

                    <div className="md:flex md:flex-col md:items-center">
                        <button className="md:w-1/4 w-3/4 hover:cursor-pointer py-2 text-lg font-extrabold bg-white mt-2 text-blue-500">Submit</button>
                    </div>
                </form>
            </div>
           
            {/* Social Handles */}
            <div className="p-4 flex flex-col justify-between">
               <div className="md:flex md:flex-col md:items-center">
                <span className="text-lg border-b-4 border-white text-white font-semibold">
                    Connect with us
                </span>

                <div className="flex md:justify-center text-white w-1/2 p-2 space-x-5">
                    <InstagramIcon fontSize="small" className=""></InstagramIcon>
                    <FacebookIcon fontSize="small" className=""></FacebookIcon>
                    <TwitterIcon fontSize="small"></TwitterIcon>
                </div>
                </div>
                <div className="md:flex md:flex-col md:items-center">
                <span className="text-lg border-b-4 border-white text-white font-semibold">
                    Quick Links
                </span>

                <div className="flex flex-col md:justify-center text-white w-1/2 p-2">
                    <Link href="/about">About Us</Link>
                    <Link href="/">Consultancy</Link>
                    <Link href="/">Blog</Link>
                    
                </div>
                </div>
                <div className="mt-5 md:mt-0">
                    <span className="text-white">
                        2021<CopyrightRoundedIcon /> All rights reserved.
                    </span>
                </div>
            </div>
        </div>
     
    )
}
