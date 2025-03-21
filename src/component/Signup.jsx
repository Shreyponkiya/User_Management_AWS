import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Yup_schema } from "../schema/Yup_schema";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 🔄 Loading state

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleSubmit, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema: Yup_schema,
    onSubmit: async (values) => {
      console.log("Form Submitted:", values);
      setLoading(true); // Start loading
      await handlePostData(values);
      setLoading(false); // Stop loading after signup attempt
    },
  });

  const handlePostData = async (values) => {
    const URL = "https://mmbb1x95lk.execute-api.ap-south-1.amazonaws.com/default/";
    const data = { email: values.email, password: values.password };

    try {
      const response = await axios.post(URL, data);
      console.log("Data sent successfully:", response.data);
      alert("Signup Successful!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error sending data:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4 md:w-1/3 bg-white shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white rounded-lg py-2 px-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"} {/* 🔄 Show loading text */}
          </button>

          <div className="mt-4 text-center">
            <a href="/login" className="text-blue-500">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
