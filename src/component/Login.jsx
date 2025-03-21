import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Yup_schema } from "../schema/Yup_schema";

const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 🔄 Loading state

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect if already logged in
    }
  }, [isAuthenticated, navigate]);

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
      await loginUser(values);
      setLoading(false); // Stop loading after login attempt
    },
  });

  const loginUser = async (values) => {
    const URL =
      "https://uuzhwh7340.execute-api.ap-south-1.amazonaws.com/default/login-UserAuthFunction";
    const data = { email: values.email, password: values.password };

    try {
      const response = await axios.post(URL, data);
      const responseBody = JSON.parse(response.data.body);

      if (!responseBody.token) {
        alert("Login failed: No token received");
        return;
      }

      localStorage.setItem("token", responseBody.token);
      alert("Login Successful!");
      navigate("/");
      document.location.reload();
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4 md:w-1/3 bg-white rounded-lg p-8 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
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
            {loading ? "Logging in..." : "Login"} {/* 🔄 Show loading text */}
          </button>

          <div className="mt-4 text-center">
            <a href="/signup" className="text-blue-500">
              Don't have an account? Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
