import toast from "react-hot-toast";
import { setLoading, setLoggedIn, setToken } from "../../slices/AuthSlice";
import { setUser } from "../../slices/ProfileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error(error?.response?.data?.message);
      // dispatch(setProgress(100));
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  fullname,
  email,
  password,
  confirmpassword,
  otp,
  file,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    console.log("profile picture: ",file);
    const formdata = new FormData();
    formdata.append("file",file);
    console.log("form data: ",formdata);
    try {
      const response = await apiConnector("POST", SIGNUP_API, {fullname,email,password,confirmpassword,otp,file:formdata});
      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("response data: ", response.data);
      // console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        toast.success(Error(response.data.message));
        throw new Error(response.data.message);
      }

      toast.success("logged in");
      await dispatch(setToken(response.data.token));

      console.log("this is the new generated token: ", response.data.token);

      // const [firstName,lastName] = response.data.user.fullname.split(' ')
      // const userImage = response.data?.user?.image
      //   ? response.data.user.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser(response.data.existUser)); // image: userImage
      dispatch(setLoggedIn(true));
      // handleLogin(response.data.token,response.data.existUser);
      localStorage.setItem("user", JSON.stringify(response.data.existUser));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setLoggedIn(false));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out");
    navigate("/");
  };
}

export function forgotPassword(email,setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("FORGOTPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent");
      setEmailSent(true)
    } catch (error) {
      console.log("FORGOTPASSWORD ERROR............", error)
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token,setresetComplete) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      setresetComplete(true)
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("RESETPASSTOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

