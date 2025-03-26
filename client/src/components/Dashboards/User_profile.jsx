import React from "react";
import User_profile_header from "./User_profile_header";
import { useEffect, useState } from "react";
import { fetchOwner } from "../../utils/fetchOwner";

function User_profile() {
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    // Retrieve the submitted data from localStorage
    const data = localStorage.getItem("submittedData");
    if (data) {
      setSubmittedData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const getOwner = async () => {
      try {
        const ownerData = await fetchOwner();
        setOwner(ownerData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getOwner();
  }, []);
  console.log("submittedData", submittedData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full  h-screen transition-all duration-200 ease-in-out sm:p-[20px] p-[9px] bg-gray-200  overflow-scroll scrollbar">
      <User_profile_header />
      <div className="grid h-screen md:grid-cols-5 grid-cols-1 gap-[20px]">
        <div className="bg-gray-100 h-full col-span-2 rounded-md">
          <div className=" m-12 flex items-center gap-5 justify-start">
            <div className="bg-blue-400 h-36 w-36 rounded-[50%] "></div>
            <div className=" w-64 ">
              {owner ? <h1 className="text-2xl "> {owner.fullname} </h1> : null}
              <h1 className="username">ID</h1>
            </div>
          </div>
          <div className="communication bg-gray-200 m-3 p-4">
            <h1 className="text-xl ">Communication</h1>
          </div>
          <div className="bio bg-gray-200 h-64 m-3 p-4 ">
            <h1 className="text-xl ">Biography</h1>
            <h1>{submittedData.biography}</h1>
          </div>
          <div className="links h-24 m-3 mt-12  p-4">
            <h1 className="text-xl ">Links</h1>
          </div>
        </div>
        <div className=" grid grid-rows-4 col-span-3 gap-[20px]">
          <div className=" grid grid-cols-3 col-span-3 h-[122px]  gap-[20px]">
            <div className="bg-blue-400 rounded-md"></div>
            <div className="bg-blue-400 rounded-md"></div>
            <div className="bg-blue-400 rounded-md"></div>
          </div>
          <div className="bg-gray-400  col-span-3 rounded-md h-full row-span-3"></div>
        </div>
      </div>
      <div className=" h-[100vh] bg-red-400 rounded-md mt-20">
        <div className="p-12">
          <h1 className="">Product published</h1>
        </div>
        <div className="text-[22rem] text-center"> 0</div>
      </div>
    </div>
  );
}

export default User_profile;
