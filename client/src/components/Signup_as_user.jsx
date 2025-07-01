import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();

  const isSignupUserPage = location.pathname === "/Signup/user";

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

      if (response.ok) {
        const result = await response.json();
        console.log("Response data:", result);
        handleSuccess("user account created successfully!");
        navigate("/Products");
      } else {
        const contentType = response.headers.get("content-type");
        const errorMessage =
          contentType && contentType.includes("application/json")
            ? (await response.json()).message || "Failed to create user account"
            : await response.text();
        handleError(errorMessage);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      handleError("This Accout already exists");
    }
  };

  return (
    <div className="flex justify-center h-[100vh] w-[100vw] items-center ">
      <div className="box-signin h-[500px] w-[600px] bg-red-300 rounded-lg p-16">
        {!isSignupUserPage && (
          <button
            className="absolute top-0 right-0 p-5 cursor-pointer"
            onClick={onClose}
          >
            X
          </button>
        )}
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
          <p className="text-xl space-y-12">
            Already have an account? <Link to="/Login_as_user">Login</Link>
          </p>
          <button className="p-5 bg-white h-full ">Register</button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup_as_user;
