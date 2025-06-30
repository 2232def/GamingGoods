import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils/toast";
import { ToastContainer } from "react-toastify";

function Login_as_owner({ setOwner }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = "http://localhost:8080/owners/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
        credentials: "include",
      });
      const contentType = response.headers.get("content-type");
      let result;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
      } else {
        result = await response.text();
        console.error("Unexpected response format:", result);
      }

      if (response.ok) {
        setOwner(result);
        handleSuccess("You have successfully logged in!");
        // localStorage.setItem('token',token);
        navigate("/Owner_dashboard/dashboard");
      } else {
        handleError(
          typeof result === "string" ? result : "Failed to login owner account"
        );
      }
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

  return (
    <div className="p-24  bg-red-400">
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label>Email </label>
          <input
            type="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            className="bg-gray-200"
            required
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            className="bg-gray-200"
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" className="bg-blue-200" />
        </div>
      </form>
    </div>
  );
}

export default Login_as_owner;
