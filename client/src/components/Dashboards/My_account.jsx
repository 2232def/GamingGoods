import React from "react";
import My_account_header from "./My_account_header";
import { useState, useEffect } from "react";
import { fetchOwner } from "../../utils/fetchOwner";
import User_profile from "./User_profile";

function My_account() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState(null);
  const [owner, setOwner] = useState(null);
  const [showUserView, setShowUserView] = useState(false);
  const [userInfo, setUserInfo] = useState({
    dp: "",
    username: "",
    biography: "",
    role: "",
    phone: "",
    website: "",
    address: "",
    facebook: "",
    twitter: "",
    linkdin: "",
    instagram: "",
    youtube: "",
  });
  const [submittedData, setSubmittedData] = useState({});

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(
        "http://localhost:8080/images_upload/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("File uploaded successfully");
        setImages(data.image);
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedData(userInfo);
    localStorage.setItem("submittedData", JSON.stringify(userInfo));
    console.log("Submitted data:", userInfo);
  };

  useEffect(() => {
    const fetchLatestImage = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/images_upload/images"
        );
        const data = await response.json();
        if (data.success && data.images && data.images.length > 0) {
          // Assume the latest image is the last one in the returned list
          const latest = data.images[data.images.length - 1];
          setImages(latest);
        }
      } catch (error) {
        console.error("Fetch images error", error);
      }
    };
    fetchLatestImage();

    const getOwner = async () => {
      try {
        const ownerData = await fetchOwner();
        setOwner(ownerData);
      } catch (err) {
        setError(err.message);
      }
      // } finally {
      //   setLoading(false);
      // }
    };

    getOwner();
  }, []);

  return (
    <div className="w-full h-screen transition-all duration-200 ease-in-out sm:p-[20px] p-[9px] overflow-y-scroll scrollbar">
      <My_account_header />
      <div className=" w-full rounded-md bg-red-200 mt-[20px]">
        <div className="edit p-8 flex items-center gap-5 justify-start">
          <a className=" bg-blue-400 p-1 w-19 rounded-md cursor-pointer text-center">
            <span className="text-xl">Edit</span>
          </a>
          <a className=" bg-white p-1  rounded-md cursor-pointer text-center">
            <span className="text-xl">Change Password</span>
          </a>
        </div>
        {images && (
          <div className="bg-white h-36 w-36 ml-6 rounded-[50%]  border-2 ">
            <img
              className="object-cover h-full w-full rounded-[50%]"
              src={`http://localhost:8080/images_upload/image/${images._id}`}
              alt=""
            />
          </div>
        )}
        <form onSubmit={handleUpload}>
          <input
            className="bg-blue-200 w-auto h-auto rounded-md p-1 m-1  hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700"
            type="file"
            onChange={handleFileChange}
          />
          <input
            type="submit"
            value="Upload"
            className="bg-green-400 p-1 w-19 rounded-md cursor-pointer text-center"
          />
        </form>
        <div className="bg-gray-200 mb-20">
          <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Fullname"
              className="p-2 border rounded-md"
              defaultValue={owner ? owner.fullname : ""}
              readOnly
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="p-2 border rounded-md"
              value={userInfo.username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="biography"
              placeholder="Biography"
              className="p-2 border rounded-md"
              value={userInfo.biography}
              onChange={handleChange}
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              className="p-2 border rounded-md"
              value={userInfo.role}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              defaultValue={owner ? owner.email : ""}
              className="p-2 border rounded-md"
              readOnly
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              className="p-2 border rounded-md"
              value={userInfo.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="website"
              placeholder="Website"
              className="p-2 border rounded-md"
              onChange={handleChange}
              value={userInfo.website}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="p-2 border rounded-md"
              onChange={handleChange}
              value={userInfo.address}
            />
            <input
              type="text"
              placeholder="Facebook"
              name="facebook"
              className="p-2 border rounded-md"
              onChange={handleChange}
              value={userInfo.facebook}
            />
            <input
              type="text"
              placeholder="Twitter"
              name="twitter"
              className="p-2 border rounded-md"
              onChange={handleChange}
              value={userInfo.twitter}
            />
            <input
              type="text"
              placeholder="LinkedIn"
              name="linkedin"
              className="p-2 border rounded-md"
              onChange={handleChange}
              value={userInfo.linkdin}
            />
            <input
              type="text"
              placeholder="Instagram"
              name="instagram"
              className="p-2 border rounded-md"
              onChange={handleChange}
              value={userInfo.instagram}
            />
            <input
              type="text"
              placeholder="Youtube"
              name="youtube"
              className="p-2 border rounded-md"
              onChange={handleChange}
              value={userInfo.youtube}
            />
            <input
              type="text"
              placeholder="Pininterest"
              className="p-2 border rounded-md"
              onChange={(e) => {}}
            />
            <button
              type="submit "
              className="p-2 bg-blue-500 text-white rounded-md cursor-pointer"
            >
              Save
            </button>
          </form>
        </div>
      </div>
      {showUserView && <User_profile submittedData={submittedData} />}
    </div>
  );
}

export default My_account;
