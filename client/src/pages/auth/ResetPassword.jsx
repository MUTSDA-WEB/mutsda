import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChurch, faLock } from "@fortawesome/free-solid-svg-icons";
import { resetPassword } from "../../services/passwordReset";

const ResetPassword = () => {
   const [email, setEmail] = useState("");
   const [pin, setPin] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (event) => {
      event.preventDefault();
      setError("");
      if (password.length < 8 || password.length > 16) {
         setError("Password must be between 8 and 16 characters");
         return;
      }
      if (password !== confirmPassword) {
         setError("Passwords do not match");
         return;
      }
      setLoading(true);
      try {
         if (!/^\d{6}$/.test(pin)) {
            setError("Enter the six-digit PIN from your email");
            return;
         }
         const response = await resetPassword(email, pin, password);
         setMessage(response.message);
      } catch (requestError) {
         setError(
            requestError.response?.data?.error || "Unable to reset password",
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 py-12'>
         <div className='w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden'>
            <div className='bg-[#3298C8] px-8 py-10 text-center'>
               <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-3'>
                  <FontAwesomeIcon
                     icon={faChurch}
                     className='text-white text-2xl'
                  />
               </div>
               <h1 className='text-2xl font-bold text-white'>
                  Create a new password
               </h1>
               <p className='text-sky-100 text-sm mt-2'>
                  Enter the PIN from your email and choose a new password.
               </p>
            </div>
            <div className='px-8 py-8'>
               {message ? (
                  <div className='rounded-xl border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700'>
                     {message}
                     <Link
                        to='/login'
                        className='mt-3 block font-semibold hover:underline'
                     >
                        Continue to sign in
                     </Link>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} className='space-y-5'>
                     {error && (
                        <div className='rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600'>
                           {error}
                        </div>
                     )}
                     <div>
                        <label
                           htmlFor='email'
                           className='block text-sm font-semibold text-gray-700 mb-2'
                        >
                           Email address
                        </label>
                        <input
                           id='email'
                           type='email'
                           required
                           value={email}
                           onChange={(event) => setEmail(event.target.value)}
                           className='w-full rounded-xl border-2 border-gray-200 py-3 px-4 outline-none focus:border-[#3298C8]'
                        />
                     </div>
                     <div>
                        <label
                           htmlFor='pin'
                           className='block text-sm font-semibold text-gray-700 mb-2'
                        >
                           Reset PIN
                        </label>
                        <input
                           id='pin'
                           inputMode='numeric'
                           pattern='[0-9]{6}'
                           maxLength={6}
                           required
                           value={pin}
                           onChange={(event) =>
                              setPin(
                                 event.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 6),
                              )
                           }
                           placeholder='000000'
                           className='w-full rounded-xl border-2 border-gray-200 py-3 px-4 text-center text-xl tracking-[0.5em] outline-none focus:border-[#3298C8]'
                        />
                     </div>
                     <div>
                        <label
                           htmlFor='password'
                           className='block text-sm font-semibold text-gray-700 mb-2'
                        >
                           New password
                        </label>
                        <div className='relative'>
                           <FontAwesomeIcon
                              icon={faLock}
                              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                           />
                           <input
                              id='password'
                              type='password'
                              minLength={8}
                              maxLength={16}
                              required
                              value={password}
                              onChange={(event) =>
                                 setPassword(event.target.value)
                              }
                              className='w-full rounded-xl border-2 border-gray-200 py-3 pl-12 pr-4 outline-none focus:border-[#3298C8]'
                           />
                        </div>
                     </div>
                     <div>
                        <label
                           htmlFor='confirmPassword'
                           className='block text-sm font-semibold text-gray-700 mb-2'
                        >
                           Confirm password
                        </label>
                        <input
                           id='confirmPassword'
                           type='password'
                           minLength={8}
                           maxLength={16}
                           required
                           value={confirmPassword}
                           onChange={(event) =>
                              setConfirmPassword(event.target.value)
                           }
                           className='w-full rounded-xl border-2 border-gray-200 py-3 px-4 outline-none focus:border-[#3298C8]'
                        />
                     </div>
                     <button
                        type='submit'
                        disabled={loading}
                        className='w-full rounded-xl bg-[#3298C8] py-4 font-bold text-white hover:bg-sky-600 disabled:bg-gray-400'
                     >
                        {loading ? "Resetting..." : "Reset password"}
                     </button>
                  </form>
               )}
            </div>
         </div>
      </div>
   );
};

export default ResetPassword;
