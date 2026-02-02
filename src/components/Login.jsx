import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const onLogin = async (data) => {
    setError(null);
    try {
      await authService.login(data);
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Login failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-200 to-slate-400">
      <div
        className={`mx-auto w-full max-w-md rounded-2xl bg-white/90 backdrop-blur shadow-xl border border-black/5 p-10`}
      >
        <div className="flex justify-center mb-2">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-2xl font-semibold leading-tight text-center text-gray-800">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-center text-gray-500">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 transition-all duration-200 text-primary hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="mt-6 text-center text-red-600">{error}</p>}

        {/* //form starts from here  */}
        <form onSubmit={handleSubmit(onLogin)} className="my-8">
          <div className="space-y-5">
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
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full py-2.5 text-base font-medium
             bg-blue-600 hover:bg-blue-700
             active:scale-[0.98]
             transition-all duration-200"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
