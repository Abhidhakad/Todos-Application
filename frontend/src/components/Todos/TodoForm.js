import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createNewTodo } from "../../services/operations/todosAPI";
import {updateTodo} from "../../services/operations/todosAPI";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const TodoForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEdit = location.state?.todo ? true : false
  const todo = location.state?.todo;
  const [title1,setTitle] = useState("");
  const [description1,setDescription] = useState("");

  const token = useSelector((state) => state.auth.token);
  const completed = false;
  useEffect(()=>{
    if(isEdit){
      setTitle(todo.title);
      setDescription(todo.description);
    }
  },[])

  function handleSubmit(e) {
    e.preventDefault();
    const newdata = {title1,description1};
    if (isEdit) {
      newdata.id = todo?._id;
      newdata.completed = todo?.completed;
      dispatch(updateTodo(token,newdata,navigate));
    }
    else{
      newdata.completed=false;
      console.log("newdata: ",newdata)
      dispatch(createNewTodo(token, newdata, navigate));

    }
    setTitle("");
    setDescription("");
  }


  return (
    <div className="mt-[30px] w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-blue-500 to-gray-300 bg-opacity-50 pb-2">
      <div className=" bg-gray-300 p-4 rounded-md shadow-sm hover:bg-gray-300 hover:bg-opacity-80 md:w-96 ">
        <h2 className="font-bold text-2xl text-zinc-800 shadow-sm text-center">Add Your Task</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl lg:w-96 mx-auto mt-5"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2 text-center"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={title1}
              onChange={(e)=> setTitle(e.target.value)}
              autoComplete="off"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2 text-center"
            >
              Description:
            </label>
            <textarea
           
              id="description"
              required
              autoComplete="off"
              value={description1}
              onChange={(e)=> setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
            >
              {isEdit ? "Save" : "Add"}
            </button>

            <button
              type="button"
                onClick={() => {
                  setTitle("")
                  setDescription("")
                }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
