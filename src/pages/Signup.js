import React, { useDebugValue, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setSignupData} from "../slices/AuthSlice";
import { sendOtp } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataHandler = (data) => {

    if (data.password !== data.confirmpassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    dispatch(setSignupData(data));
   
    dispatch(sendOtp(data.email, navigate));

      // try {
      //   const savedUserResponse = await fetch(
      //     `${process.env.REACT_APP_BASE_URL}/sendOtp`,
      //     {
      //         method: "POST",
      //         headers: {
      //             "Content-Type": "application/json",
      //           },
      //           body: JSON.stringify({ ...data }),
      //         }
      //       );
      //   console.log("FORM RESPONSE......", savedUserResponse);
      //   navigate("/sendOtp",{state:data});

      // } catch (error) {
      //   console.log(error);
      // }
  };

  // const createUser = (data) => {
  // console.log("data is ",data);

  // console.log("data: ",data)
  // try {
  //   const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, data);
  //   console.log(response.data); // Handle the response from the server
  // } catch (error) {
  //   console.error('Error submitting signup form:', error);
  // }

  // console.log("uel..: ",process.env.REACT_APP_BASE_URL)
  //   const savedUserResponse = await fetch(
  //       `${process.env.REACT_APP_BASE_URL}/createUser`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ ...data }),
  //       }
  //     );
  // console.log("FORM RESPONSE......", savedUserResponse);

  // navigate("/sendOtp",{state:data})
  // };

  return (
    <>
      <div className="w-11/12 min-h-screen mx-auto pb-4 relative mt-[16px] bg-gradient-to-r from-blue-300 via-blue-500 to-gray-300 bg-opacity-50">
        <div className="flex flex-col justify-center sm:flex-wrap items-center mx-auto py-12 scroll-smooth transition-all duration-200 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create Your Account
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-gray-300 py-5 px-8 shadow rounded-lg sm:px-10 lg:w-[430px]">
              <form onSubmit={handleSubmit(dataHandler)} className="space-y-2">
                <div>
                  <label
                    for="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="fullname"
                      type="text"
                      autocomplete="email"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your fullname"
                      {...register("fullname")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email address"
                      {...register("email")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="off"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your password"
                      {...register("password")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmpassword"
                      name="confirmpassword"
                      type="password"
                      autoComplete="off"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your password"
                      {...register("confirmpassword")}
                    />
                  </div>
                </div>

                {/* <div>
                  <label
                    htmlFor="file"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Add profile pic
                  </label>
                  <div className="mt-1">
                    <input
                      id="file"
                      name="file"
                      type="file"
                      accept="image/*" 
                      required
                      // className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      {...register("file")}
                    />
                  </div>
                </div> */}

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* <input id="remember_me" name="remember_me" type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                        <label for="remember_me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label> */}
                  </div>

                  <div className="text-sm">
                    <Link
                      className="font-medium text-blue-600 hover:text-blue-500"
                      to="/login"
                    >
                      <button>Already have an account?</button>
                    </Link>
                  </div>
                </div>

                <div>
                  <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign in
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-100 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div>
                    <Link
                      to={"#"}
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        className="h-5 w-5"
                        src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={"#"}
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        className="h-5 w-5"
                        src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={"#"}
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        className="h-6 w-6"
                        src="https://www.svgrepo.com/show/506498/google.svg"
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
