import React from "react";

const Label = ({ labelName }) => {
  return (
    <label
      className="text-tertiary-dark block font-medium text-sm pt-5 pb-2"
      htmlFor="streetAddress"
    >
      {labelName}
    </label>
  );
};

export default Label;
