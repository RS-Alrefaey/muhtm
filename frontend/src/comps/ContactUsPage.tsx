import React, { useState } from 'react';
import MainNavBar from './MainNavBar';
import Title from './Title';
import InputField from './InputField'
import contactImage from './contactImage.png';



function ContactUsPage() {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    // Your logic for submitting data goes here

    // Once submitted successfully, change the state to true
    setIsSubmitted(true);
  };

  return (
    <div className='w-full h-full flex flex-col justify-center items-center font-cursive'>

      <div className="light-blue-bg h-[300px] w-full flex justify-center relative">
        <MainNavBar />
        <div className='w-fit h-fit absolute top-28 left-[850px]  p-10 flex justify-end font-cursive text-right'>
          <Title text={"!تواصل معنا"} size="xl"
            desc={`تواصل معنا ، نحن متواجدون دائمًا و فريقنا متاح دائمًا لمساعدتك`} />
        </div>
      </div>

      <div className='flex justify-center'>
        {!isSubmitted && (
          <div className='flex flex-col justify-center items-center w-4/5 border-2 m-20 p-10 border-blue-950 rounded-lg'>
            <div className='flex mb-5 space-x-10'>
              <div>
                <div className='relative p-2'>
                  <input className='p-2 rounded-xl w-72 border-2 border-blue-950 h-44' />
                  <div className='absolute -top-1 right-5 bg-white'>محتوى الرسالة</div>
                </div>
              </div>

              <div className='flex flex-col justify-center items-center space-y-2 '>
                <InputField placeholder={'الاسم الأول'} fun={(e) => { console.log(e.currentTarget.value) }} />
                <InputField placeholder={'رقم الجوال'} fun={(e) => { console.log(e.currentTarget.value) }} />
                <InputField placeholder={'البريد الإلكتروني '} fun={(e) => { console.log(e.currentTarget.value) }} />
              </div>
            </div>
            <button className='button-prim' onClick={handleSubmit}>أرسل</button>
          </div>
        )}

        {isSubmitted && (
          <div className='flex justify-center space-x-5 items-center w-2/5 border-2 m-20 p-10 border-blue-950 rounded-lg'>
            <div className="image-container w-1/2 pl-4">
              <img src={contactImage} alt="Description of Image" />
            </div>

            <div className=' justify-center items-center space-y-2 text-right'>
              <Title text={"!نشكر تواصلك"} size="xl"
                desc={`سيتواصل معك فريق مهتم خلال ال24 ساعة القادمة`} />
            </div>
          </div>
        )}

      </div>



    </div>
  )
}

export default ContactUsPage