import React, { useState } from "react";
import InputField from "./InputField";
import formImage from "./formsImage.jpg";
import Title from "./Title";
import agent, { UserType } from "../API/Agent";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import backBtn from "./backBtn.png";

function Signup() {
  const [formData, setFormData] = useState<UserType>({
    first_name: "",
    phone_number: "+966",
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const [formErrors, setFormErrors] = useState({
    first_name: "",
    phone_number: "",
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const validateFirstName = (name: string) => {
    if (name.length < 2) return "الرجاء إدخال اسم صحيح";
    return "";
  };

  const validatePhoneNumber = (number: string) => {
    if (number.length !== 13) return "الرجاء إدخال 9 ارقام فقط بعد +966";
    return "";
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!re.test(email)) return "البريد الإلكتروني غير صحيح";
    return "";
  };


  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!re.test(password))
      return "الرمز السري يجب ان يحتوي على أحرف كبيرة وأرقام";
    return "";
  };

  const validatePasswordsMatch = (password: string, password2: string) => {
    if (password !== password2) return "كلمة المرور لا تتطابق";
    return "";
  };

  const validateEmptyFields = () => {
    if (!formData.first_name)
      return { field: "first_name", error: "الرجاء إدخال الاسم الكريم" };
      if (!formData.phone_number)
      return { field: "phone_number", error: "الرجاء إدخال رقم الهاتف" };
    
    const phoneError = validatePhoneNumber(formData.phone_number);
    if (phoneError)
      return { field: "phone_number", error: phoneError };
    
    if (!formData.username)
      return { field: "username", error: "الرجاء إدخال اسم مستخدم" };
    if (!formData.email)
      return { field: "email", error: "الرجاء إدخال بريدك الإلكتروني" };
    if (!formData.password)
      return { field: "password", error: "الرجاء إدخال كلمة المرور" };
    if (!formData.password2)
      return {
        field: "password2",
        error: "الرجاء تأكيد كلمة المرور",
      };
    return null;
  };

  const navigate = useNavigate();

  const handleChange = (field: keyof UserType, value: string) => {
    let error = "";
    let updatedValue = value;

    if (field === "username") {
      setErrorMessage(null);
  }
    if (field === "first_name") error = validateFirstName(value);
    if (field === "phone_number") {
      if (!value.startsWith("+966")) {
        updatedValue = "+966" + value.slice(4); 
      }
      error = validatePhoneNumber(updatedValue);
    } else if (field === "email") error = validateEmail(value);
    else if (field === "password") error = validatePassword(value);
    else if (field === "password2") {
      error = validatePasswordsMatch(formData.password, value);
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = () => {
    const emptyFieldError = validateEmptyFields();
    if (emptyFieldError) {
      setFormErrors((prev) => ({
        ...prev,
        [emptyFieldError.field]: emptyFieldError.error,
      }));
      console.error(emptyFieldError.error);
      return;
    }

    if (formData.password !== formData.password2) {
      setFormErrors((prev) => ({
        ...prev,
        password2: "كلمة المرور لا تتطابق",
      }));
      console.error("كلمة المرور لا تتطابق");
      return;
    }

    const hasErrors = Object.values(formErrors).some((error) => error);
    if (hasErrors) {
      console.error("There are form errors!");
      return;
    }



    agent.User.signup(formData)
    .then((response) => {
        console.log("User created:", response);
        localStorage.setItem("authToken", response.token);
        navigate("/dashboard");
        setErrorMessage(null);

    })
    .catch((error) => {
      console.error("Error during signup:", error);
      
      if (error.response && error.response.data && error.response.data.username) {
          setErrorMessage(error.response.data.username[0]);
      } else {
          setErrorMessage("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
      }
    });
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center ">
        <div>
          <img
            src={backBtn}
            alt="Description of Image"
            className="w-16 h-16 absolute right-8 top-6 hover:cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="w-full text-right relative right-80 top-5">
          <Title text="أهلاً وسهلاً " size="xl" />
        </div>
        <div className="flex flex-nowrap justify-center items-center w-3/5 h-[600px] border-2 border-blue-950 rounded-lg">
          <div className="image-container w-1/2 p-6">
            <img
              src={formImage}
              alt="Description of Image"
              className="opacity-50"
            />
          </div>
          <div className="flex flex-col justify-center items-center space-y-2 m-4 p-2  bg-white rounded-lg ">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <InputField
              placeholder={"الاسم"}
              fun={(e) => handleChange("first_name", e.currentTarget.value)}
              validationError={formErrors.first_name}
              fieldName="الاسم"
            />

            <InputField
              placeholder={"رقم الجوال"}
              value={formData.phone_number}
              fun={(e) => handleChange("phone_number", e.currentTarget.value)}
              validationError={formErrors.phone_number}
              fieldName="رقم الجوال"
            />

            <InputField
              placeholder={"اسم المستخدم"}
              fun={(e) => handleChange("username", e.currentTarget.value)}
              validationError={formErrors.username}
              fieldName="اسم المستخدم"
            />

            <InputField
              placeholder={"البريد الإلكتروني"}
              fun={(e) => handleChange("email", e.currentTarget.value)}
              validationError={formErrors.email}
              fieldName="البريد الإلكتروني"
            />

            <InputField
              placeholder={"كلمة المرور"}
              type="password"
              fun={(e) => handleChange("password", e.currentTarget.value)}
              validationError={formErrors.password}
              fieldName="كلمة المرور"
            />

            <InputField
              placeholder={"تأكيد كلمة المرور"}
              type="password"
              fun={(e) => handleChange("password2", e.currentTarget.value)}
              validationError={formErrors.password2}
              fieldName="تأكيد كلمة المرور"
            />
            <button className="button-prim" onClick={handleSubmit}>
              سجل الآن
            </button>
            <p className="text-gray-500">
              {" "}
              لديك حساب من قبل؟ قم{" "}
              <Link to="/login" className="light-blue-font font-bold">
                {" "}
                بتسجيل الدخول{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
