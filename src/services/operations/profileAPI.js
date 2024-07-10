import { apiConnector } from "../apiconnector.js";
// import { profileEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import {settingsEndpoints} from "../apis"
import { setUser } from "../../slices/ProfileSlice.js";

export async function updatePassword(token,password,navigate){
    const { oldPassword, newPassword, confirmPassword:confirmNewPassword }=password;
    console.log("password",password);
    console.log("token: ",token)
    const toastId = toast.loading("Updating...");
    try {

     const response = await apiConnector("POST", settingsEndpoints.CHANGE_PASSWORD_API,{oldPassword, newPassword, confirmNewPassword},{
        Authorisation: `Bearer ${token}`,
      });

      console.log("UPDATE_PASSWORD_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Updated Successfully");
      navigate('/dashboard/my-profile');
      
    }
    catch (error) {
      toast.error(error.response.data.message);
      console.log("UPDATE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
  }



  export function updateName(name,token,navigate){
    return async(dispatch)=>{
      const toastId = toast.loading("Loading...");
      console.log("",token);
      try {
        const response = await apiConnector("POST",settingsEndpoints.UPDATE_NAME_API,{name},{
            Authorisation: `Bearer ${token}`,
            
        });
  
      console.log("NAME UODATE RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
    
      dispatch(setUser(response.data.updated_user));
      localStorage.setItem('user',JSON.stringify(response.data.updated_user));
      toast.success("Marks Successfully");
      
    }
    catch (error) {
      toast.error(error.response.data.message);
      console.log("UPDATE NAME API ERROR.......................", error)
    }
    toast.dismiss(toastId);
  }
  }