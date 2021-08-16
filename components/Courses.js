import Image from 'next/image'


const cources = [

    { id: 1, name: "/1.png" },
    { id: 2, name: "/2.png" },
    { id: 3, name: "/3.png" },
    { id: 4, name: "/4.png" },
    { id: 5, name: "/5.png" },
    { id: 6, name: "/7.png" },

]



export default function Courses() {
    return (
        <div className="mb-2">
            <span className="block text-2xl font-bold text-">Featured courses</span>
            <span className="w-12 mt-2 block h-1 mb-2 rounded bg-black"></span>

            <div className="grid md:grid-cols-3 gap-4 ">

                {cources.map(item => (
                    <div key={item.id} className="mt-5 cursor-pointer hover:opacity-75 md:p-2">
                        <Image src={item.name} alt="cource1" width={1350} height={650} layout="responsive"></Image>
                    </div>

                ))}



                <div className="w-full">

                    <button className="w-1/2 py-2 px-2 md:px-4 text-base md:text-xl font-medium rounded-lg text-center bg-black text-white  ">show more</button>

                </div>
            </div>

        </div>
    )
}
