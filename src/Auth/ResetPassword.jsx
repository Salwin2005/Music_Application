import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom'
import { __AUTH } from '../Backend/firebaseconfig';
import Spinner from '../Helper/Spinner';

const ResetPassword = () => {

    let navigate = useNavigate()
    let [email, setEmail] = useState("");
    let [isLoading, setIsLoading] = useState(false);

    let handleInputChange = (e) => {
        let value = e.target.value;
        setEmail(value)
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            //reset password functionality provided by firebase
            await sendPasswordResetEmail(
                __AUTH,
                email
            )
            toast.success(`Mail to reset password has been sent to ${email}`)
            navigate("/auth/login");
        } catch (error) {
            toast.error(error.message)
        }
        setIsLoading(false);
    };

    return (
        <div>
            <section className='text-white w-[100vw] min-h-[90vh] flex justify-center items-center'>
                <article className='w-[30%] bg-[#1E1E1E] p-5 rounded-xl'>
                    <header className='text-center text-2xl font-bold py-3'>
                        <h1>Reset Password</h1>
                    </header>
                    <form onSubmit={handleSubmit}>
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
                                onChange={handleInputChange}
                                value={email}
                            />
                        </div>

                        <div className='flex flex-col mb-1 p-3'>
                            <button className='bg-blue-600 py-2 text-lg cursor-pointer rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all ' >
                                Reset Password
                            </button>

                        </div>
                        <div className='flex justify-center items-center'>
                            <NavLink to={"/auth/login"}
                                className={`hover:text-blue-400 hover:underline`}>
                                Cancel
                            </NavLink>
                        </div>
                    </form>
                </article>
                {isLoading && (<section className="w-[100vw] h-[100vh] bg-black/50 fixed top-0">
                    <Spinner />
                </section>)}
            </section>
        </div>
    )
}

export default ResetPassword