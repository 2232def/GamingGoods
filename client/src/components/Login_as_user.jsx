import React from "react";
import { Link } from "react-router-dom";

function Login_as_user() {
  return (
    <div className="flex justify-center h-[100vh] w-[100vw] items-center ">
      <div className="box-signin h-[500px] w-[600px] bg-red-300 rounded-lg p-16">
        <h1 className="text-3xl">Sign Up</h1>
        <form  className="grid gap-5">
          <div>
            <h1 className="text-xl ">Email</h1>
            {/* <input
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Email"
              className="bg-white"
              value={signupInfo.email}
            /> */}
          </div>
          <div>
            {/* <h1 className="text-xl ">Username</h1>
            <input
              type="text"
              onChange={handleChange}
              name="fullname"
              placeholder="username"
              className="bg-white"
              value={signupInfo.fullname}
            /> */}
          </div>
          <div>
            <h1 className="text-xl ">Password</h1>
            {/* <input
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="password"
              className="bg-white"
              value={signupInfo.password}
            /> */}
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
