import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faUser,
   faLock,
   faEye,
   faEyeSlash,
   faChurch,
} from "@fortawesome/free-solid-svg-icons";
import useLogin from "../../services/login";
import { isAxiosError } from "axios";
import userStore from "../../hooks/useStore";

const Login = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      username: "",
      password: "",
   });

   // call the login hook
   const { mutate: login, isSuccess, isPending, isError } = useLogin();

   const [showPassword, setShowPassword] = useState(false);
   const [errors, setErrors] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const { setLoading } = userStore();

   useEffect(() => {
      if (isPending) {
         setIsLoading(true);
         setLoading(true);
      }
      if (isSuccess || isError) {
         setIsLoading(false);
         setLoading(false);
      }
   }, [isPending, isSuccess, isError]);

   const validateForm = () => {
      const newErrors = {};

      if (!formData.username) {
         newErrors.username = "Username is required";
      } else if (formData.username.length < 3) {
         newErrors.username = "Username must be at least 3 characters";
      }

      if (!formData.password) {
         newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
         newErrors.password = "Password must be at least 8 characters";
      } else if (formData.password.length > 16) {
         newErrors.password = "Password must not exceed 16 characters";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      // Prevent password from exceeding 16 characters
      if (name === "password" && value.length > 16) {
         return;
      }

      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
         setErrors((prev) => ({
            ...prev,
            [name]: "",
         }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      login(formData, {
         onSuccess: (data) => {
            console.log("Login successful:", data);
            // Token is automatically set in HttpOnly cookie by server
            // No need to store in localStorage
            // Navigate to dashboard
            navigate("/dashboard", { replace: true });
            return;
         },
         onError: (error) => {
            console.log(error.message);
            if (isAxiosError(error)) {
               setErrors({
                  general: error?.response?.data?.error || "Login failed",
               });
            }
         },
      });
   };

   return (
      <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
         {/* Background Pattern */}
         <div className='absolute inset-0 z-0 opacity-5'>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%233298C8%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
         </div>

         <div className='relative z-10 w-full max-w-md'>
            {/* Card */}
            <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
               {/* Header */}
               <div className='bg-[#3298C8] px-8 py-10 text-center'>
                  <div className='inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur-sm'>
                     <FontAwesomeIcon
                        icon={faChurch}
                        className='text-white text-3xl'
                     />
                  </div>
                  <h1 className='text-3xl font-bold text-white mb-2'>
                     Welcome Back
                  </h1>
                  <p className='text-sky-100 text-sm'>
                     Sign in to access your MUTSDA account
                  </p>
               </div>

               {/* Form */}
               <div className='px-8 py-10'>
                  {/* General Error */}
                  {errors.general && (
                     <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center'>
                        {errors.general}
                     </div>
                  )}

                  <form onSubmit={handleSubmit} className='space-y-6'>
                     {/* Username Field */}
                     <div>
                        <label
                           htmlFor='username'
                           className='block text-sm font-semibold text-gray-700 mb-2'
                        >
                           Username
                        </label>
                        <div className='relative'>
                           <span className='absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400'>
                              <FontAwesomeIcon icon={faUser} />
                           </span>
                           <input
                              type='text'
                              id='username'
                              name='username'
                              value={formData.username}
                              onChange={handleChange}
                              className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 outline-none
                      ${
                         errors.username
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-[#3298C8] hover:border-gray-300"
                      }`}
                              placeholder='Enter your username'
                           />
                        </div>
                        {errors.username && (
                           <p className='mt-2 text-sm text-red-500'>
                              {errors.username}
                           </p>
                        )}
                     </div>

                     {/* Password Field */}
                     <div>
                        <label
                           htmlFor='password'
                           className='block text-sm font-semibold text-gray-700 mb-2'
                        >
                           Password
                        </label>
                        <div className='relative'>
                           <span className='absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400'>
                              <FontAwesomeIcon icon={faLock} />
                           </span>
                           <input
                              type={showPassword ? "text" : "password"}
                              id='password'
                              name='password'
                              value={formData.password}
                              onChange={handleChange}
                              minLength={8}
                              maxLength={16}
                              className={`w-full pl-12 pr-12 py-3.5 rounded-xl border-2 transition-all duration-200 outline-none
                      ${
                         errors.password
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-[#3298C8] hover:border-gray-300"
                      }`}
                              placeholder='Enter your password'
                           />
                           <button
                              type='button'
                              onClick={() => setShowPassword(!showPassword)}
                              className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#3298C8] transition-colors'
                           >
                              <FontAwesomeIcon
                                 icon={showPassword ? faEyeSlash : faEye}
                              />
                           </button>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                           {errors.password ? (
                              <p className='text-sm text-red-500'>
                                 {errors.password}
                              </p>
                           ) : (
                              <p className='text-xs text-gray-400'>
                                 8-16 characters
                              </p>
                           )}
                           <span className='text-xs text-gray-400'>
                              {formData.password.length}/16
                           </span>
                        </div>
                     </div>

                     {/* Remember Me & Forgot Password */}
                     <div className='flex items-center justify-between'>
                        <label className='flex items-center gap-2 cursor-pointer'>
                           <input
                              type='checkbox'
                              className='w-4 h-4 rounded border-gray-300 text-[#3298C8] focus:ring-[#3298C8]'
                           />
                           <span className='text-sm text-gray-600'>
                              Remember me
                           </span>
                        </label>
                        <Link
                           to='/forgot-password'
                           className='text-sm text-[#3298C8] hover:text-sky-600 font-medium transition-colors'
                        >
                           Forgot password?
                        </Link>
                     </div>

                     {/* Submit Button */}
                     <button
                        type='submit'
                        disabled={isLoading}
                        className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300
                  ${
                     isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#3298C8] hover:bg-sky-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                     >
                        {isLoading ? (
                           <span className='flex items-center justify-center gap-2'>
                              <svg
                                 className='animate-spin h-5 w-5'
                                 viewBox='0 0 24 24'
                              >
                                 <circle
                                    className='opacity-25'
                                    cx='12'
                                    cy='12'
                                    r='10'
                                    stroke='currentColor'
                                    strokeWidth='4'
                                    fill='none'
                                 />
                                 <path
                                    className='opacity-75'
                                    fill='currentColor'
                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                 />
                              </svg>
                              Signing in...
                           </span>
                        ) : (
                           "Sign In"
                        )}
                     </button>
                  </form>

                  {/* Divider */}
                  <div className='relative my-8'>
                     <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-200'></div>
                     </div>
                     <div className='relative flex justify-center text-sm'>
                        <span className='px-4 bg-white text-gray-400'>
                           New to MUTSDA?
                        </span>
                     </div>
                  </div>

                  {/* Sign Up Link */}
                  <Link
                     to='/signup'
                     className='block w-full py-4 rounded-xl font-bold text-[#3298C8] text-lg text-center border-2 border-[#3298C8] hover:bg-[#3298C8] hover:text-white transition-all duration-300'
                  >
                     Create an Account
                  </Link>
               </div>
            </div>

            {/* Footer Text */}
            <p className='text-center text-gray-500 text-sm mt-8'>
               By signing in, you agree to our{" "}
               <Link to='/terms' className='text-[#3298C8] hover:underline'>
                  Terms of Service
               </Link>{" "}
               and{" "}
               <Link to='/privacy' className='text-[#3298C8] hover:underline'>
                  Privacy Policy
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Login;
