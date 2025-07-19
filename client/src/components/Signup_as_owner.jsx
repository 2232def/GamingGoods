import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils/toast";
import { ToastContainer } from "react-toastify";

function Signup_as_owner({ setOwner }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    fullname: "",
    email: "",
    gstin: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    phoneNumber: "",
    address: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const nextStep = () => {
    if (validateStep()) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!signupInfo.fullname || !signupInfo.email || !signupInfo.phoneNumber) {
          setError("Please fill in all required fields");
          return false;
        }
        break;
      case 2:
        if (!signupInfo.businessName || !signupInfo.gstin || !signupInfo.address) {
          setError("Please fill in all business details");
          return false;
        }
        break;
      case 3:
        if (!signupInfo.password || !signupInfo.confirmPassword) {
          setError("Please enter and confirm your password");
          return false;
        }
        if (signupInfo.password !== signupInfo.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!validateStep()) return;
    
    setLoading(true);
    const { fullname, email, gstin, password } = signupInfo;
    
    try {
      const url = "http://localhost:8080/owners/create";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ fullname, email, gstin, password }),
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
        navigate("/Owner_dashboard/dashboard");
      } else {
        handleError(
          typeof result === "string" ? result : "Failed to create owner account"
        );
      }
    } catch (err) {
      console.error("Error during signup:", err);
      handleError("This Account already exists");
    } finally {
      setLoading(false);
    }
  };

  const renderIllustration = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Business Details</h2>
              <p className="text-gray-600">Tell us about your business</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Secure Your Account</h2>
              <p className="text-gray-600">Create a strong password to protect your account</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  name="fullname"
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  value={signupInfo.fullname}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                  value={signupInfo.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  name="phoneNumber"
                  onChange={handleChange}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your phone number"
                  value={signupInfo.phoneNumber}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Business Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                <input
                  name="businessName"
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your business name"
                  value={signupInfo.businessName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GSTIN Number *</label>
                <input
                  name="gstin"
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter GSTIN number"
                  value={signupInfo.gstin}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
                <textarea
                  name="address"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your business address"
                  value={signupInfo.address}
                  rows="3"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Create Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  value={signupInfo.password}
                />
                <p className="text-sm text-gray-500 mt-1">Password must be at least 6 characters long</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                <input
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                  value={signupInfo.confirmPassword}
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  By creating an account, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      <ToastContainer position="top-right" className="z-50" />
      
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center p-12">
          {renderIllustration()}
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white bg-opacity-10 rounded-full translate-x-24 translate-y-24"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Seller Account</h1>
            <p className="text-gray-600">Start selling on GamingGoods today</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step === currentStep
                        ? "bg-blue-600 text-white"
                        : step < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {step < currentStep ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step < currentStep ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={currentStep === totalSteps ? handleSignup : (e) => e.preventDefault()}>
              {/* Step Content with Animation */}
              <div
                className={`transition-all duration-300 ${
                  isAnimating ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
                }`}
              >
                {renderStepContent()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all ${
                    currentStep === 1 ? "invisible" : ""
                  }`}
                >
                  Previous
                </button>
                
                <div className="flex space-x-4">
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={isAnimating}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || isAnimating}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all flex items-center"
                    >
                      {loading && (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      Create Account
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/Login_as_owner"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup_as_owner;
