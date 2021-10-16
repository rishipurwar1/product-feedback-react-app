import React from "react";
import { useFormContext } from "react-hook-form";

const Input = ({ inputName, readOnly, type, total, bgColor }) => {
  const { register, formState: errors } = useFormContext();
  return (
    <input
      {...(readOnly && { disabled: true, readOnly, value: total })}
      type={type}
      name={inputName}
      id={inputName}
      {...register(inputName, { required: true })}
      className={`w-full bg-${bgColor ? bgColor : "primary-light"} ${
        errors.errors[inputName]?.type === "required"
          ? "focus:outline-none focus:border-red-500"
          : "focus:outline-none focus:border-tertiary-dark"
      } p-3 rounded-md border focus:outline-none border-gray-100 transition text-primary-dark font-bold text-xs`}
    />
  );
};

export default Input;
