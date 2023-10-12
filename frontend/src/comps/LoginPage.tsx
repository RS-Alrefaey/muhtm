import React from 'react'
import InputField from './InputField'
import formImage from './formsImage.jpg';
import Title from './Title';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import agent from '../API/Agent';




function Login() {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = () => {
    agent.User.login({ username, password })
      .then(response => {
        localStorage.setItem("authToken", response.token);
        navigate("/dashboard");
      })
      .catch(error => {
        console.error("Failed to login.", error);
      });
  };


  return (
    <>
      <div className='flex flex-col h-screen justify-center items-center'>

        <div className="w-full text-right pr-8">
          <Title text="مرحباً مجدداً" size="xl" />
        </div>

        <div className='flex flex-nowrap justify-center items-center w-3/5 border border-blue-950 rounded-lg'>

          <div className="image-container w-1/2 pl-4 flex justify-center">
            <img src={formImage} alt="Description of Image" />
          </div>

          <div className='flex flex-col justify-center items-center space-y-2 m-4 p-2 bg-white rounded-lg w-1/2 pr-4'>
            <InputField placeholder={'اسم المستخدم'} fun={(e) => { setUsername(e.currentTarget.value) }} />
            <InputField placeholder={'كلمة المرور'} type='password' fun={(e) => { setPassword(e.currentTarget.value) }} />
            <button className='button-prim' onClick={handleLogin}>تسجيل الدخول</button>
            <div>
              <p className='text-gray-500'>ليس لديك حساب؟ قم <Link to="/signup" className= 'font-bold light-blue-font' > بتسجيل جديد </Link></p>
            </div>


          </div>

        </div>
      </div>
    </>
  )
}

export default Login