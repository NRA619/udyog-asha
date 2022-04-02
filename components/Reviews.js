import Review from "./Review";
import Image from "next/image";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

export default function Reviews() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    swipeToSlide: true,
  };
  var settings1 = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    swipeToSlide: true,
  };
  // grid md:grid-cols-2 gap-4
  return (
    <>
      <div className="p-4 text-md">
        <span className="block text-2xl font-bold text-">Success stories</span>
        <span className="w-12 mb-10  mt-2 block h-1 rounded bg-black"></span>

        <div className="hidden md:block">
          <Slider {...settings}>
            <div className="h-96 flex justify-center items-center">
              <div className="mx-2 h-96 bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex justify-between items-center w-full text-white space-x-14 p-4">
                  <span className="flex space-y-4 flex-col">
                    <Image
                      src="/ss1.png"
                      height={1200}
                      width={1200}
                      className="rounded-full"
                    ></Image>
                    <span className="pb-2 font-bold text-sm underline">
                      Mr. Sachin liman
                    </span>
                    <Image
                      src="/ss2.png"
                      height={1000}
                      width={1200}
                      className=""
                    ></Image>
                    <span className="text-sm justify-center">साले धनकवड</span>
                    <span className="text-sm">धनकवडी, पुणे.</span>
                  </span>
                  <span className="text-center">
                    नमस्कार मी सचिन लिमण धनकवडी , पुणे येथे सार्थक गृह उद्योग,
                    सार्थक मसाले या नावाने मी व्यवसाय करीत आहे. या व्यवसायात
                    सुरू करीत असताना या उद्योगातील सर्वात महत्वाची बाब होती ती,
                    नॅचरल मसाले उत्पादनाची त्याची तंत्रशुद्ध माहीती असणे आवश्यक
                    होते. ती माहीती घेत असता मला महाराष्ट्र मुक्त व्यवसाय
                    प्रशिक्षण केंद्र पुणे व श्री प्रविण शिंदे सर यांच्या विषयी
                    माहीती मिळाली. सदर प्रशिक्षण पुर्ण केल्यानंतर या प्रशिक्षणात
                    मिळालेली माहीती विविध मसाले सार्थक मसाले तयार करण्याची
                    पद्धती याचा प्रत्यक्ष उत्पादन तयार करताना खुप मोलाचे ठरले आज
                    सार्थक गृह उद्योग सार्थक मसाले या व्यवसायाची वाचाल करीत
                    असताना मा. प्रविण शिंदे सर यांचे मार्गदर्शन मिळत आहे. सार्थक
                  </span>
                </div>
              </div>
            </div>
            <div className="h-96 flex justify-center items-center">
              <div className="mx-2 h-96 bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex justify-between items-center w-full text-white space-x-14 p-4">
                  <span className="flex space-y-4 flex-col">
                    <Image
                      src="/ss3.png"
                      height={900}
                      width={920}
                      className="rounded-full"
                    ></Image>
                    <span className="pb-2 font-bold text-xs underline">
                      Mr. VINAYAK SADASHIV KULKARRNI
                    </span>
                    <Image
                      src="/ss4.png"
                      height={600}
                      width={900}
                      className=""
                    ></Image>
                    <span className="text-xs justify-center">तेजय मसाले</span>
                    <span className="text-xs">संगमनेर ,अहमदनगर</span>
                  </span>
                  <span className="text-center">
                    नमस्कार मी विनायक कुलकर्णी संगमनेर जिल्हा अहमदनगर मी प्रवीण
                    शिंदे सरांचे मनापासून आभार मानतो सरांमुळे मी माझा व्यवसाय
                    सुरू करू शकलो सरांच्या मार्गदर्शनामुळे व्यवसायामधील खाचखळगे
                    कळाले पॅकेजिंग लेबलिंग बँडिंग मशनरी फूड लायसन त्यांची सखोल
                    माहिती मिळाली विविध कंपन्यांना भेटी दिल्या त्यामुळे मी माझा
                    व्यवसाय चांगल्या रीतीने सुरू करू शकलो त्याबद्दल प्रवीण शिंदे
                    सरांचे व उद्योग आशा चे आभार मानतो
                  </span>
                </div>
              </div>
            </div>
            <div className="h-96 flex justify-center items-center">
              <div className="mx-2 h-96 bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex justify-between items-center w-full text-white space-x-14 p-4">
                  <span className="flex space-y-4 flex-col">
                    <Image
                      src="/ss5.png"
                      height={1000}
                      width={1000}
                      className="rounded-full"
                    ></Image>
                    <span className="font-bold text-sm underline">
                      Sneha Abhyankar
                    </span>
                    <span className="text-sm">अभ्यंकर्स मनोभावना फुड्स</span>
                    <span className="text-sm">नवी पेठ, पुणे.</span>
                  </span>
                  <span className="text-center">
                    नमस्कार मी स्नेहा अभ्यंकर अभ्यंकर स मनोभावना फुड्स नवी पेठ
                    पुणे येथे पाच वर्षापासून मी चालवत आहे मी व माझे मिस्टर
                    व्यवस्थित रित्या आम्ही मेस चालवत आहोत व इतर हि पदार्थ आम्ही
                    बनवतो आहे महत्वाचे म्हणजे सरांकडे केलेल्या व्यवसाय प्रशिक्षण
                    कार्यक्रमाचे मला माझा व्यवसाय सुरू करण्यासाठी खूप उपयोग
                    झाला, येणाऱ्या अडचणी प्रशिक्षण मुळे अगोदरच माहीत असल्यामुळे
                    फारसे अवघड वाटले नाही नवीन वाटचाली साठी शिंदे सरांना खूप खूप
                    शुभेच्छा व आभार
                  </span>
                </div>
              </div>
            </div>
            <div className="h-96 flex justify-center items-center">
              <div className="mx-2 h-96 bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex justify-between items-center w-full text-white space-x-14 p-4">
                  <span className="flex w-full flex-col">
                    <Image
                      src="/ss6.png"
                      height={200}
                      width={800}
                      className="rounded-sm "
                    ></Image>
                    <span className="pb-2 pt-5 font-bold text-sm underline">
                      Name :- Pradnya Rasane
                    </span>
                    <span className="pb-2  text-sm ">
                      Company name :- Cherrish Enterprises
                    </span>
                    <span className="pb-2  text-sm ">Brand Name - Prinsta</span>

                    <span className="pb-2  text-sm ">
                      Location :- Nanded Phata
                    </span>
                    <span className="pb-2  text-sm ">
                      Pune Type of Business :- Ready to Cook and Ready to Eat
                      Products
                    </span>
                  </span>
                  <span className="text-center">
                    Its been three years, I am part of this Institute. Attended
                    various courses with Pravin Shinde sir. I could make my
                    success Prinsto journey upto here due to timely support and
                    advice by Shinde Sir.
                  </span>
                </div>
              </div>
            </div>
            <div className="h-96 flex justify-center items-center">
              <div className="mx-2 h-96 bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex justify-between items-center w-full text-white space-x-14 p-4">
                  <span className="flex space-y-4 flex-col w-1/2">
                    <Image
                      src="/ss7.png"
                      height={130}
                      width={40}
                      className="rounded-full"
                    ></Image>
                    <span className="font-bold text-sm underline">
                      Sujata Sanjay Oak.
                    </span>
                    <span className="text-sm">Soapy oaks</span>
                    <span className="text-sm">Palgad, Dapoli</span>
                    <span className="text-sm">Small scale industries</span>
                  </span>
                  <span className="text-center">
                    In this institute, the prize of the training program is
                    adorable and the quality of training is also good.
                  </span>
                </div>
              </div>
            </div>
            <div className="h-96 flex justify-center items-center">
              <div className="mx-2 h-96 bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex justify-between items-center w-full text-white space-x-14 p-4">
                  <span className="flex space-y-4 flex-col">
                    <Image
                      src="/ss8.png"
                      height={400}
                      width={400}
                      className="rounded-full"
                    ></Image>
                    <span className="font-bold text-sm underline">
                      नेहा फूड्स
                    </span>
                    <span className="text-sm">करतात.धन्यवाद</span>
                    <span className="text-sm">संगमनेर फूड प्रॉडक्ट्स</span>
                  </span>
                  <span className="text-center">
                    मी मा. प्रवीण शिंदे सर यांच्या कडून मी 2006 मध्ये फूड
                    प्रशिक्षण घेऊन मी 2007 मध्ये माझा गृह उद्योग सुरू केला आणि
                    जून 2021 मध्ये पुन्हा प्री मिक्सइंग चे प्रशिक्षण घेतले.सर
                    अंत्यत तळमळीने शिकवतात व वेळोवेळी मार्गदर्शन
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
                <Image src = "https://i.postimg.cc/cLK9Ckmd/ss1.jpg" height={250} width={200}></Image>

            </div>

        </div>
        <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
                <Image src = "https://i.postimg.cc/vZtBgyvs/ss2.jpg" height={250} width={200}></Image>

            </div>
            </div>
            <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
                <Image src = "https://i.postimg.cc/pLvFmqzg/ss3.jpg" height={250} width={200}></Image>

            </div>
            </div>
            <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
                <Image src = "https://i.postimg.cc/W4WFfVCv/ss6.jpg" height={250} width={200}></Image>

            </div>
            </div>
        
                {/* <Review />
                <Review />
    */}
          </Slider>
        </div>
        <div className="block md:hidden">
          <Slider {...settings1}>
            <div className="h-full flex justify-center items-center">
              <div className="mx-2 h-full bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex flex-col justify-between items-center  text-white p-4">
                  <span className="flex space-y-4 flex-col">
                    <div className="w-full flex space-x-6">
                      <div className="object-contain w-24 h-24 ">
                        <Image
                          src="/ss1.png"
                          height={100}
                          width={100}
                          className="rounded-full "
                        ></Image>
                      </div>
                      <span className="pb-2 flex flex-col">
                        <span className="pb-2 font-bold text-sm underline">
                          Mr. Sachin liman
                        </span>
                        <span className="text-sm justify-center">
                          साले धनकवड
                        </span>
                        <span className="text-sm">धनकवडी, पुणे.</span>
                        <div className="object-contain  h-4 flex justify-center w-4">
                          <Image
                            src="/ss2.png"
                            height={100}
                            width={100}
                            className=""
                          ></Image>
                        </div>
                      </span>
                    </div>
                  </span>
                  <span className="text-center">
                    नमस्कार मी सचिन लिमण धनकवडी , पुणे येथे सार्थक गृह उद्योग,
                    सार्थक मसाले या नावाने मी व्यवसाय करीत आहे. या व्यवसायात
                    सुरू करीत असताना या उद्योगातील सर्वात महत्वाची बाब होती ती,
                    नॅचरल मसाले उत्पादनाची त्याची तंत्रशुद्ध माहीती असणे आवश्यक
                    होते. ती माहीती घेत असता मला महाराष्ट्र मुक्त व्यवसाय
                    प्रशिक्षण केंद्र पुणे व श्री प्रविण शिंदे सर यांच्या विषयी
                    माहीती मिळाली. सदर प्रशिक्षण पुर्ण केल्यानंतर या प्रशिक्षणात
                    मिळालेली माहीती विविध मसाले सार्थक मसाले तयार करण्याची
                    पद्धती याचा प्रत्यक्ष उत्पादन तयार करताना खुप मोलाचे ठरले आज
                    सार्थक गृह उद्योग सार्थक मसाले या व्यवसायाची वाचाल करीत
                    असताना मा. प्रविण शिंदे सर यांचे मार्गदर्शन मिळत आहे. सार्थक
                  </span>
                </div>
              </div>
            </div>
            <div className="h-full flex justify-center items-center">
              <div className="mx-2 h-full bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex flex-col justify-between items-center  text-white p-4">
                  <span className="flex space-y-4 flex-col">
                    <div className="w-full flex space-x-6">
                      <div className="object-contain w-24 h-24 ">
                        <Image
                          src="/ss3.png"
                          height={900}
                          width={920}
                          className="rounded-full"
                        ></Image>
                      </div>
                      <span className="pb-2 flex flex-col">
                        <span className="pb-2 font-bold text-sm underline">
                          Mr. VINAYAK SADASHIV KULKARRNI
                        </span>
                        <div className="object-contain  h-4 flex justify-center w-4">
                          <Image
                            src="/ss4.png"
                            height={100}
                            width={100}
                            className=""
                          ></Image>
                        </div>
                        <span className="text-sm justify-center">
                          तेजय मसाले
                        </span>
                        <span className="text-sm">संगमनेर ,अहमदनगर</span>
                      </span>
                    </div>
                  </span>

                  <span className="text-center">
                    नमस्कार मी विनायक कुलकर्णी संगमनेर जिल्हा अहमदनगर मी प्रवीण
                    शिंदे सरांचे मनापासून आभार मानतो सरांमुळे मी माझा व्यवसाय
                    सुरू करू शकलो सरांच्या मार्गदर्शनामुळे व्यवसायामधील खाचखळगे
                    कळाले पॅकेजिंग लेबलिंग बँडिंग मशनरी फूड लायसन त्यांची सखोल
                    माहिती मिळाली विविध कंपन्यांना भेटी दिल्या त्यामुळे मी माझा
                    व्यवसाय चांगल्या रीतीने सुरू करू शकलो त्याबद्दल प्रवीण शिंदे
                    सरांचे व उद्योग आशा चे आभार मानतो
                  </span>
                </div>
              </div>
            </div>
            <div className="h-full flex justify-center items-center">
              <div className="mx-2 h-full bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex flex-col justify-between items-center  text-white p-4">
                  <span className="flex space-y-4 flex-col">
                    <div className="w-full flex space-x-6">
                      <div className="object-contain w-24 h-24 ">
                        <Image
                          src="/ss5.png"
                          height={1000}
                          width={1000}
                          className="rounded-full"
                        ></Image>
                      </div>
                      <span className="pb-2 flex flex-col">
                        <span className="font-bold text-sm underline">
                          Sneha Abhyankar
                        </span>
                        <span className="text-sm">
                          अभ्यंकर्स मनोभावना फुड्स
                        </span>
                        <span className="text-sm">नवी पेठ, पुणे.</span>
                      </span>
                    </div>
                  </span>
                  <span className="text-center">
                    नमस्कार मी स्नेहा अभ्यंकर अभ्यंकर स मनोभावना फुड्स नवी पेठ
                    पुणे येथे पाच वर्षापासून मी चालवत आहे मी व माझे मिस्टर
                    व्यवस्थित रित्या आम्ही मेस चालवत आहोत व इतर हि पदार्थ आम्ही
                    बनवतो आहे महत्वाचे म्हणजे सरांकडे केलेल्या व्यवसाय प्रशिक्षण
                    कार्यक्रमाचे मला माझा व्यवसाय सुरू करण्यासाठी खूप उपयोग
                    झाला, येणाऱ्या अडचणी प्रशिक्षण मुळे अगोदरच माहीत असल्यामुळे
                    फारसे अवघड वाटले नाही नवीन वाटचाली साठी शिंदे सरांना खूप खूप
                    शुभेच्छा व आभार
                  </span>
                </div>
              </div>
            </div>
            <div className="h-full flex justify-center items-center">
              <div className="mx-2 h-full bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex flex-col justify-between items-center  text-white p-4">
                  <span className="flex w-full flex-col">
                    <div className="w-full flex space-x-6">
                      <div className="object-contain w-24 h-24 ">
                        <Image
                          src="/ss6.png"
                          height={200}
                          width={800}
                          className="rounded-sm "
                        ></Image>
                      </div>
                      <span className="pb-2 flex flex-col">
                        <span className="pb-2 pt-5 font-bold text-sm underline">
                          Name :- Pradnya Rasane
                        </span>
                        <span className="pb-2  text-sm ">
                          Company name :- Cherrish Enterprises
                        </span>
                        <span className="pb-2  text-sm ">
                          Brand Name - Prinsta
                        </span>

                        <span className="pb-2  text-sm ">
                          Location :- Nanded Phata
                        </span>
                        <span className="pb-2  text-sm ">
                          Pune Type of Business :- Ready to Cook and Ready to
                          Eat Products
                        </span>
                      </span>
                    </div>
                  </span>
                  <span className="text-center">
                    Its been three years, I am part of this Institute. Attended
                    various courses with Pravin Shinde sir. I could make my
                    success Prinsto journey upto here due to timely support and
                    advice by Shinde Sir.
                  </span>
                </div>
              </div>
            </div>
            <div className="h-full flex justify-center items-center">
              <div className="mx-2 h-full bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex flex-col justify-between items-center  text-white p-4">
                  <span className="flex space-y-4 flex-col">
                    <div className="w-full flex space-x-6 ">
                      <div className="object-contain w-24 h-24 ">
                        <Image
                          src="/ss7.png"
                          height={100}
                          width={100}
                          className="rounded-full"
                        ></Image>
                      </div>
                      <span className="pb-2 flex flex-col">
                        <span className="font-bold text-sm underline">
                          Sujata Sanjay Oak.
                        </span>
                        <span className="text-sm">Soapy oaks</span>
                        <span className="text-sm">Palgad, Dapoli</span>
                        <span className="text-sm">Small scale industries</span>
                      </span>
                    </div>
                  </span>
                  <span className="text-center mt-10">
                    In this institute, the prize of the training program is
                    adorable and the quality of training is also good.
                  </span>
                </div>
              </div>
            </div>
            <div className="h-full flex justify-center items-center">
              <div className="mx-2 h-full bg-gray-900 rounded-md shadow-sm y p-2 ">
                <div className="flex flex-col justify-between items-center  text-white p-4">
                  <span className="flex space-y-4 flex-col">
                  <div className="w-full flex space-x-6 ">
                      <div className="object-contain w-24 h-24 ">
                    <Image
                      src="/ss8.png"
                      height={400}
                      width={400}
                      className="rounded-full"
                    ></Image>
                    </div>
                    <span className="pb-2 flex flex-col">
                    <span className="font-bold text-sm underline">
                      नेहा फूड्स
                    </span>
                    <span className="text-sm">करतात.धन्यवाद</span>
                    <span className="text-sm">संगमनेर फूड प्रॉडक्ट्स</span>
                    </span>
                    </div>
                  </span>
                  <span className="text-center mt-10">
                    मी मा. प्रवीण शिंदे सर यांच्या कडून मी 2006 मध्ये फूड
                    प्रशिक्षण घेऊन मी 2007 मध्ये माझा गृह उद्योग सुरू केला आणि
                    जून 2021 मध्ये पुन्हा प्री मिक्सइंग चे प्रशिक्षण घेतले.सर
                    अंत्यत तळमळीने शिकवतात व वेळोवेळी मार्गदर्शन
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
                <Image src = "https://i.postimg.cc/cLK9Ckmd/ss1.jpg" height={250} width={200}></Image>

            </div>

        </div>
        <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
                <Image src = "https://i.postimg.cc/vZtBgyvs/ss2.jpg" height={250} width={200}></Image>

            </div>
            </div>
            <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
                <Image src = "https://i.postimg.cc/pLvFmqzg/ss3.jpg" height={250} width={200}></Image>

            </div>
            </div>
            <div className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-2">
                <Image src = "https://i.postimg.cc/W4WFfVCv/ss6.jpg" height={250} width={200}></Image>

            </div>
            </div>
        
                {/* <Review />
                <Review />
    */}
          </Slider>
        </div>
      </div>
    </>
  );
}
