import {setTodos} from '../../slices/TodoSlice'
import toast from 'react-hot-toast';
import { todos } from "../apis";
import { apiConnector } from '../apiconnector';
import { setUser } from '../../slices/ProfileSlice';
import { useSelector } from 'react-redux';

const {
   CREATE_TODO,
   ALL_TODOS,
   UPDATE_TODO,
   DELETE_TODO,
   SUCCESS_TODO
} = todos;


export function createNewTodo(token,todo,navigate){
    return async(dispatch)=> {
        const { title1,description1,completed} = todo;
        console.log(title1);
        console.log(description1);
        console.log(completed);
       
        const toastId = toast.loading("Updating...");
        try {
            const response = await apiConnector("POST",CREATE_TODO,{title1,description1,completed},{
                Authorisation: `Bearer ${token}`,
                
            });
    
          console.log("CREATED_TODO RESPONSE............", response)
    
          if (!response.data.success) {
            throw new Error(response.data.message)
          }
    
          dispatch(setTodos(response.data.todo));
          // localStorage.setItem("todos", JSON.stringify([...todos,{response.}]));
          toast.success("Todo Created Successfullly");
      
          
        }
        catch (error) {
          toast.error(error.response.data.message);
          console.log("CREATED_TODO RESPONSE API ERROR.......................", error)
          toast.error(error.response.data.message)
        }
        toast.dismiss(toastId);
      }
    }

export function getAllTodo(token,navigate){
  return async(dispatch)=> {
    // console.log("token: ",token)
    const toastId = toast.loading("Updating...");
    try {
        const response = await apiConnector("GET",ALL_TODOS,{},{
            Authorisation: `Bearer ${token}`,
            
        });

      console.log("GET ALL TODO RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      dispatch(setTodos(response.data.user.todos));
      dispatch(setUser(response.data.user));
      localStorage.setItem("todos", JSON.stringify(response.data.user.todos));
      localStorage.setItem("user",JSON.stringify(response.data.user));
      navigate('/getalltodo')
    }
    catch (error) {
      toast.error(error.response.data.message);
      console.log("GET ALL TODO API ERROR.......................", error)
    }
    toast.dismiss(toastId);
  }
}

export function updateTodo(token,todo,navigate){
  return async(dispatch)=>{
    console.log("todo aa gya hai : ",todo);
    console.log("token in update todo: ",token);
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST",UPDATE_TODO,{todo},{
          Authorisation: `Bearer ${token}`,
          
      });

    console.log("UPDATE TODO RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    const newtodos = response.data.user.todos;
    dispatch(setTodos(newtodos));
    localStorage.setItem("todos", JSON.stringify(newtodos)); 
    toast.success("update Successfully");
    // dispatch(setTodos(response.data.user.todos));
    // localStorage.removeItem('todos');
    // localStorage.setItem("todos", JSON.stringify(response.data.user.todos));
    navigate('/getalltodo')
  }
  catch (error) {
    toast.error(error.response.data.message);
    console.log("UPDATE TODO API ERROR.......................", error)
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}
}

export function deleteTodo(token,todo,navigate){
  return async(dispatch)=>{
    console.log("todo aa gya hai : ",todo);
    console.log("token in update todo: ",token);
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST",DELETE_TODO,{todo},{
          Authorisation: `Bearer ${token}`,
          
      });

    console.log("Delete TODO RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    const todos = JSON.parse(localStorage.getItem('todos'));
    const newtodos = todos.filter((todo1)=> todo._id!==todo1._id);
    dispatch(setTodos(newtodos));
    localStorage.setItem("todos", JSON.stringify(newtodos)); 
    toast.success("deleted Successfully");
    navigate('/getalltodo')
  }
  catch (error) {
    toast.error(error.response.data.message);
    console.log("DELETE API ERROR.......................", error)
  }
  toast.dismiss(toastId);
}
}

export function markAsSuccess(token,todo){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST",SUCCESS_TODO,{todo},{
          Authorisation: `Bearer ${token}`,
          
      });

    console.log("SUCCESS TODO RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    const newtodos = response.data.user.todos;
    dispatch(setTodos(newtodos));
    const todos = JSON.parse(localStorage.getItem('todos'));
    localStorage.setItem("todos", JSON.stringify(newtodos)); 
    toast.success("Marks Successfully");
  }
  catch (error) {
    toast.error(error.response.data.message);
    console.log("SUCCESS API ERROR.......................", error)
  }
  toast.dismiss(toastId);
}
}