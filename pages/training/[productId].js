import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";

const ProductDetail = () => {
  const router = useRouter();
  const encryptedId = router.query.productId;
  const [info, setinfo] = useState([]);
  const [loading, setloading] = useState(true);
  const [productId, setproductId] = useState(" ")
  
  
  useEffect(() => {
    if(encryptedId) {
      console.log(encryptedId)
      const productid = window.atob(encryptedId);
      setproductId(productid);
      console.log(productId)
    }
    if (productId !== " ") {
      if (Object.keys(info).length === 0) {
      (async () => {
        const res = await fetch(
          `http://localhost:5000/tr/Details/${productId}`
        );
        const post = await res.json();
        setinfo(post);
        console.log(info);
        setTimeout(() => {
          setloading(false);
        }, 2000);
        
      })();
     
    }
  }
    
  }, [productId]);
  async function paymentpage() {
    await router.push({
      pathname: "/training/pay_review",
      query: { data: productId }, // passing email variable
    });
  }

  return (
    <main className="">
      {loading == true && (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
        <BarLoader
          color="#D0021B"
          height={4}
          width={100}
         
        />
        </div>
      )}
      {info !==undefined && loading == false && (

      <div className="pt-16 md:pt-20 bg-breakbg bg-cover w-full h-1/2 flex justify-between">
       <div className="ml-5 mr-1 lg:ml-10 mt-10">
       <div className="text-2xl lg:text-4xl text-white">
            UI / UX Design Specialization
        </div>
        <div className="mt-5 w-full md:w-3/4  text-white">
            Design High-Impact User Experiences. Research, design, and prototype
            effective, visually-driven websites and apps.
        </div>
        <div className="mt-10 w-full flex md:hidden space-x-3">
        <div className="text-white text-xl">Offered By:</div>
        <div className="text-xl lg:text-7xl text-white">CALARTS{info.pname}</div>
        </div>
        <button
          className="mt-20 md:mt-32 bg-white text-black w-40 py-5 mb-16 rounded-sm text-xl font-bold"
          onClick={paymentpage}
        >
          Enroll Now
        </button>
        </div>
        <div className="mt-10 w-3/4 md:flex md:flex-col md:items-end mr-10 hidden">
          <div >
        <span className="text-white ">Offered By:</span>
        <div className="text-xl lg:text-7xl text-white">CALARTS{info.pname}</div>
        </div>
        </div>
      </div>
      )}
      {info !==undefined && loading == false && (
      <div className="w-full h-0.5 mt-5 border bg-yellow-400"></div>
      )}
      {info !==undefined && loading == false && (
      <div className="bg-white w-full h-full block md:flex md:w-full">
      <div className="m-10 ml-3 md:ml-10  md:w-3/4">
          <div className="text-2xl md:text-4xl text-yellow-500 font-bold">Details</div>
          <div className="w-10 h-1 m-1 bg-yellow-400"></div>
          <div className="mt-5 ml-2 md:ml-10">
            <div className="text-xl">Chapter 1. Wikipedia</div>
            <p className="ml-10 md:ml-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scel
              erisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
              nec congue eget, auctor vitae massa.
            </p>
            <div className="text-xl mt-5">Chapter 2. Wikipedia</div>
            <p className="ml-10 md:ml-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scel
              erisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
              nec congue eget, auctor vitae massa.
            </p>
            <div className="text-xl mt-5">Chapter 3. Wikipedia</div>
            <p className="ml-10 md:ml-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scel
              erisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
              nec congue eget, auctor vitae massa.
            </p>
          </div>         
        </div>
        <div className="ml-3 w-1/4 md:mr-10 md:flex md:flex-col md:items-end">
          <div className="mt-10">
            <div className="text-2xl md:text-4xl text-yellow-500 font-bold">Invigilator</div>
            <div className="w-10 h-1 m-1 bg-yellow-400"></div>
            <div className="text-xl mt-5 ml-10">{info.pname}</div>
          </div>
          <div className="mt-10">
            <div className="text-2xl md:text-4xl text-yellow-500 font-bold">Rating</div>
            <div className="w-10 h-1 m-1 bg-yellow-400"></div>
            <div className="text-xl mt-5 ml-10">Stars</div>
          </div>
        </div>

      </div>
      )}
    </main>
  );
};

export default ProductDetail;
