import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError(null);

    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message || "Signup failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-200 to-slate-400">
      <div className="w-full max-w-md p-10 mx-auto border shadow-xl rounded-2xl bg-white/90 backdrop-blur border-black/5">
        {/* Logo  */}
        <div className="flex justify-center mb-2">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading  */}

        <h2 className="text-2xl font-semibold leading-tight text-center text-gray-800">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-center text-gray-500">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-600 transition-all duration-200 text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="mt-6 text-center text-red-600">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /[a-zA-Z0-9-]{1,}@([a-zA-Z\.])?[a-zA-Z]{1,}\.[a-zA-Z]{1,4}/.test(
                      value,
                    ) || "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            <Button
              type="submit"
              className="w-full py-2.5 text-base font-medium
             bg-blue-600 hover:bg-blue-700
             active:scale-[0.98]
             transition-all duration-200"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
