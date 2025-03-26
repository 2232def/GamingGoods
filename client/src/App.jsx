import { React, useState } from "react";
import "./App.css";
import Home from "./Home";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Signup_as_owner from "./components/Signup_as_owner";
import Dashboard_App from "./Dashboard_App";
import News_letter from "./components/newsletters/News_letter";
import Login_as_owner from "./components/Login_as_owner";

function App() {
  const location = useLocation();
  const [owner, setOwner] = useState(null);

  return (
    <>
      <div className="">
        {location.pathname !== "/Signup" &&
          !location.pathname.startsWith("/Owner_dashboard") &&
          location.pathname !== "/Login_as_owner" &&
          location.pathname !== "/Newsletters" && <Navbar />}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route
            path="/Signup"
            element={<Signup_as_owner setOwner={setOwner} />}
          />
          <Route
            path="/Owner_dashboard/*"
            element={<Dashboard_App owner={owner} setOwner={setOwner} />}
          />
          <Route
            path="/Login_as_owner"
            element={<Login_as_owner setOwner={setOwner} />}
          />
          <Route path="/Newsletters" element={<News_letter />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
