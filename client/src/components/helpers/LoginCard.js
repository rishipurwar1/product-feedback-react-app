import React from "react";
import { Link } from "react-router-dom";

const LoginCard = () => {
  return (
    <Link
      to="/auth"
      className="block w-full max-w-4xl rounded-lg mt-5 p-2 bg-primary-dark text-xl text-center text-white font-medium"
    >
      <i className="fas fa-lock"></i> Please Login to write comments!
    </Link>
  );
};

export default LoginCard;
