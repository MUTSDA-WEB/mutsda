import { useState } from "react";
import zxcvbn from "zxcvbn";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faEnvelope,
   faLock,
   faEye,
   faEyeSlash,
   faChurch,
   faUser,
   faPhone,
   faUserTag,
   faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useRegister, useRoles } from "../../services/register";

const Register = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      username: "",
      email: "",
      phoneNumber: "",
      role: "",
      password: "",
      confirmPassword: "",
   });
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [errors, setErrors] = useState({});
   const [isLoading, setIsLoading] = useState(false);

   // Fetch available roles using React Query hook at top level
   const { data, isLoading: rolesLoading } = useRoles();
   const availableRoles = data?.roles || [];

   // call the register User hook
   const {
      data: newUser,
      isLoading: loadingReg,
      isSuccess,
   } = useRegister({
      username: formData.username,
      email: formData.email,
      phoneNumber: parseInt(formData.phoneNumber.replace(/\D/g, ""), 10),
      role: formData.role,
      password: formData.password,
   });

   // Format role name for display (e.g., "churchLeader" -> "Church Leader")
   const formatRoleName = (role) => {
      return role
         .replace(/([A-Z])/g, " $1")
         .replace(/^./, (str) => str.toUpperCase())
         .trim();
   };

   const validateForm = () => {
      const newErrors = {};

      if (!formData.username) {
         newErrors.username = "Username is required";
      } else if (formData.username.length < 3) {
         newErrors.username = "Username must be at least 3 characters";
      }

      if (!formData.email) {
         newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = "Please enter a valid email";
      }

      if (!formData.phoneNumber) {
         newErrors.phoneNumber = "Phone number is required";
      } else if (!/^\d{9,15}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
         newErrors.phoneNumber = "Please enter a valid phone number";
      }

      if (!formData.role) {
         newErrors.role = "Please select a role";
      }

      if (!formData.password) {
         newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
         newErrors.password = "Password must be at least 8 characters";
      } else if (formData.password.length > 16) {
         newErrors.password = "Password must not exceed 16 characters";
      }

      if (zxcvbn(formData.password).score < 3)
         newErrors.password = "Password is weak try a stronger one";

      if (!formData.confirmPassword) {
         newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
         newErrors.confirmPassword = "Passwords do not match";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      // Prevent password fields from exceeding 16 characters
      if (
         (name === "password" || name === "confirmPassword") &&
         value.length > 16
      ) {
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

      // Verify role is still available before submitting
      setIsLoading(true);

      try {
         const data = await response.json();

         if (isSuccess) {
            // Registration successful - redirect to login
            navigate("/login", {
               state: { message: "Registration successful! Please sign in." },
            });
         } else {
            setErrors({ general: data.error || "Registration failed" });
         }
      } catch (error) {
         setErrors({ general: "Network error. Please try again." });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
         {/* Background Pattern */}
         <div className='absolute inset-0 z-0 opacity-5'>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%233298C8%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
         </div>

         <div className='relative z-10 w-full max-w-lg'>
            {/* Card */}
            <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
               {/* Header */}
               <div className='bg-[#3298C8] px-8 py-8 text-center'>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3 backdrop-blur-sm'>
                     <FontAwesomeIcon
                        icon={faChurch}
                        className='text-white text-2xl'
                     />
                  </div>
                  <h1 className='text-2xl font-bold text-white mb-1'>
                     Create Account
                  </h1>
                  <p className='text-sky-100 text-sm'>
                     Join the MUTSDA community today
                  </p>
               </div>

               {/* Form */}
               <div className='px-8 py-8'>
                  {/* General Error */}
                  {errors.general && (
                     <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center'>
                        {errors.general}
                     </div>
                  )}

                  <form onSubmit={handleSubmit} className='space-y-5'>
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
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
                      ${
                         errors.username
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-[#3298C8] hover:border-gray-300"
                      }`}
                              placeholder='Choose a username'
                           />
                        </div>
                        {errors.username && (
                           <p className='mt-2 text-sm text-red-500'>
                              {errors.username}
                           </p>
                        )}
                     </div>

                     {/* Email Field */}
                     <div>
                        <label
                           htmlFor='email'
                           className='block text-sm font-semibold text-gray-700 mb-2'
                        >
                           Email Address
                        </label>
                        <div className='relative'>
                           <span className='absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400'>
                              <FontAwesomeIcon icon={faEnvelope} />
                           </span>
                           <input
                              type='email'
                              id='email'
                              name='email'
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
                      ${
                         errors.email
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-[#3298C8] hover:border-gray-300"
                      }`}
                              placeholder='Enter your email'
                           />
                        </div>
                        {errors.email && (
                           <p className='mt-2 text-sm text-red-500'>
                              {errors.email}
                           </p>
                        )}
                     </div>

                     {/* Phone Number Field */}
                     <div>
                        <label
                           htmlFor='phoneNumber'
                           className='block text-sm font-semibold text-gray-700 mb-2'
                        >
                           Phone Number
                        </label>
                        <div className='relative'>
                           <span className='absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400'>
                              <FontAwesomeIcon icon={faPhone} />
                           </span>
                           <input
                              type='tel'
                              id='phoneNumber'
                              name='phoneNumber'
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
                      ${
                         errors.phoneNumber
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-[#3298C8] hover:border-gray-300"
                      }`}
                              placeholder='Enter your phone number'
                           />
                        </div>
                        {errors.phoneNumber && (
                           <p className='mt-2 text-sm text-red-500'>
                              {errors.phoneNumber}
                           </p>
                        )}
                     </div>

                     {/* Role Dropdown */}
                     <div>
                        <label
                           htmlFor='role'
                           className='block text-sm font-semibold text-gray-700 mb-2'
                        >
                           Select Your Role
                        </label>
                        <div className='relative'>
                           <span className='absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400'>
                              <FontAwesomeIcon icon={faUserTag} />
                           </span>
                           {rolesLoading ? (
                              <div className='w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 flex items-center text-gray-400'>
                                 <FontAwesomeIcon
                                    icon={faSpinner}
                                    className='animate-spin mr-2'
                                 />
                                 Loading roles...
                              </div>
                           ) : (
                              <select
                                 id='role'
                                 name='role'
                                 value={formData.role}
                                 onChange={handleChange}
                                 className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none appearance-none bg-white cursor-pointer
                        ${
                           errors.role
                              ? "border-red-300 focus:border-red-500 bg-red-50"
                              : "border-gray-200 focus:border-[#3298C8] hover:border-gray-300"
                        }`}
                              >
                                 <option value=''>-- Select a role --</option>
                                 {availableRoles?.map((role) => (
                                    <option key={role} value={role}>
                                       {formatRoleName(role)}
                                    </option>
                                 ))}
                              </select>
                           )}
                           {/* Custom dropdown arrow */}
                           <span className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 pointer-events-none'>
                              <svg
                                 className='w-4 h-4'
                                 fill='none'
                                 stroke='currentColor'
                                 viewBox='0 0 24 24'
                              >
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M19 9l-7 7-7-7'
                                 />
                              </svg>
                           </span>
                        </div>
                        {errors.role && (
                           <p className='mt-2 text-sm text-red-500'>
                              {errors.role}
                           </p>
                        )}
                        {availableRoles?.length === 0 && !rolesLoading && (
                           <p className='mt-2 text-sm text-amber-600'>
                              No roles currently available. Please try again
                              later.
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
                              className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-200 outline-none
                      ${
                         errors.password
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-[#3298C8] hover:border-gray-300"
                      }`}
                              placeholder='Create a password'
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

                     {/* Confirm Password Field */}
                     <div>
                        <label
                           htmlFor='confirmPassword'
                           className='block text-sm font-semibold text-gray-700 mb-2'
                        >
                           Confirm Password
                        </label>
                        <div className='relative'>
                           <span className='absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400'>
                              <FontAwesomeIcon icon={faLock} />
                           </span>
                           <input
                              type={showConfirmPassword ? "text" : "password"}
                              id='confirmPassword'
                              name='confirmPassword'
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              minLength={8}
                              maxLength={16}
                              className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-200 outline-none
                      ${
                         errors.confirmPassword
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-[#3298C8] hover:border-gray-300"
                      }`}
                              placeholder='Confirm your password'
                           />
                           <button
                              type='button'
                              onClick={() =>
                                 setShowConfirmPassword(!showConfirmPassword)
                              }
                              className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#3298C8] transition-colors'
                           >
                              <FontAwesomeIcon
                                 icon={showConfirmPassword ? faEyeSlash : faEye}
                              />
                           </button>
                        </div>
                        {errors.confirmPassword && (
                           <p className='mt-2 text-sm text-red-500'>
                              {errors.confirmPassword}
                           </p>
                        )}
                     </div>

                     {/* Terms Checkbox */}
                     <div className='flex items-start gap-3'>
                        <input
                           type='checkbox'
                           id='terms'
                           required
                           className='w-4 h-4 mt-1 rounded border-gray-300 text-[#3298C8] focus:ring-[#3298C8]'
                        />
                        <label
                           htmlFor='terms'
                           className='text-sm text-gray-600'
                        >
                           I agree to the{" "}
                           <Link
                              to='/terms'
                              className='text-[#3298C8] hover:underline font-medium'
                           >
                              Terms of Service
                           </Link>{" "}
                           and{" "}
                           <Link
                              to='/privacy'
                              className='text-[#3298C8] hover:underline font-medium'
                           >
                              Privacy Policy
                           </Link>
                        </label>
                     </div>

                     {/* Submit Button */}
                     <button
                        type='submit'
                        disabled={
                           isLoading ||
                           rolesLoading ||
                           availableRoles?.length === 0
                        }
                        className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300
                  ${
                     isLoading || rolesLoading || availableRoles?.length === 0
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
                              Creating Account...
                           </span>
                        ) : (
                           "Create Account"
                        )}
                     </button>
                  </form>

                  {/* Divider */}
                  <div className='relative my-6'>
                     <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-200'></div>
                     </div>
                     <div className='relative flex justify-center text-sm'>
                        <span className='px-4 bg-white text-gray-400'>
                           Already have an account?
                        </span>
                     </div>
                  </div>

                  {/* Sign In Link */}
                  <Link
                     to='/login'
                     className='block w-full py-4 rounded-xl font-bold text-[#3298C8] text-lg text-center border-2 border-[#3298C8] hover:bg-[#3298C8] hover:text-white transition-all duration-300'
                  >
                     Sign In
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Register;
