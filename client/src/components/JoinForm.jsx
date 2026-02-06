import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSaveVisitorMessage } from "../services/message";

const JoinForm = ({
   isOpen,
   onClose,
   title = "Join Us",
   description = "Fill in your details below",
   buttonText = "Submit",
   darkMode = false,
   message,
}) => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phoneNumber: "",
   });
   const [submitted, setSubmitted] = useState(false);

   // save the userInfo
   const { mutate: saveMessage, isPending } = useSaveVisitorMessage();
   const handleSubmit = () => {
      saveMessage(
         {
            message,
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
         },
         {
            onSuccess: () => {
               setSubmitted(true);
               setFormData({ email: "", name: "", phoneNumber: "" });
               console.log("Join message sent successfully");
            },
            onError: (e) =>
               console.log(
                  "Failed to save join message",
                  message,
                  "Error: ",
                  e.message,
               ),
         },
      );
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   if (!isOpen) return null;

   const baseInputClass = darkMode
      ? "w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-500"
      : "w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#3298C8] outline-none transition-all placeholder:text-gray-400";

   const labelClass = darkMode
      ? "text-xs font-bold text-gray-400 uppercase ml-1"
      : "text-xs font-bold text-gray-500 uppercase ml-1";

   const buttonClass = darkMode
      ? "w-full bg-amber-500 hover:bg-amber-400 text-black py-4 rounded-2xl font-bold transition-all disabled:opacity-50"
      : "w-full bg-[#3298C8] hover:bg-sky-700 text-white py-4 rounded-2xl font-bold transition-all disabled:opacity-50";

   return (
      <div className='mt-6 animate-fadeIn'>
         {/* Header with close button */}
         <div className='flex items-center justify-between mb-4'>
            <div>
               <h4
                  className={`font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
               >
                  {title}
               </h4>
               <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
               >
                  {description}
               </p>
            </div>
            {onClose && (
               <button
                  onClick={onClose}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                     darkMode
                        ? "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                  }`}
               >
                  <FontAwesomeIcon icon={faTimes} />
               </button>
            )}
         </div>

         {submitted ? (
            <div
               className={`p-8 rounded-2xl text-center ${darkMode ? "bg-green-900/30" : "bg-green-50"}`}
            >
               <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                     darkMode ? "bg-green-500" : "bg-green-500"
                  }`}
               >
                  <FontAwesomeIcon
                     icon={faCheck}
                     className='text-white text-2xl'
                  />
               </div>
               <p
                  className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}
               >
                  Thank you for joining!
               </p>
               <p
                  className={`text-sm ${darkMode ? "text-green-300/70" : "text-green-600"}`}
               >
                  We'll be in touch soon.
               </p>
            </div>
         ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
               <div className='space-y-1'>
                  <label className={labelClass}>Full Name</label>
                  <input
                     type='text'
                     name='name'
                     value={formData.name}
                     onChange={handleChange}
                     placeholder='e.g. John Doe'
                     required
                     className={baseInputClass}
                  />
               </div>
               <div className='space-y-1'>
                  <label className={labelClass}>Email Address</label>
                  <input
                     type='email'
                     name='email'
                     value={formData.email}
                     onChange={handleChange}
                     placeholder='e.g. john@example.com'
                     required
                     className={baseInputClass}
                  />
               </div>
               <div className='space-y-1'>
                  <label className={labelClass}>Phone Number</label>
                  <input
                     type='tel'
                     name='phoneNumber'
                     value={formData.phoneNumber}
                     onChange={handleChange}
                     placeholder='+254...'
                     required
                     className={baseInputClass}
                  />
               </div>
               <button
                  type='submit'
                  disabled={isPending}
                  className={buttonClass}
               >
                  {isPending ? (
                     <span className='flex items-center justify-center gap-2'>
                        <FontAwesomeIcon
                           icon={faSpinner}
                           className='animate-spin'
                        />
                        Submitting...
                     </span>
                  ) : (
                     buttonText
                  )}
               </button>
            </form>
         )}
      </div>
   );
};

export default JoinForm;
