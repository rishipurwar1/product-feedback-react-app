import React from "react";
import { useHistory } from "react-router-dom";

const PageHeader = ({ color = "secondary-dark" }) => {
  const history = useHistory();
  return (
    <button
      onClick={() => history.goBack()}
      className={`text-${color} text-sm font-bold`}
    >
      <i className={`fas fa-angle-left text-${color}`}></i>&nbsp;&nbsp; Go back
    </button>
  );
};

export default PageHeader;
