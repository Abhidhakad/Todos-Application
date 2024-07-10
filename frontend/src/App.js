import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import TodoForm from "./components/Todos/TodoForm";
import AllTodos from "./components/Todos/AllTodos";
import SendOtp from "./components/functionality/SendOtp";
import MyProfile from "./components/dashboard/MyProfile";
import Settings from "./components/dashboard/Settings";
import Signup from "./pages/Signup";
import ForgotPassword from "./components/dashboard/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./CommonFolder/Footer";
import ChnageName from "./components/dashboard/ChnageName";
// import Page from '../src/pages/Home';
// import GlassmorphicTextBox from "./components/GlassmorphicTextBox";
// import RichTextEditor from "./components/RichTextEditor";

function App() {
  return (
    <div
      className="w-full bg-gradient-to-r from-blue-300 via-blue-500 to-gray-300 bg-opacity-50
    "
    >
      {/* Navbar code  */}
      <div>
        <Navbar />
      </div>

      {/* routing defines */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sendOtp" element={<SendOtp />} />
        <Route path="/verify-email" element={<VerifyOtp />} />
        <Route path="/dashboard/my-profile" element={<MyProfile />} />
        <Route path="dashboard/settings" element={<Settings />} />

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<ResetPassword />} />
        <Route path="/updatename" element={<ChnageName />} />


        {/* Application Routes */}
        <Route path="/createtodo" element={<TodoForm />} />
        <Route path="/getalltodo" element={<AllTodos />} />

        {/* <Route path="/createOtp" element={<SendOtp />} /> */}
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/addemployee" element={<CreateEmployeePage />} />*/}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
