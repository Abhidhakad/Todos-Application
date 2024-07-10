import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { todos } from "../../services/apis";
import TodoForm from "./TodoForm";
import { Link, useNavigate } from "react-router-dom";
import { deleteTodo,markAsSuccess } from "../../services/operations/todosAPI";
import Button from "../../ReusableComponents/Button";

const AllTodos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const token = useSelector((state) => state.auth.token);
  console.log("length: ", todos);
  function editHandler(todo) {
    navigate("/createtodo", { state: { todo } });
  }
  function handleDelete(todo) {
    dispatch(deleteTodo(token, todo, navigate));
  }
  function handleMarkAsSuccess(todo){
    dispatch(markAsSuccess(token,todo));
  }


  return (
    <div
      className="w-11/12 h-screen mx-auto bg-gradient-to-r from-blue-300 via-blue-500 to-gray-300 bg-opacity-50
     pb-2"
    >
      <div className="pt-24">
        {todos?.todos?.length !== 0 ? (
          <>
            <h2 className="text-2xl font-bold text-zinc-800 underline text-center">
              My Tasks
            </h2>
            <ul className="max-w-md mx-auto mt-8">
              {todos?.todos?.map((todo, index) => (
                <li
                  key={index}
                  className="bg-gray-200 shadow-md border p-4 mb-4 rounded-md flex flex-col justify-between items-center sm:flex-wrap"
                >
                  <div>
                        <h3 className="text-lg font-bold">{todo.title}</h3>
                        <p className="text-gray-700">{todo.description}</p> 
                    
                  </div>
                  <div className="mt-3 flex sm:flex-wrap sm:justify-center sm:gap-y-2">
                    <button
                      onClick={() => editHandler(todo)} 
                      className="bg-yellow-500 text-black px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                        onClick={() => handleMarkAsSuccess(todo)}
                      className={`${
                        todo.completed ? "bg-green-600 hover:bg-blue-500" : "bg-blue-500"
                      } text-black px-2 py-1 rounded-md mr-2 hover:bg-green-600`}
                    >
                      {todo.completed ? "Undo" : "Mark as Success"}
                    </button>
                    <button
                      onClick={() => handleDelete(todo)}
                      className="bg-red-500 text-black px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="text-2xl font-bold text-zinc-800 underline text-center">You dont have any task</div>
            <Link to='/createtodo'>
              <Button bgcolor={'bg-zinc-800 text-white'}>Lets create</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTodos;
