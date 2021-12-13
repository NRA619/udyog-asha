import Image from 'next/image'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
export default function Review({ name, children }) {
    return (
        <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
                <div className="">
                    <PersonOutlineIcon fontSize="large"> </PersonOutlineIcon>
                    <span className="text-xl font-semibold block">Hrithik Singh</span>
                    <span className="text-large block text-gray-800">founder and ceo</span>
                </div>
                <div>

                    <p className="font-bold text-lg">
                        Laboris ullamco amet elit velit aute nisi laboris incididunt do deserunt est minim tempor. Nisi duis irure ut exercitation anim aliquip eiusmod quis.
                    </p>

                    <button className="mt-2 bg-black text-white text-base px-4 py-2 rounded-lg">show more</button>

                </div>

            </div>

        </div>
    )
}
