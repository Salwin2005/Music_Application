import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import { __AUTH } from "../Backend/firebaseconfig.js";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import Spinner from "../Helper/Spinner.jsx";
import StarBorder from "../ainmations/StarBorder.jsx";

const Login = () => {
  let navigate = useNavigate();
  let [userData, setUSerData] = useState({
    email: "",
    password: "",
  });
  let [showPassword, setShowPassword] = useState(false);
  let togglePassword = () => {
    setShowPassword(!showPassword);
  };
  let [isLoading, setIsLoading] = useState(false);
  let { email, password } = userData;

  let handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUSerData({ ...userData, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let loggedInUSer = await signInWithEmailAndPassword(
        __AUTH,
        email,
        password
      );
      console.log(loggedInUSer);
      if (loggedInUSer.user.emailVerified === true) {
        toast.success("User has been Logged in");
        navigate("/");
      } else {
        toast.error("Email is not yet verified");
      }
    } catch (error) {
      toast.error(error.code.slice(5));
      setIsLoading(false);
    }
  };
  return (
    <div>
      <section className="text-white w-[100vw] min-h-[90vh] flex justify-center items-center">
        <article className="w-[30%] bg-black p-5 rounded-xl">
          <header className="text-center text-2xl font-bold py-3">
            <h1>Login</h1>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-1 p-3">
              <label htmlFor="email" className="font-semibold text-lg mb-1">
                Email :
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="outline-none border border-gray-500 p-2 rounded-lg"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col mb-1 p-3 relative">
              <label htmlFor="password" className="font-semibold text-lg mb-1">
                Password :
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="outline-none border border-gray-500 p-2 rounded-lg"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <span
                className="absolute bottom-[25px] right-[25px] text-lg cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
            <div className="flex flex-col mb-1 p-3">
              <StarBorder
                as="button"
                className="custom-class hover:bg-gray-400"
                color="white"
                speed="5s"
              >
                Login
              </StarBorder>
              <div className="flex justify-center items-center mt-3">
                <NavLink
                  to={"/auth/register"}
                  className={`hover:text-blue-400 `}
                >
                  Dont have an account?
                </NavLink>
              </div>
              <div className="flex justify-center items-center mt-2">
                <NavLink
                  to={"/auth/reset-password"}
                  className={`hover:text-blue-400 `}
                >
                  Forgot Password
                </NavLink>
              </div>
            </div>
          </form>
        </article>
        {isLoading && (
          <section className="w-[100vw] h-[100vh] bg-black/50 fixed top-0">
            <Spinner />
          </section>
        )}
      </section>
    </div>
  );
};

export default Login;
