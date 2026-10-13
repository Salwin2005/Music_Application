import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import {__AUTH} from "../Backend/firebaseconfig.js"
import {  NavLink, useNavigate } from 'react-router-dom';
import Spinner from '../Helper/Spinner.jsx';
import StarBorder from '../ainmations/StarBorder.jsx';
  

const Register = () => {
  let navigate = useNavigate(); 
  let [userData, setUSerData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  //DEstructuring of an user data
  let { username, email, password, confirmPassword } = userData;

  let handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUSerData({ ...userData, [name]: value })
  }

  let handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if(password===confirmPassword){
        //create the user with email and password
      let registeredUser= await createUserWithEmailAndPassword(
        __AUTH , 
        email , 
        password
      );
      console.log(registeredUser)
      //send email verification
        sendEmailVerification(registeredUser.user);

      //update profile name and photo usr which is npt updated by default
        updateProfile(registeredUser.user,{
          displayName : username ,
          photoURL: "https://imgs.search.brave.com/yEB1lsAXLI5UtI9DpywDl6dMDnj4KVNTH9HMZoirSt4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzQ4LzMyLzI0/LzM2MF9GXzU0ODMy/MjQ5OF9kdE5jRWJt/QjFFNHYzcElxY1BK/REJVaEEyMnREa3Zk/Ty5qcGc"
        })


        toast.success(`email verification has been sent to your registered ${email}`);
        toast.success("User has been registered Sucessfully")
        navigate("/auth/login");
      }else{
        toast.error("Password does not match")
        setUSerData({
          password: "",
          confirmPassword: "" 
        })
      }
      

    } catch (error) {
      toast.error(error.code.slice(5))
    }
    setIsLoading(false)
  }


  let [showPassword1, setShowPassword1] = useState(false)

  let togglePassword1 = () => {
    setShowPassword1(!showPassword1);
  }

  let [showPassword2, setShowPassword2] = useState(false)


  let togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  }

  let [isLoading, setIsLoading] = useState(false);

  return (
    <section className='text-white w-[100vw] min-h-[90vh] flex justify-center items-center'>
      <article className='w-[30%] bg-black p-5 rounded-xl'>
        <header className='text-center text-2xl font-bold py-3'>
          <h1>Register</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col mb-1 p-3'>
            <label htmlFor="username" className='font-semibold text-lg mb-1'>
              Username :
            </label>
            <input type="text" id='username' placeholder='Enter your name'
              className='outline-none border border-gray-500 p-2 rounded-lg'
              name='username'
              value={username}
              onChange={handleInputChange} />
          </div>
          <div className='flex flex-col mb-1 p-3'>
            <label htmlFor="email" className='font-semibold text-lg mb-1'>
              Email :
            </label>
            <input
              type="email"
              id='email'
              placeholder='Enter your email'
              className='outline-none border border-gray-500 p-2 rounded-lg'
              name='email'
              value={email}
              onChange={handleInputChange} />
          </div>
          <div className='flex flex-col mb-1 p-3 relative'>
            <label htmlFor="password" className='font-semibold text-lg mb-1'>Password :</label>
            <input
              type={showPassword1 ? "text" : "password"}
              id='password'
              placeholder='Enter your password'
              className='outline-none border border-gray-500 p-2 rounded-lg'
              name='password'
              value={password}
              onChange={handleInputChange} />
            <span
              className='absolute bottom-[25px] right-[25px] text-lg cursor-pointer'
              onClick={togglePassword1}>
              {showPassword1 ? <IoMdEyeOff /> : <IoMdEye />}
            </span>
          </div>
          <div className='flex flex-col mb-1 p-3 relative'>
            <label htmlFor="confirmPassword" className='font-semibold text-lg mb-1'>Confirm Password :</label>
            <input
              type={showPassword2 ? "text" : "password"}
              id='confirmPassword'
              placeholder='Confirm your password'
              className='outline-none border border-gray-500 p-2 rounded-lg'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleInputChange} />
            <span
              className='absolute bottom-[25px] right-[25px] text-lg cursor-pointer'
              onClick={togglePassword2}>
              {showPassword2 ? <IoMdEyeOff /> : <IoMdEye />}
            </span>
          </div>

          <div className='flex flex-col mb-1 p-3'>
            <StarBorder
                as="button"
                className="custom-class hover:bg-gray-400"
                color="white"
                speed="4s"
                
              >
                Register
              </StarBorder>
          </div>
          <div className='flex justify-center items-center'>
           <NavLink to={"/auth/login"} className={`hover:text-blue-400`}>Already have an account?</NavLink>
          </div>
        </form>
      </article>
      {isLoading && (<section className="w-[100vw] h-[100vh] bg-black/50 fixed top-0">
          <Spinner/>
        </section>)}
    </section>
  )
}

export default Register