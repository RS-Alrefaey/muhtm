import React, { useState, useEffect } from "react";
import NavSidebar from "./NavSidebar";
import InputField from "./InputField";
import agent, { UserType } from "../API/Agent";
import { Link } from "react-router-dom";


function ProfilePage() {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formUserData, setFormUserData] = useState<UserType | null>(null);

  const [formErrors, setFormErrors] = useState({
    first_name: "",
    phone_number: "",
    email: "",
    username: "",
  });

  const isValidForm = () => {
    return Object.values(formErrors).every((error) => error === "");
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await agent.User.profile();
        setUserData(data);
        setFormUserData(data);
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
      default:
        break;
    }

    setFormUserData((prev) => {
      if (prev && field in prev) {
        return { ...prev, [field]: value };
      }
      return prev;
    });

    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleUpdate = async () => {
    if (isEditMode) {
      if (!userData) {
        alert("ليس لديك بيانات لتحديثها.");
        return;
      }

      try {
        if (formUserData) {
          if (!isValidForm()) {
            alert("الرجاء التأكد من صحة البيانات المدخلة.");
            return;
          }
          await agent.User.update(formUserData);
          alert("تم تحديث الملف الشخصي بنجاح!");
          setUserData(formUserData);
          setIsEditMode(false);
        } else {
          throw new Error("No form data available for update.");
        }
      } catch (error) {
        console.error("Error updating user data:", error);
        alert("حدث خطأ أثناء تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.");
      }
    } else {
      setIsEditMode(true);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormUserData(userData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="dash-bg flex items-center justify-center">
        <div className="content-bg w-3/4 flex flex-col p-5 m-10 justify-center">
          <div className="flex flex-col justify-center items-center m-12">
            <div>
              <InputField
                placeholder={"الاسم الأول"}
                readOnly={!isEditMode}
                value={formUserData ? formUserData.first_name : ""}
                fieldName="الاسم"
                borderColor={isEditMode ? "border-gray-400" : "border-blue-950"}
                fun={(e) => handleChange("first_name", e.currentTarget.value)}
                validationError={formErrors.first_name}
              />

              <InputField
                placeholder={"رقم الجوال"}
                readOnly={!isEditMode}
                value={formUserData ? formUserData.phone_number : "+966"}
                fieldName="رقم الجوال"
                borderColor={isEditMode ? "border-gray-400" : "border-blue-950"}
                fun={(e) => handleChange("phone_number", e.currentTarget.value)}
                validationError={formErrors.phone_number}
              />

              <InputField
                placeholder={"اسم المستخدم"}
                readOnly={!isEditMode}
                value={formUserData ? formUserData.username : ""}
                fieldName="اسم المستخدم"
                borderColor={isEditMode ? "border-gray-400" : "border-blue-950"}
                fun={(e) => handleChange("username", e.currentTarget.value)}
                validationError={formErrors.username}
              />

              <InputField
                placeholder={"البريد الإلكتروني "}
                readOnly={!isEditMode}
                value={formUserData ? formUserData.email : ""}
                fieldName="البريد الإلكتروني"
                borderColor={isEditMode ? "border-gray-400" : "border-blue-950"}
                fun={(e) => handleChange("email", e.currentTarget.value)}
                validationError={formErrors.email}
              />
            </div>

            <div className="flex mt-5 space-x-2">
              <button className="button-prim" onClick={handleUpdate}>
                {isEditMode ? "حفظ" : "تعديل"}
              </button>
              {isEditMode && (
                <button
                  className=" bg-gray-500 rounded-2xl p-1 px-10 text-lg font-semibold text-white"
                  onClick={handleCancel}
                >
                  إلغاء
                </button>
              )}
            </div>
          </div>
          <div className="flex w-full justify-center relative top-14">
            <Link to="/contact">
              <p className="text-blue-950 text-lg hover:text-gray-500">تواصل معنا</p>
            </Link>{" "}
          </div>
        </div>

        <div
          className="divider h-full bg-black relative right-10"
          style={{ width: "1px" }}
        ></div>
        <div className="flex justify-center relative bottom-10 right-5">
          <NavSidebar />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
