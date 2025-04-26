import React from "react";
import Navbar_dashboard from "./components/Dashboards/Navbar_dashboard";
import Sidebar from "./components/Dashboards/Sidebar";
import Dashboard from "./components/Dashboards/Dashboard";
import User_profile from "./components/Dashboards/User_profile";
import My_account from "./components/Dashboards/My_account";
import Product_listing from "./components/Dashboards/Product_listing";
import Product_view from "./components/Dashboards/Product_view";
import { Route, Routes, useLocation } from "react-router-dom";
import Product_edit from "./components/Dashboards/Product_edit";

function Dashboard_App({ owner, setOwner, producte ,setProducte}) {
  const {
    isUserProfile,
    isMyaccount,
    isProductupload,
    isProductview,
    isProductedit,
  } =
    location.pathname === "/user-profile" &&
    "/my-account" &&
    "/Productupload" &&
    "/Product-view" &&
    "/Products_edit";
  const isDashboard = location.pathname === "/dashboard";
  return (
    <>
      <div>
        <Navbar_dashboard />
      </div>
      <div className="flex h-screen pt-20 overflow-hidden">
        <Sidebar />
        {!isUserProfile ||
          !isMyaccount ||
          isProductupload ||
          isProductview ||
          (isProductedit && isDashboard)}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-profile" element={<User_profile />} />
          <Route path="/my-account" element={<My_account />} />
          <Route
            path="/Productupload"
            element={<Product_listing owner={owner} setOwner={setOwner} />}
          />
          <Route
            path="/Product-view"
            element={<Product_view owner={owner} />}
          />
          <Route path="/Products_edit" element={<Product_edit />} />
        </Routes>
      </div>
    </>
  );
}

export default Dashboard_App;
