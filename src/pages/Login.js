import React, { useState } from "react";
import { login } from "../services/operations/authAPI";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("location: ", location);
  const [showValidation,setShawValidation] = useState(false);

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  function formHandler(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    try {
      e.preventDefault();
      dispatch(login(formdata.email, formdata.password, navigate));
    } catch (error) {
      console.log(error);
      toast.error("Login failed please try after sometimes");
      navigate("/");
    }
  }

  return (
    <>
      <div
        className="relative mt-[16px] 
    bg-gradient-to-r from-blue-300 via-blue-500 to-gray-300 bg-opacity-50"
      >
        <div class="min-h-screen mx-auto flex flex-col justify-center py-12 scroll-smooth transition-all duration-200 lg:max-w-md sm:px-6 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p class="mt-2 text-center text-sm font-semibold text-gray-800 max-w">
              Or <br />
              <a href="#" class="font-medium text-gray-800 hover:text-gray-900">
                create an account
              </a>
            </p>
          </div>

          <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-gray-300 py-8 px-4 shadow-sm lg:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit} class="space-y-6">
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div class="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email address"
                      value={formdata.email}
                      onChange={formHandler}
                      // {...register("email")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    class="block text-sm font-medium text-gray-700 group/password"
                    // onClick={()=>()}
                  >
                    Password
                  </label>
                  <div class="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="off"
                      required
                      class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm group/password"
                      placeholder="Enter your password"
                      value={formdata.password}
                      onClick={()=> setShawValidation(true)}
                      onChange={formHandler}
                      // {...register("password")}
                    />
                  </div>
                {
                    showValidation &&
                    <div className="bg-gray-100 overflow-scroll h-24 inline-block py-2 px-4 rounded-md shadow absolute">
                    <div className="flex flex-col">
                        <label>
                        <input type="checkbox"  readOnly  />
                        Must be contain AlphaNumberic
                        </label>
                        <label>
                        <input type="checkbox"  />
                        Must be contain Number
                        </label>
                        <label>
                        <input type="checkbox"  />
                        Must be contain specialChars
                        </label>
                        <label>
                        <input type="checkbox"  />
                        Length requird must be 8
                        </label>
                    </div>
                    </div>
                }

                </div>

                <div class="flex items-center justify-center">
                  {/* <div class="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                        <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div> */}

                  <div class="text-sm">
                    {/* <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                            Forgot your password?
                        </a> */}
                    <Link
                      className="font-medium text-blue-600 underline hover:text-blue-500"
                      to="/forgotpassword"
                    >
                      <button>Forget your password</button>
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <div class="mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-gray-100 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div class="mt-6 grid grid-cols-3 gap-3">
                  <div>
                    <Link
                      to={"#"}
                      class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        class="h-5 w-5"
                        src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={"#"}
                      class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        class="h-5 w-5"
                        src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={"#"}
                      class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        class="h-6 w-6"
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

export default Login;
