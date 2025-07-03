import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils/toast";

function Login_as_user() {

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
      const url = "http://localhost:8080/users/login";
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
        handleSuccess("You have successfully logged in!");
        // localStorage.setItem('token',token);
        navigate("/Products");
      } else {
        handleError(
          typeof result === "string" ? result : "Failed to login user account"
        );
      }
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };


  return (
    <div className="flex justify-center h-[100vh] w-[100vw] items-center ">
      <div className="box-signin h-[500px] w-[600px] bg-red-300 rounded-lg p-16">
        <h1 className="text-3xl">Login</h1>
        <form onSubmit={handleLogin} className="grid gap-5">
          <div>
            <h1 className="text-xl ">Email</h1>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Email"
              className="bg-white"
              value={loginInfo.email}
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
              value={loginInfo.password}
            />
          </div>
          <p className="text-xl space-y-12">
            Already have an account? <Link to="/Signup/user">Signup</Link>
          </p>
          <button className="p-5 bg-white h-full ">Register</button>
          {/* {error && <p className="text-red-500">{error}</p>} */}
        </form>
      </div>
    </div>
  );
}

export default Login_as_user;
