import React from 'react'

export type InputFieldProps = {
    type?: string;
    placeholder: string;
    value?: string; // Ensure this line exists
    fun?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
}

function InputField({ type = 'text', placeholder = "text", fun, value, readOnly }: InputFieldProps) {
    return (
        <>
            <div className='relative p-2'>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}  // Make sure this line exists
                    className='p-2 rounded-xl w-64 border-2 border-blue-950'
                    onChange={fun}
                    readOnly={readOnly}

                />
                <div className='absolute -top-1 right-5 bg-white'>{placeholder}</div>
            </div>
        </>
    )
}

export default InputField