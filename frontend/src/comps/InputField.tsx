import React from "react";

export type InputFieldProps = {
  type?: string;
  fieldName?: string;
  placeholder: string;
  value?: string;
  fun?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  validationError?: string;
  borderColor?: string;
};

function InputField({
  type = "text",
  fieldName,
  placeholder,
  fun,
  value,
  readOnly,
  borderColor,
  validationError,
}: InputFieldProps) {
  const inputBorderColor = validationError
    ? "border-red-500"
    : borderColor || "border-blue-950";

  return (
    <div className="relative p-2">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={`p-2 rounded-xl w-64 border-2 ${inputBorderColor}`}
        onChange={fun}
        readOnly={readOnly}
      />
      <div className="absolute -top-1 right-5 bg-white">{fieldName}</div>
      {validationError && (
        <p className="text-red-500 mt-1">{validationError}</p>
      )}
    </div>
  );
}

export default InputField;
