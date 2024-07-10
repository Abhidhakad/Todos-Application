import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "../ReusableComponents/Button";
import ProfileDetail from "./dashboard/ProfileDetail";
import { IoMdHome } from "react-icons/io";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTodo } from "../services/operations/todosAPI";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  

  const [token1, setToken] = useState(token);
  const [user1, setUser] = useState(user);
  const [login,setLogin] = useState(false);
 

  

  const handleLogout = () => {
    // Logic to perform logout, update state, etc.
    setToken(null);
    setUser(null);
  };

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const closeMenu = (event) => {
    // Close the menu when clicking outside of it
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    // Add a click event listener to the entire document
    document.addEventListener("click", closeMenu);

    // Remove the click event listener when the component unmounts
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-gray-200 shadow-md fixed top-0 z-10">
      <div className="w-11/12 flex flex-wrap m-auto h-14 justify-between items-center px-4 text-black text-opacity-75">
        <div className="font-bold text-xl">
          <NavLink to="/">
            <span width={160} height={32}>
              {" "}
              Abhishek{" "}
            </span>
          </NavLink>
        </div>

        <div>
          <nav>
            <ul className="flex gap-12">
              <li className="flex gap-[1px] items-center justify-center">
                <IoMdHome className="text-xl" />
                <NavLink className={`font-semibold`} to="/">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={`font-semibold ${
                    location.pathname === "/about" ? "text-blue-500" : ""
                  } `}
                  to="/about"
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={`font-semibold hover:text-blue-500 ${
                    location.pathname === "/contact" ? "text-blue-500" : ""
                  }`}
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
              {user1 && (
                <li>
                  <Link
                    onClick={() => dispatch(getAllTodo(token, navigate))}
                    className={`font-semibold hover:text-blue-500 ${
                      location.pathname === "/getalltodo" ? "text-blue-500" : ""
                    }`}
                  >
                    Todos
                  </Link>
                </li>
              )}

              {user1 && (
                <li>
                  <NavLink
                    className={`font-semibold hover:text-blue-500 ${
                      location.pathname === "/createtodo" ? "text-blue-500" : ""
                    }`}
                    to="/createtodo"
                  >
                    AddTodo
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="flex gap-4 sm:hidden">
          {token1 == null && (
            <Link to="/login">
              <Button bgColor={"bg-gray-300"}>Login</Button>
            </Link>
          )}
          {token1 == null && (
            <Link to="/signup">
              <Button bgColor={"bg-gray-300"} textColor={"text-black"}>
                Signup{" "}
              </Button>
            </Link>
          )}

          {user1 !== null && (
            <div className="relative w-[50px] h-[50px] rounded-full bg-primary-300 flex items-center justify-center group/navbar cursor-pointer transition-all duration-200 hover:transition-all hover:duration-200">
              <span width="100px" height="100px" className="rounder-full">
                AN
              </span>
              <div className="absolute invisible bg-gray-200 top-14 z-[1000] flex w-44 justify-center bg-opacity-80 rounded-md shadow-md text-black transition-all duration-200 group-hover/navbar:visible group-hover/navbar:opacity-100">
                <ProfileDetail onLogout={handleLogout} />
                <div className="absolute -z-[10] w-5 h-5 bg-gray-200 rotate-45 translate-y-[-25%]"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}

      <div className="lg:hidden md:hidden relative">
        {/* Mobile Navbar */}
        <nav ref={menuRef} className="bg-gray-50 w-full p-4 fixed top-0 z-40">
          <div className="flex justify-between items-center">
          <NavLink to="/" className="text-black font-bold text-xl">
            <span width={160} height={32}>
              {" "}
              Abhishek{" "}
            </span>
          </NavLink>
            {/* <div className="text-black font-bold">Your Logo</div> */}
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none focus:border-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="mt-4 flex flex-col">
              <div>
                <li className="flex gap-[1px] items-center justify-start py-2 px-4">
                  <NavLink
                    className={`${
                      location.pathname === "/" ? "text-blue-500" : ""
                    } font-semibold`}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                <li className="block py-2 px-4">
                  <NavLink
                    onClick={() => setIsOpen(!isOpen)}
                    className={`font-semibold ${
                      location.pathname === "/about" ? "text-blue-500" : ""
                    } `}
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>

                <li className="block py-2 px-4">
                  <NavLink
                    className={`font-semibold hover:text-blue-500 ${
                      location.pathname === "/contact" ? "text-blue-500" : ""
                    }`}
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                </li>

                {user1 && (
                  <li className="block py-2 px-4">
                    <Link
                      onClick={() => dispatch(getAllTodo(token, navigate))}
                      className={`font-semibold hover:text-blue-500 ${
                        location.pathname === "/getalltodo"
                          ? "text-blue-500"
                          : ""
                      }`}
                    >
                      Todos
                    </Link>
                  </li>
                )}

                {user1 && (
                  <li className="block py-2 px-4">
                    {" "}
                    <NavLink
                      className={`font-semibold hover:text-blue-500 ${
                        location.pathname === "/createtodo"
                          ? "text-blue-500"
                          : ""
                      }`}
                      to="/createtodo"
                    >
                      AddTodo
                    </NavLink>
                  </li>
                )}

                {user1 !== null && (
                  <div className="absolute right-1 top-14 w-[50px] h-[50px] rounded-full bg-primary-300 flex items-center justify-center group/navbar cursor-pointer transition-all duration-200 hover:transition-all hover:duration-200">
                    <span width="100px" height="100px" className="rounder-full">
                      AN
                    </span>
                    <div className="absolute invisible bg-gray-200 top-14 z-[1000] flex w-44 justify-center bg-opacity-80 rounded-md shadow-md text-black transition-all duration-200 group-hover/navbar:visible group-hover/navbar:opacity-100 pr-12">
                      <ProfileDetail onLogout={handleLogout} />
                      <div className="absolute -z-[10] w-5 h-5 bg-gray-200 rotate-45 translate-y-[-25%]"></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute right-1 top-20">
                <div className="flex flex-col justify-start gap-4">
                  {token1 == null && (
                    <Link to="/login">
                      <Button bgColor={"bg-gray-300"}>Login</Button>
                    </Link>
                  )}
                  {token1 == null && (
                    <Link to="/signup">
                      <Button bgColor={"bg-gray-300"} textColor={"text-black"}>
                        Signup{" "}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

//   <div className="lg:hidden md:hidden relative">
//     {/* Mobile Navbar */}
//     <nav ref={menuRef} className="bg-gray-50 w-full p-4 fixed top-0 z-40">
//       <div className="flex justify-between items-center">
//         <div className="text-black font-bold">Your Logo</div>
//         <button
//           onClick={toggleMenu}
//           className="text-black focus:outline-none focus:border-none"
//         >
//           <svg
//             className="h-6 w-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16m-7 6h7"
//             ></path>
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="mt-4 flex flex-col">
//           <div>
//             <li className="flex gap-[1px] items-center justify-start py-2 px-4">
//               <NavLink
//                 className={`${
//                   location.pathname === "/" ? "text-blue-500" : ""
//                 } font-semibold`}
//                 to="/"
//               >
//                 Home
//               </NavLink>
//             </li>

//             <li className="block py-2 px-4">
//               <NavLink
//                 onClick={() => setIsOpen(!isOpen)}
//                 className={`font-semibold ${
//                   location.pathname === "/about" ? "text-blue-500" : ""
//                 } `}
//                 to="/about"
//               >
//                 About
//               </NavLink>
//             </li>

//             <li className="block py-2 px-4">
//               <NavLink
//                 className={`font-semibold hover:text-blue-500 ${
//                   location.pathname === "/contact" ? "text-blue-500" : ""
//                 }`}
//                 to="/contact"
//               >
//                 Contact
//               </NavLink>
//             </li>

//             {user1 && (
//               <li className="block py-2 px-4">
//                 <Link
//                   onClick={() => dispatch(getAllTodo(token, navigate))}
//                   className={`font-semibold hover:text-blue-500 ${
//                     location.pathname === "/getalltodo" ? "text-blue-500" : ""
//                   }`}
//                 >
//                   Todos
//                 </Link>
//               </li>
//             )}

//             {user1 && (
//               <li className="block py-2 px-4">
//                 {" "}
//                 <NavLink
//                   className={`font-semibold hover:text-blue-500 ${
//                     location.pathname === "/createtodo" ? "text-blue-500" : ""
//                   }`}
//                   to="/createtodo"
//                 >
//                   AddTodo
//                 </NavLink>
//               </li>
//             )}

//             {user1 !== null && (
//               <div className="absolute right-1 top-14 w-[50px] h-[50px] rounded-full bg-primary-300 flex items-center justify-center group/navbar cursor-pointer transition-all duration-200 hover:transition-all hover:duration-200">
//                 <span width="100px" height="100px" className="rounder-full">
//                   AN
//                 </span>
//                 <div className="absolute invisible bg-gray-200 top-14 z-[1000] flex w-44 justify-center bg-opacity-80 rounded-md shadow-md text-black transition-all duration-200 group-hover/navbar:visible group-hover/navbar:opacity-100 pr-12">
//                   <ProfileDetail onLogout={handleLogout} />
//                   <div className="absolute -z-[10] w-5 h-5 bg-gray-200 rotate-45 translate-y-[-25%]"></div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="absolute right-1 top-20">
//             <div className="flex flex-col justify-start gap-4">
//               {token1 == null && (
//                 <Link to="/login">
//                   <Button bgColor={"bg-gray-300"}>Login</Button>
//                 </Link>
//               )}
//               {token1 == null && (
//                 <Link to="/signup">
//                   <Button bgColor={"bg-gray-300"} textColor={"text-black"}>
//                     Signup{" "}
//                   </Button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   </div>

export default Navbar;