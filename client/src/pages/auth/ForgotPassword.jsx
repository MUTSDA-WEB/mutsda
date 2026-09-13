import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faChurch } from "@fortawesome/free-solid-svg-icons";
import { requestPasswordReset } from "../../services/passwordReset";

const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (event) => {
      event.preventDefault();
      setError("");
      setMessage("");
      setLoading(true);
      try {
         const response = await requestPasswordReset(email);
         setMessage(response.message);
      } catch (requestError) {
         setError(
            requestError.response?.data?.error || "Unable to send reset link",
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
                  Forgot password?
               </h1>
               <p className='text-sky-100 text-sm mt-2'>
                  We will send a six-digit reset PIN to your email.
               </p>
            </div>
            <div className='px-8 py-8'>
               {message && (
                  <div className='mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700'>
                     <p>{message}</p>
                     <Link
                        to='/reset-password'
                        className='mt-3 block text-center font-semibold text-[#3298C8] hover:underline'
                     >
                        Enter reset PIN
                     </Link>
                  </div>
               )}
               {error && (
                  <div className='mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600'>
                     {error}
                  </div>
               )}
               <form onSubmit={handleSubmit} className='space-y-5'>
                  <div>
                     <label
                        htmlFor='email'
                        className='block text-sm font-semibold text-gray-700 mb-2'
                     >
                        Email Address
                     </label>
                     <div className='relative'>
                        <FontAwesomeIcon
                           icon={faEnvelope}
                           className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                        />
                        <input
                           id='email'
                           type='email'
                           required
                           value={email}
                           onChange={(event) => setEmail(event.target.value)}
                           placeholder='Enter your email'
                           className='w-full rounded-xl border-2 border-gray-200 py-3 pl-12 pr-4 outline-none focus:border-[#3298C8]'
                        />
                     </div>
                  </div>
                  <button
                     type='submit'
                     disabled={loading}
                     className='w-full rounded-xl bg-[#3298C8] py-4 font-bold text-white hover:bg-sky-600 disabled:bg-gray-400'
                  >
                     {loading ? "Sending..." : "Send reset PIN"}
                  </button>
               </form>
               <Link
                  to='/login'
                  className='mt-6 block text-center text-sm font-medium text-[#3298C8] hover:underline'
               >
                  Back to sign in
               </Link>
            </div>
         </div>
      </div>
   );
};

export default ForgotPassword;
