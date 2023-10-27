import React, { useEffect, useState } from "react";
import MainNavBar from "../MainNavBar";
import Title from "../Title";
import InputField from "../InputField";
import contactImage from "../images/contactImage.png";
import agent, { ContactType } from "../../API/Agent";

function ContactUsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formUserData, setFormUserData] = useState({
    name: "",
    phone_number: "+966",
    email: "",
    msg_content: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone_number: "",
    email: "",
    msg_content: "",
  });

  useEffect(() => {
    document.title = "تواصل معنا";
  }, []);

  const validateField = (field: keyof ContactType, value: string): string => {
    let error = "";
    switch (field) {
      case "name":
        error = value.length < 2 ? "الرجاء إدخال اسم صحيح" : "";
        break;
      case "phone_number":
        error = value.length !== 13 ? "الرجاء إدخال 9 ارقام فقط بعد +966" : "";
        break;
      case "email":
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        error = !re.test(value) ? "البريد الإلكتروني غير صحيح" : "";
        break;
      case "msg_content":
        error = !value.trim() ? "الرجاء إدخال محتوى الرسالة" : "";
        break;

      default:
        break;
    }
    return error;
  };

  const handleChange = (field: keyof ContactType, value: string) => {
    const error = validateField(field, value);

    setFormUserData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [field]: error,
    }));
  };

  const handleSubmit = async () => {
    const errors = {
      name: formUserData.name.length < 2 ? "الرجاء إدخال اسم صحيح" : "",
      phone_number:
        formUserData.phone_number.length !== 13
          ? "الرجاء إدخال 9 ارقام فقط بعد +966"
          : "",
      email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
        formUserData.email.trim()
      )
        ? ""
        : "البريد الإلكتروني غير صحيح",
      msg_content: !formUserData.msg_content.trim()
        ? "الرجاء إدخال محتوى الرسالة"
        : "",
    };

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (!hasErrors) {
      try {
        const contactData: ContactType = {
          name: formUserData.name,
          phone_number: formUserData.phone_number,
          email: formUserData.email,
          msg_content: formUserData.msg_content,
        };

        await agent.User.contact(contactData);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting contact data:", error);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center font-cursive">
      <div className="light-blue-bg h-[300px] w-full flex justify-center relative">
        <MainNavBar />
        <div className="w-fit h-fit absolute top-28 left-[850px] p-10 flex justify-end font-cursive text-right">
          <Title
            text={"!تواصل معنا"}
            size="xl"
            desc={`تواصل معنا ، نحن متواجدون دائمًا و فريقنا متاح دائمًا لمساعدتك`}
          />
        </div>
      </div>

      <div className="flex justify-center">
        {!isSubmitted && (
          <div className="flex flex-col justify-center items-center w-[800px] h-[350px] border-2 m-20 p-10 border-blue-950 rounded-lg">
            <div className="flex mb-5 space-x-10">
              <div>
                <div className="relative p-2">
                  <input
                    className="p-2 rounded-xl w-72 border-2 border-blue-950 h-44"
                    value={formUserData.msg_content}
                    onChange={(e) =>
                      handleChange("msg_content", e.currentTarget.value)
                    }
                  />
                  <div className="absolute -top-1 right-5 bg-white">
                    محتوى الرسالة
                  </div>
                  {formErrors.msg_content && (
                    <p className="text-red-500 mt-2">
                      {formErrors.msg_content}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center items-center space-y-2 ">
                <InputField
                  placeholder={"مثال: ريم ناصر"}
                  fieldName="الاسم"
                  fun={(e) => handleChange("name", e.currentTarget.value)}
                  validationError={formErrors.name}
                />
                <InputField
                  fieldName="رقم الجوال"
                  placeholder={"رقم الجوال"}
                  fun={(e) =>
                    handleChange("phone_number", e.currentTarget.value)
                  }
                  validationError={formErrors.phone_number}
                  value={formUserData.phone_number}
                />
                <InputField
                  fieldName="البريد الإلكتروني"
                  placeholder={"مثال: reem1@gmail.com"}
                  fun={(e) => handleChange("email", e.currentTarget.value)}
                  validationError={formErrors.email}
                />
              </div>
            </div>
            <button className="button-prim" onClick={handleSubmit}>
              أرسل
            </button>
          </div>
        )}

        {isSubmitted && (
          <div className="flex justify-center space-x-5 items-center w-[800px] h-[350px] border-2 m-20 p-10 border-blue-950 rounded-lg">
            <div className="image-container w-1/2 pl-4">
              <img
                src={contactImage}
                alt="Description of Image"
                className="opacity-60"
              />
            </div>

            <div className="justify-center items-center space-y-2 text-right">
              <Title
                text={"!نشكر تواصلك"}
                size="xl"
                desc={`سيتواصل معك فريق مهتم خلال ال24 ساعة القادمة`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactUsPage;
