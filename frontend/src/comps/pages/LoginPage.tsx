import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import formImage from "../images/formsImage.jpg";
import Title from "../Title";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import agent from "../../API/Agent";
import backBtn from "../images/backBtn.png";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "تسجيل الدخول";
  }, []);

  const handleChange = (field: string, value: string) => {
    if (field === "username") {
      setUsername(value);

      if (!value) {
        setFormErrors((prev) => ({
          ...prev,
          username: "فضلاً ادخل اسم المستخدم",
        }));
      } else if (/[^a-zA-Z0-9]/.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          username: "اسم المستخد غير صحيح",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, username: undefined }));
      }
    } else if (field === "password") {
      setPassword(value);

      if (!value) {
        setFormErrors((prev) => ({
          ...prev,
          password: "فضلا ادخل كلمة المرور",
        }));
      } else if (
        value.length < 8 ||
        !/[A-Z]/.test(value) ||
        !/[0-9]/.test(value)
      ) {
        setFormErrors((prev) => ({
          ...prev,
          password: "كلمة المرور غير صحيحة",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, password: undefined }));
      }
    }
  };

  const handleLogin = () => {
    let errors: { username?: string; password?: string } = {};

    if (!username) {
      errors.username = "فضلاً ادخل اسم المستخدم";
    } else if (/[^a-zA-Z0-9]/.test(username)) {
      errors.username = "اسم المستخد غير صحيح";
    }

    if (!password) {
      errors.password = "فضلا ادخل كلمة المرور";
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      errors.password = "كلمة المرور غير صحيحة";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    agent.User.login({ username, password })
      .then((response) => {
        localStorage.setItem("authToken", response.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          if (error.response.data.username) {
            setErrorMessage(error.response.data.username);
          } else if (error.response.data.password) {
            setErrorMessage(error.response.data.password);
          } else {
            setErrorMessage("An unknown error occurred.");
          }
        } else {
          console.error("Failed to login.", error);
        }
      });
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center">
        <div>
          <img
            src={backBtn}
            alt="Description of Image"
            className="w-16 h-16 absolute right-8 top-6 hover:cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>

        <div className="w-full text-right relative right-80 top-5">
          <Title text="مرحباً مجدداً" size="xl" />
        </div>

        <div className="flex flex-nowrap justify-center items-center w-3/5 h-[600px] border-2 border-blue-950 rounded-lg">
          <div className="image-container w-1/2 p-6">
            <img
              className="opacity-50"
              src={formImage}
              alt="Description of Image"
            />
          </div>

          <div className="flex flex-col justify-center items-center space-y-2 m-4 p-2  bg-white rounded-lg ">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <InputField
              placeholder={"مثال: razan"}
              fun={(e) => handleChange("username", e.currentTarget.value)}
              validationError={formErrors.username}
              fieldName="اسم المستخدم"
            />
            <InputField
              placeholder={"مثال: Abed1234"}
              type="password"
              fun={(e) => handleChange("password", e.currentTarget.value)}
              validationError={formErrors.password}
              fieldName="كلمة المرور"
            />
            <button className="button-prim" onClick={handleLogin}>
              تسجيل الدخول
            </button>
            <div>
              <p className="text-gray-500">
                ليس لديك حساب؟ قم{" "}
                <Link to="/signup" className="font-bold light-blue-font">
                  {" "}
                  بتسجيل جديد{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
