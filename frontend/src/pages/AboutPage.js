import React from "react";
import { TypeAnimation } from "react-type-animation";

const AboutPage = () => {
  return (
    <div className="w-11/12 min-h-screen mx-auto mt-[55px]">
      <div className="mt-6">
        <h1 className="text-3xl font-bold mb-4 ">About Todo App</h1>
        <p className="text-gray-700 bg-gray-300 bg-opacity-40 text-xl shadow-md px-5 py-3">
          Todo App is a simple and intuitive application designed to help you
          manage your tasks effectively. Whether you're a student, professional,
          or anyone who wants to stay organized, Todo App is here to make your
          life easier.
        </p>

        <div className="flex flex-row items-center sm:flex-wrap gap-20 ">
          <div className="lg:w-[40%]">
            <p className="text-black mt-4 text-2xl font-bold text-center mb-1">
              Key Features:
            </p>
           
            <div className="text-gray-700 bg-gray-300 flex flex-col bg-opacity-40 text-[16px] justify-start px-5 py-3">
        <p>Create and manage your todo list.</p>
        <p>Mark tasks as completed.</p>
        <p>Add new todos easily.</p>
        <p>Responsive design for a seamless experience on any device.</p>
      </div>
          </div>
          <div className="flex flex-col items-center lg:w-[50]">
            <p className="text-gray-900 mt-4 text-2xl font-bold text-center mb-1">
              Built with:
            </p>
            <div className="lg:w-[100%] bg-gray-300 flex-flex-col bg-opacity-40 text-[16px] justify-start text-gray-900 px-5 py-3">
              <p>React.js for the frontend.</p>
              <p>Tailwind CSS for styling.</p>
              <p>Redux for state management.</p>
              {/* Add more technologies used in your application */}
            </div>
          </div>
        </div>

        <p className="text-gray-900 mt-7 text-center">Connect with us:</p>
        <div className="flex space-x-4 justify-center">
          <a href="#" className="hover:text-blue-500">
            Twitter
          </a>
          <a href="#" className="hover:text-blue-500">
            GitHub
          </a>
          {/* Add more social media links as needed */}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
