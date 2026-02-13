import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faTimes,
   faEnvelope,
   faPhone,
   faSpinner,
   faCheckCircle,
   faUser,
} from "@fortawesome/free-solid-svg-icons";

const AddBoardMemberForm = ({
   onClose,
   onSuccess,
   isLoading,
   error,
   isOpen,
}) => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phoneNumber: "",
      role: "elder1",
   });
   const [submitted, setSubmitted] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleClose = useCallback(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phoneNumber: "", role: "elder1" });
      onClose();
   }, [onClose]);

   const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
      // Call the mutation and let the parent handle the async operation
      onSuccess(formData);
   };

   // Auto-close after showing success message
   useEffect(() => {
      if (submitted && !isLoading && !error) {
         const timer = setTimeout(() => {
            handleClose();
         }, 2000);
         return () => clearTimeout(timer);
      }
   }, [submitted, isLoading, error, handleClose]);

   if (!isOpen) return null;

   // Show success message when loading is done and onSuccess was called
   if (submitted && !isLoading && !error) {
      return (
         <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center'>
               <div className='mb-4'>
                  <FontAwesomeIcon
                     icon={faCheckCircle}
                     className='text-green-500 text-5xl'
                  />
               </div>
               <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                  Board Member Added Successfully!
               </h2>
               <p className='text-gray-600 mb-6'>
                  A welcome email with login credentials has been sent to the
                  provided email address.
               </p>
               <button
                  onClick={handleClose}
                  className='w-full bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all'
               >
                  Close
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
         <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col'>
            {/* Header */}
            <div className='sticky top-0 z-10 bg-linear-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between'>
               <h2 className='text-xl font-bold text-white'>
                  Add New Board Member
               </h2>
               <button
                  onClick={onClose}
                  disabled={isLoading}
                  className='text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors disabled:opacity-50'
               >
                  <FontAwesomeIcon icon={faTimes} className='text-lg' />
               </button>
            </div>

            {/* Form Content */}
            <form
               onSubmit={handleSubmit}
               className='flex-1 overflow-y-auto p-6'
            >
               {error && (
                  <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
                     <p className='text-sm text-red-700'>{error}</p>
                  </div>
               )}

               {/* Name Field */}
               <div className='mb-6'>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                     Full Name <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                     <FontAwesomeIcon
                        icon={faUser}
                        className='absolute left-3 top-3 text-gray-400'
                     />
                     <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='John Doe'
                        required
                        disabled={isLoading}
                        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'
                     />
                  </div>
               </div>

               {/* Email Field */}
               <div className='mb-6'>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                     Email Address <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                     <FontAwesomeIcon
                        icon={faEnvelope}
                        className='absolute left-3 top-3 text-gray-400'
                     />
                     <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='member@example.com'
                        required
                        disabled={isLoading}
                        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'
                     />
                  </div>
                  <p className='text-xs text-gray-500 mt-1'>
                     A welcome email with login credentials will be sent to this
                     address
                  </p>
               </div>

               {/* Phone Number Field */}
               <div className='mb-6'>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                     Phone Number <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                     <FontAwesomeIcon
                        icon={faPhone}
                        className='absolute left-3 top-3 text-gray-400'
                     />
                     <input
                        type='tel'
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder='1234567890'
                        required
                        disabled={isLoading}
                        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'
                     />
                  </div>
               </div>

               {/* Role Selection */}
               <div className='mb-6'>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                     Board Role <span className='text-red-500'>*</span>
                  </label>
                  <select
                     name='role'
                     value={formData.role}
                     onChange={handleChange}
                     disabled={isLoading}
                     className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white'
                  >
                     <option value='elder1'>Elder 1</option>
                     <option value='elder2'>Elder 2</option>
                     <option value='elder3'>Elder 3</option>
                     <option value='pastor'>Pastor</option>
                     <option value='headDeacon'>Head Deacon</option>
                     <option value='headDeaconness'>Head Deaconness</option>
                     <option value='treasurer'>Treasurer</option>
                     <option value='clerk'>Clerk</option>
                  </select>
               </div>

               {/* Info Box */}
               <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
                  <p className='text-sm text-blue-800'>
                     <strong>Note:</strong> A default username and password will
                     be automatically generated and sent via email. The member
                     should change their password on first login.
                  </p>
               </div>
            </form>

            {/* Footer */}
            <div className='sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3'>
               <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
               >
                  Cancel
               </button>
               <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className='flex-1 px-4 py-2 bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
               >
                  {isLoading && (
                     <FontAwesomeIcon
                        icon={faSpinner}
                        className='animate-spin'
                     />
                  )}
                  {isLoading ? "Adding..." : "Add Board Member"}
               </button>
            </div>
         </div>
      </div>
   );
};

AddBoardMemberForm.propTypes = {
   onClose: PropTypes.func.isRequired,
   onSuccess: PropTypes.func.isRequired,
   isLoading: PropTypes.bool,
   error: PropTypes.string,
   isOpen: PropTypes.bool,
};

export default AddBoardMemberForm;
