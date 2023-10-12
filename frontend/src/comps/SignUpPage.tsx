
import React, { useState } from 'react';
import InputField from './InputField';
import formImage from './formsImage.jpg';
import Title from './Title';
import agent, { UserType } from '../API/Agent';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import backBtn from './backBtn.png'



function Signup() {
    const [userData, setUserData] = useState<UserType>({
        first_name: '',
        last_name: '',
        phone_number: '',
        username: '',
        email: '',
        store_link: '',
        password: '',
        password2: ''
    });

    // This code defines a function called `Signup`. Inside this function, 
    // it uses the `useState` hook from React to create a state variable called 
    // `userData` and a function called `setUserData` to update this state variable.
    // The initial value of `userData` is an object with properties for `first_name`, 
    // `last_name`, `phone_number`, `username`, `email`, `store_link`, `password`, and 
    // `password2`. These properties are all set to empty strings.
    // The `useState` hook returns an array with two elements: the current value of the 
    // state variable (`userData`) and a function to update this value (`setUserData`).
    // The `useState` hook is a way to add state to functional components in React. It 
    // allows you to store and update data that can be used in the component's render 
    // function and other functions.
    // In this code, the `Signup` function is likely used as part of a form component. 
    // The `userData` state variable is used to store the values entered by the user in 
    // the form fields. The `setUserData` function can be used to update these values when 
    // the user interacts with the form.
    // By using the `useState` hook, the `Signup` function can manage the state of the form 
    // data without needing to use class components or manually handle state updates.

    const navigate = useNavigate();

    const handleChange = (field: keyof UserType, value: string) => {
        setUserData(prev => ({ ...prev, [field]: value }));
    };

    // This code defines a function called handleChange that takes two parameters: 
    // field and value.
    // The field parameter is of type keyof UserType, which means it can only be one 
    // of the keys of the UserType type.
    // The value parameter is of type string, which means it can only be a string.
    // Inside the function, it calls the setUserData function with a callback function 
    // as an argument. The setUserData function is likely a state setter function 
    // provided by a state management library like React's useState hook.
    // The callback function uses the spread operator (...) to create a new object that 
    // copies all the properties from the previous state (prev) of the userData state. 
    // It then sets the value of the field key to the provided value.
    // In other words, this function is used to update a specific field in the userData 
    // state object by providing the field name (field) and the new value (value)

    const handleSubmit = () => {

        if (userData.password !== userData.password2) {
            console.error("Passwords don't match!");
            return;
        }

        agent.User.signup(userData)
            .then(response => {
                console.log('User created:', response);
                navigate('/dashboard'); // Navigate to the dashboard upon successful registration
            })
            .catch(error => {
                console.error('Error during signup:', error);
                // The user will remain on the signup page, so no navigation is required here
            });
    };


    return (
        <>
            <div className='flex flex-col h-fit justify-center items-center '>
                <div>
                    <img src={backBtn} alt="Description of Image" className='w-16 h-16'/>
                </div>
                <div className="w-full text-right pr-8">
                    <Title text="أهلاً وسهلاً " size="xl" />
                </div>
                <div className='flex flex-nowrap justify-center items-center w-3/5 border border-blue-950 rounded-lg'>
                    <div className="image-container w-1/2 pl-4">
                        <img src={formImage} alt="Description of Image" />
                    </div>
                    <div className='flex flex-col justify-center items-center space-y-2 m-4 p-2  bg-white rounded-lg '>
                        <InputField placeholder={'الاسم الأول'} fun={(e) => handleChange('first_name', e.currentTarget.value)} />
                        <InputField placeholder={'الاسم الأخير'} fun={(e) => handleChange('last_name', e.currentTarget.value)} />
                        <InputField placeholder={'رقم الجوال'} fun={(e) => handleChange('phone_number', e.currentTarget.value)} />
                        <InputField placeholder={'اسم المستخدم'} fun={(e) => handleChange('username', e.currentTarget.value)} />
                        <InputField placeholder={'البريد الإلكتروني'} fun={(e) => handleChange('email', e.currentTarget.value)} />
                        <InputField placeholder={'رابط المتجر الإلكتروني'} type='url' fun={(e) => handleChange('store_link', e.currentTarget.value)} />
                        <InputField placeholder={'كلمة المرور'} type='password' fun={(e) => handleChange('password', e.currentTarget.value)} />
                        <InputField placeholder={'تأكيد كلمة المرور'} type='password' fun={(e) => handleChange('password2', e.currentTarget.value)} />
                        <button className='button-prim' onClick={handleSubmit}>سجل الآن</button>
                        <p className='text-gray-500'> لديك حساب من قبل؟ قم <Link to="/login" className='light-blue-font font-bold'> بتسجيل الدخول </Link></p>

                    </div>
                </div>
            </div>
        </>
    );
}
export default Signup;