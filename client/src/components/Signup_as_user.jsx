import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils/toast";
import { ToastContainer } from "react-toastify";

function Signup_as_user({ onClose }) {
  const [signupInfo, setSignupInfo] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const { fullname, email, password } = signupInfo;
    if (!fullname || !email || !password) {
      return handleError("Please fill all fields");
    }
    try {
      const url = "http://localhost:8080/users/register";
      const response = await fetch(url, {
        method: "Post",
        body: JSON.stringify(signupInfo),
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await response.json();
      console.log("Response data:", result);
      console.log("Response status:", response.status);
      if (response.status === 201) {
        handleSuccess("User account created successfully!");
        navigate("/Products");
      } else {
        handleError(
          typeof result === "string" ? result : "Failed to create user account"
        );
      }
    } catch (err) {
      console.error("Error during signup:", err);
      handleError("This Accout already exists");
    }
  };

  return (
    <div className="box-signin h-[65vh] w-[40vw] bg-red-300 rounded-lg p-16">
      <button
        className="absolute top-0 right-0 p-5 cursor-pointer"
        onClick={onClose}
      >
        X
      </button>
      <h1 className="text-3xl">Sign Up</h1>
      <form onSubmit={handleSignup} className="grid gap-5">
        <div>
          <h1 className="text-xl ">Email</h1>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            placeholder="Email"
            className="bg-white"
            value={signupInfo.email}
          />
        </div>
        <div>
          <h1 className="text-xl ">Username</h1>
          <input
            type="text"
            onChange={handleChange}
            name="fullname"
            placeholder="username"
            className="bg-white"
            value={signupInfo.fullname}
          />
        </div>
        <div>
          <h1 className="text-xl ">Password</h1>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            placeholder="password"
            className="bg-white"
            value={signupInfo.password}
          />
        </div>
        <button className="p-5 bg-white h-full ">Register</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default Signup_as_user;
