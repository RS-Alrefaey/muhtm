import React, { useState, useEffect } from "react";
import NavSidebar from "./NavSidebar";
import InputField from "./InputField";
import agent, { UserType } from "../API/Agent";
import editIcon from "./editIcon.png";

function ProfilePage() {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState({
    first_name: "",
    phone_number: "",
    email: "",
    username: "",
    store_link: "",
    password: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await agent.User.profile();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const handleChange = (field: keyof UserType, value: string) => {
    let error = "";
    switch (field) {
      case "first_name":
        error = value.length < 2 ? "الرجاء إدخال اسم صحيح" : "";
        break;
      case "phone_number":
        error = value.length !== 13 ? "الرجاء إدخال 9 ارقام فقط بعد +966" : "";
        break;
      case "email":
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        error = !re.test(value) ? "البريد الإلكتروني غير صحيح" : "";
        break;
      case "store_link":
        try {
          new URL(value);
        } catch (_) {
          error = "الرجاء إدخال رابط صحيح";
        }
        break;
      case "password":
        const pwdRe = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        error = !pwdRe.test(value) ? "الرمز السري يجب ان يحتوي على أحرف كبيرة وأرقام" : "";
        break;
      default:
        break;
    }

    setUserData((prev) => {
        if (prev && field in prev) {
          return { ...prev, [field]: value };
        }
        return prev; 
      });
    
      setFormErrors((prev) => ({ ...prev, [field]: error }));
    };

    const handleUpdate = async () => {
        if (!userData) {
            alert("ليس لديك بيانات لتحديثها.");
            return;
        }
    
        try {
            await agent.User.update(userData);
            setIsEditMode(false);  
            alert("تم تحديث الملف الشخصي بنجاح!"); 
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("حدث خطأ أثناء تحديث الملف الشخصي. يرجى المحاولة مرة أخرى."); 
        }
    };
    

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="dash-bg flex items-center justify-center">
        <div className="content-bg w-3/4 flex flex-col p-5 m-5 mr-20">
          <div className="flex flex-col justify-center items-center m-12">

            <button
              className="relative bottom-18 left-60"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              <img src={editIcon} alt="Edit"></img>
            </button>

            <div>
              <InputField
                placeholder={"الاسم الأول"}
                readOnly={!isEditMode}
                value={userData ? userData.first_name : ""}
                fieldName="الاسم"
                borderColor={isEditMode ? 'border-gray-400' : 'border-blue-950'}
                fun={(e) => handleChange("first_name", e.currentTarget.value)}
                validationError={formErrors.first_name}
              />

              <InputField
                placeholder={"رقم الجوال"}
                readOnly={!isEditMode}
                value={userData ? userData.phone_number : "+966"}
                fieldName="رقم الجوال"
                borderColor={isEditMode ? 'border-gray-400' : 'border-blue-950'}
                fun={(e) => handleChange("phone_number", e.currentTarget.value)}
                validationError={formErrors.phone_number}
              />

              <InputField
                placeholder={"اسم المستخدم"}
                readOnly={!isEditMode}
                value={userData ? userData.username : ""}
                fieldName="اسم المستخدم"
                borderColor={isEditMode ? 'border-gray-400' : 'border-blue-950'}
                fun={(e) => handleChange("username", e.currentTarget.value)}
                validationError={formErrors.username}
              />

              <InputField
                placeholder={"البريد الإلكتروني "}
                readOnly={!isEditMode}
                value={userData ? userData.email : ""}
                fieldName="البريد الإلكتروني"
                borderColor={isEditMode ? 'border-gray-400' : 'border-blue-950'}
                fun={(e) => handleChange("email", e.currentTarget.value)}
                validationError={formErrors.email}
              />

              <InputField
                placeholder={"رابط المتجر الإلكتروني "}
                type="url"
                readOnly={!isEditMode}
                value={userData ? userData.store_link : ""}
                fieldName="رابط المتجر"
                borderColor={isEditMode ? 'border-gray-400' : 'border-blue-950'}
                fun={(e) => handleChange("store_link", e.currentTarget.value)}
                validationError={formErrors.store_link}
              />

              <InputField
                placeholder={"كلمة المرور"}
                type="password"
                readOnly={!isEditMode}
                value={userData ? userData.password : ""}
                fieldName="كلمة المرور"
                borderColor={isEditMode ? 'border-gray-400' : 'border-blue-950'}
                fun={(e) => handleChange("password", e.currentTarget.value)}
                validationError={formErrors.password}
              />
            </div>

            <div className="flex mt-5 space-x-2">
              <button className="button-prim ">إلغاء</button>
              <button className="button-prim" onClick={handleUpdate}>حفظ</button>
            </div>
          </div>
        </div>

        <div className="border-white border-l-2 h-full flex items-center relative bottom-10">
          <NavSidebar />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
