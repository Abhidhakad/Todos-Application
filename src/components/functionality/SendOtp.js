import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const SendOtp = () => {
  const {register,handleSubmit} = useForm();
  const location = useLocation();
  const signupData = location.state || {};
  
  const verifyOtp = async(data1) => {
        // console.log("signup se aya data : ",data);
        console.log("otp vala data: ",data1);
        const allData = {...signupData,...data1}

        console.log("signupData: ",signupData)
        
        //  console.log("uel..: ",process.env.REACT_APP_BASE_URL)
          const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/createUser`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ ...allData }),
                    }
                  );
              console.log("FORM RESPONSE......", savedUserResponse);
  }
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(verifyOtp)} class="space-y-6">
            <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">
                        Enter Otp
                    </label>
                    <div class="mt-1">
                        <input id="otp" name="otp" type="text" autocomplete="off" required
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="******"
                            {...register("otp")}
                            />
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
                    </button>
                </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendOtp;
