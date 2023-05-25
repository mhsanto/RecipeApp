import React from "react";
import { Login, Register } from "../components/LoginRegister/LoginRegister";
const Auth = () => {
  return (
    <div className="flex">
      <Login />
      <Register />
    </div>
  );
};

export default Auth;
