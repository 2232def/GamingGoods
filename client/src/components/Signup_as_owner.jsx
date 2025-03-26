import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import { Circle } from "rc-progress";
import Login_as_owner from "./Login_as_owner";

function Signup_as_owner({setOwner}) {
  const [signupInfo, setSignupInfo] = useState({
    fullname: "",
    email: "",
    gstin: "",
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
    const { fullname, email, gstin, password } = signupInfo;
    if (!fullname || !email || !gstin || !password) {
      return handleError("Please fill all fields");
    }
    try {
      const url = "http://localhost:8080/owners/create";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(signupInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", result);
      setOwner(result);
      if (response.status === 201) {
        handleSuccess("Owner account created successfully!");
        navigate("/Login_as_owner");
      } else {
        handleError(typeof result === 'string' ? result : 'Failed to create owner account');
      }
    } catch (err) {
      console.error("Error during signup:", err);
      handleError("This Accout already exists");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-[60vw] bg-gray-300 rounded-lg">
        <div className=" grid grid-cols-2">
          <div className="h-24 max-w-full bg-gray-400 rounded-lg">
            <h1 className="text-xl text-center p-8 ">Sign Up for consumer</h1>
          </div>
          <div className="h-24 max-w-full bg-gray rounded-lg">
            <h1 className="text-xl text-center p-8">Sign Up as Owner</h1>
          </div>
        </div>
        <div>
          <div className="h-[80vh] bg-gray">
            <div className="w-64 h-32 bg-red-400">
              <div className="flex items-center ">
                <div className="w-[20rem] flex flex-rows items-center circleProgress ">
                  <Circle
                    percent={50}
                    strokeWidth={9}
                    strokeColor="#7FFF09"
                    trailWidth={10}
                    style={{ width: "5rem", height: "3rem" }}
                  />
                  <h1 className="m-3">Email ID and Gstin</h1>
                </div>
                <div className="h-1 w-[7vw] bg-gray-400 "></div>
                <div className="w-[20rem] flex flex-rows items-center circleProgress ">
                  <Circle
                    percent={0}
                    strokeWidth={9}
                    strokeColor="#7FFF09"
                    trailWidth={10}
                    style={{ width: "5rem", height: "3rem" }}
                  />
                  <h1 className="m-3">Password creation</h1>
                </div>
                <div className="h-1 w-[7vw] bg-gray-400 "> </div>
                <div className="w-[20rem] flex flex-rows items-center circleProgress ">
                  <Circle
                    percent={0}
                    strokeWidth={9}
                    strokeColor="#7FFF09"
                    trailWidth={10}
                    style={{ width: "5rem", height: "3rem" }}
                  />
                  <h1 className="m-3">Onboarding Dashboard</h1>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSignup}
              className="flex flex-col items-center justify-center pl-10 pt-[2rem]"
            >
              <div className="bg-red-400 h-3 max-w-4 "></div>
              <label className="text-xl space-y-12">
                <input
                  name="fullname"
                  onChange={handleChange}
                  type="text"
                  className="bg-white p-2 rounded-md w-[32rem]"
                  placeholder="Username"
                  value={signupInfo.fullname}
                />
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  className="bg-white p-2 rounded-md w-[32rem]"
                  placeholder="Email"
                  value={signupInfo.email}
                />
                <input
                  name="gstin"
                  onChange={handleChange}
                  type="text"
                  className="bg-white p-2 rounded-md w-[32rem]"
                  placeholder="Enter gstin"
                  value={signupInfo.gstin}
                />
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  className="bg-white p-2 rounded-md w-[32rem]"
                  placeholder="Enter password"
                  value={signupInfo.password}
                />
                <button
                  type="submit"
                  className="m-4 p-2 rounded-md cursor-pointer bg-blue-300 h-12"
                >
                  Register & Continue
                </button>
                <p className="text-xl space-y-12">
                  Already have an account? <Link to="/Login_as_owner">Login</Link>
                </p>
              </label>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup_as_owner;
