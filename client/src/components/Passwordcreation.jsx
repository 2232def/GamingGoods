import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import { Circle } from "rc-progress";


function Signup_as_owner() {
  // const [passwordInfo, setPasswordInfo] = useState({
  //   password: "",
  //   confirmPassword: "",
  // });
  // const [confirmPassword, setConfirmPassword] = useState("");
  

  // const location =  useLocation()
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  // useEffect(() => {
  //   console.log("Location State:", location.state);
  // }, [location.state])
  // const {handleSubmit, handleChange , password} = location.state || {};

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setPasswordInfo({...passwordInfo , [name]: value});
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const { password, confirmPassword } = passwordInfo;
  //   console.log(passwordInfo);
  //   if ((!password, !confirmPassword)) {
  //     return handleError("Please fill  all fields");
  //   }
  //   if (password !== confirmPassword) {
  //     return setError("Passwords do not match");
  //   } else {
  //     setError("");
  //   }
  //   try {
  //     const url = "http://localhost:8080/owners/create";
  //     const response = await fetch(url, {
  //       method: "POST",
  //       body: JSON.stringify(passwordInfo),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const result = await response.json();
  //     const { success, message, error } = result;
  //     if (success) {
  //       handleSuccess(message);
  //     } else if (error) {
  //       const details = error?.details[0].message;
  //       handleError(message);
  //     } else if (!success) {
  //       handleError(message);
  //     }
  //     console.log(result);
  //   } catch (err) {
  //     handleError(err);
  //   }
  // };

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
                <div className="h-1 w-[7vw] bg-gray-400 "> </div>
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
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center pl-10 pt-[2rem]"
            >
              <div className="bg-red-400 h-3 max-w-4 "></div>
              <label className="text-xl space-y-12">
                <input
                  name="password"
                  type="password"
                  className="bg-white p-2 rounded-md w-[32rem]"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleChange}
                />
                {/* <input
                  name="confirmPassword"
                  type="password"
                  className="bg-white p-2 rounded-md w-[32rem]"
                  placeholder="Enter Confirm password"
                  value={passwordInfo.confirmPassword}
                  onChange={(event) =>
                    setPasswordInfo(event.target.value) && handleChange()
                  }
                /> */}
                <button
                  type="submit"
                  className="m-4 p-2 rounded-md cursor-pointer bg-blue-300 h-12"
                >
                  Register & Continue
                </button>
              </label>
              <button
                className="m-4 p-2 rounded-md cursor-pointer bg-blue-300 h-12"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go Back
              </button>
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
