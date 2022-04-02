import Review from "./Review";
import Image from "next/image";

export default function Reviews() {
  return (
    <>
      <div className="p-4 text-md">
        <span className="block text-2xl font-bold text-">Success stories</span>
        <span className="w-12 mt-2 block h-1 mb-2 rounded bg-black"></span>

        <div className="mt-4 bg-blue-500  md:p-16 p-8 shadow-xl rounded-lg grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
              <Image
                src="https://i.postimg.cc/cLK9Ckmd/ss1.jpg"
                height={250}
                width={200}
              ></Image>
            </div>
          </div>
          <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
              <Image
                src="https://i.postimg.cc/vZtBgyvs/ss2.jpg"
                height={250}
                width={200}
              ></Image>
            </div>
          </div>
          <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
              <Image
                src="https://i.postimg.cc/pLvFmqzg/ss3.jpg"
                height={250}
                width={200}
              ></Image>
            </div>
          </div>
          <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
              <Image
                src="https://i.postimg.cc/W4WFfVCv/ss6.jpg"
                height={250}
                width={200}
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
