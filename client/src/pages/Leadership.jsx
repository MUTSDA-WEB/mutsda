import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faEnvelope,
   faQuoteLeft,
   faUsers,
   faPhone,
   faTimes,
   faSpinner,
   faCheck,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../hooks/useStore";
import { useGetMembers } from "../services/user";
import { useSaveVisitorMessage } from "../services/message";
import NoEvents from "../components/empty/NoEvents";

const Leadership = () => {
   const { isAuthenticated, members: boardMembers, setMembers } = useStore();
   const [activeMessageForm, setActiveMessageForm] = useState(null);
   const [formData, setFormData] = useState({
      name: "",
      phoneNumber: "",
      email: "",
      subject: "",
      message: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitted, setSubmitted] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   // save visitor message hook
   const { mutate: saveMessage, isLoading: saveLoading } =
      useSaveVisitorMessage();

   // load real members from the db
   const { data, isSuccess, isLoading } = useGetMembers();
   useEffect(() => {
      if (data && isSuccess) setMembers(data.leaders);
   }, [data, isSuccess]);

   const handleSubmit = async (e, leaderId) => {
      e.preventDefault();
      setIsSubmitting(true);

      // save Visitor message to db
      saveMessage(
         {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            topic: formData.subject,
            receiverId: leaderId,
            message: formData.message,
         },
         {
            onSuccess: () => {
               setIsSubmitting(false);
               setSubmitted(true);
               setFormData({
                  name: "",
                  phoneNumber: "",
                  email: "",
                  subject: "",
                  message: "",
               });
               setActiveMessageForm(null);
            },

            onError: (e) => {
               console.log(e.message);
            },
         },
      );
   };

   return (
      <div className='bg-[#F6EBEB] min-h-screen font-sans'>
         {/* Hero Section with Glassmorphism */}
         <section className='relative min-h-[60vh] flex items-center justify-center overflow-hidden'>
            {/* Background Image */}
            <div className='absolute inset-0 z-0'>
               <img
                  src='https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop'
                  alt='Leadership Background'
                  className='w-full h-full object-cover scale-105 animate-slow-zoom'
               />
               {/* Gradient Overlays */}
               <div className='absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-[#F6EBEB]'></div>
               <div className='absolute inset-0 bg-linear-to-r from-[#3298C8]/30 to-transparent'></div>
            </div>

            {/* Floating Decorative Elements */}
            <div className='absolute top-20 left-10 w-64 h-64 bg-[#3298C8]/20 rounded-full blur-3xl animate-pulse'></div>
            <div className='absolute bottom-20 right-10 w-80 h-80 bg-sky-400/15 rounded-full blur-3xl animate-pulse delay-1000'></div>

            {/* Glassmorphism Card */}
            <div className='relative z-10 text-center px-6 py-12 max-w-3xl mx-auto'>
               <div className='backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 md:p-14 shadow-2xl'>
                  {/* Decorative Line */}
                  <div className='flex items-center justify-center gap-4 mb-6'>
                     <span className='w-12 h-0.5 bg-white/60'></span>
                     <FontAwesomeIcon
                        icon={faUsers}
                        className='text-4xl text-white/80'
                     />
                     <span className='w-12 h-0.5 bg-white/60'></span>
                  </div>

                  <h1 className='text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight'>
                     <span className='bg-linear-to-r from-white via-white to-sky-200 bg-clip-text text-transparent drop-shadow-lg'>
                        Meet Our Board
                     </span>
                  </h1>

                  <p className='text-lg md:text-xl text-white/90 max-w-xl mx-auto font-light leading-relaxed'>
                     The leadership of MUTSDA is committed to the spiritual
                     growth and service of our community.
                  </p>

                  {/* Decorative Bottom Accent */}
                  <div className='mt-8 flex justify-center'>
                     <div className='w-24 h-1 bg-linear-to-r from-transparent via-[#3298C8] to-transparent rounded-full'></div>
                  </div>
               </div>
            </div>
         </section>

         <div className='max-w-6xl mx-auto py-12 px-6'>
            {boardMembers.length > 0 ? (
               boardMembers.map((member, index) => (
                  <div
                     key={index}
                     className={`flex flex-col md:flex-row items-start gap-12 py-20 border-b border-sky-200/50 last:border-0 ${
                        index % 2 !== 0 ? "md:flex-row-reverse" : ""
                     }`}
                  >
                     <div className='w-full md:w-1/2'>
                        <div className='relative group'>
                           <div
                              className={`absolute -inset-3 bg-[#3298C8]/10 rounded-2xl transform transition-transform group-hover:rotate-0 ${
                                 index % 2 === 0 ? "rotate-3" : "-rotate-3"
                              }`}
                           ></div>
                           <img
                              src={member?.imageURL}
                              alt={member?.userName}
                              className='w-full h-112.5 object-cover rounded-xl shadow-xl border-4 border-white'
                           />
                        </div>
                     </div>

                     <div className='w-full md:w-1/2 space-y-6'>
                        {activeMessageForm === index ? (
                           /* Message Form - Replaces Leader Info */
                           <div className='bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-scaleIn'>
                              <div className='flex items-center justify-between mb-6'>
                                 <div className='flex items-center gap-4'>
                                    <img
                                       src={member?.imageURL}
                                       alt={member?.userName}
                                       className='w-14 h-14 rounded-full object-cover border-2 border-[#3298C8]'
                                    />
                                    <div>
                                       <h4 className='font-bold text-gray-800'>
                                          Message {member?.userName}
                                       </h4>
                                       <p className='text-sm text-gray-500'>
                                          {member?.role}
                                       </p>
                                    </div>
                                 </div>
                                 <button
                                    onClick={() => setActiveMessageForm(null)}
                                    className='w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-colors'
                                 >
                                    <FontAwesomeIcon icon={faTimes} />
                                 </button>
                              </div>

                              {submitted ? (
                                 <div className='p-8 rounded-2xl bg-green-50 text-center'>
                                    <div className='w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-4'>
                                       <FontAwesomeIcon
                                          icon={faCheck}
                                          className='text-white text-2xl'
                                       />
                                    </div>
                                    <p className='font-bold text-green-700'>
                                       Message Sent!
                                    </p>
                                    <p className='text-sm text-green-600'>
                                       {member?.name.split(" ")[0]} will get
                                       back to you soon.
                                    </p>
                                 </div>
                              ) : (
                                 <form
                                    onSubmit={(e) =>
                                       handleSubmit(e, member?.userID)
                                    }
                                    className='space-y-4'
                                 >
                                    <div className='space-y-1'>
                                       <label className='text-xs font-bold text-gray-500 uppercase ml-1'>
                                          Your Name
                                       </label>
                                       <input
                                          type='text'
                                          name='name'
                                          value={formData.name}
                                          onChange={handleChange}
                                          placeholder='e.g. John Doe'
                                          required
                                          className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#3298C8] outline-none transition-all placeholder:text-gray-400'
                                       />
                                    </div>
                                    <div className='grid grid-cols-2 gap-4'>
                                       <div className='space-y-1'>
                                          <label className='text-xs font-bold text-gray-500 uppercase ml-1'>
                                             Phone Number
                                          </label>
                                          <input
                                             type='tel'
                                             name='phoneNumber'
                                             value={formData.phoneNumber}
                                             onChange={handleChange}
                                             placeholder='+254...'
                                             required
                                             className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#3298C8] outline-none transition-all placeholder:text-gray-400'
                                          />
                                       </div>
                                       <div className='space-y-1'>
                                          <label className='text-xs font-bold text-gray-500 uppercase ml-1'>
                                             Email
                                          </label>
                                          <input
                                             type='email'
                                             name='email'
                                             value={formData.email}
                                             onChange={handleChange}
                                             placeholder='email@example.com'
                                             required
                                             className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#3298C8] outline-none transition-all placeholder:text-gray-400'
                                          />
                                       </div>
                                    </div>
                                    <div className='space-y-1'>
                                       <label className='text-xs font-bold text-gray-500 uppercase ml-1'>
                                          Subject
                                       </label>
                                       <input
                                          type='text'
                                          name='subject'
                                          value={formData.subject}
                                          onChange={handleChange}
                                          placeholder='What is this about?'
                                          required
                                          className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#3298C8] outline-none transition-all placeholder:text-gray-400'
                                       />
                                    </div>
                                    <div className='space-y-1'>
                                       <label className='text-xs font-bold text-gray-500 uppercase ml-1'>
                                          Message
                                       </label>
                                       <textarea
                                          name='message'
                                          value={formData.message}
                                          onChange={handleChange}
                                          placeholder='Write your message here...'
                                          required
                                          rows={4}
                                          className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#3298C8] outline-none transition-all placeholder:text-gray-400 resize-none'
                                       />
                                    </div>
                                    <button
                                       type='submit'
                                       disabled={isSubmitting}
                                       className='w-full bg-[#3298C8] hover:bg-sky-700 text-white py-4 rounded-2xl font-bold transition-all disabled:opacity-50'
                                    >
                                       {isSubmitting || isLoading ? (
                                          <span className='flex items-center justify-center gap-2'>
                                             <FontAwesomeIcon
                                                icon={faSpinner}
                                                className='animate-spin'
                                             />
                                             Sending...
                                          </span>
                                       ) : (
                                          "Send Message"
                                       )}
                                    </button>
                                 </form>
                              )}
                           </div>
                        ) : (
                           /* Leader Info - Default View */
                           <>
                              <div className='space-y-1'>
                                 <span className='text-[#3298C8] font-bold text-xs uppercase tracking-[0.3em] block mb-2'>
                                    {member?.dept}
                                 </span>
                                 <h2 className='text-4xl font-bold text-gray-900 leading-tight'>
                                    {member?.name}
                                 </h2>
                                 <p className='text-lg text-gray-500 font-medium tracking-wide'>
                                    {member?.role}
                                 </p>
                              </div>

                              <div className='bg-white p-4 rounded-2xl shadow-sm space-y-3'>
                                 <h4 className='text-xs font-bold text-[#3298C8] uppercase tracking-wider'>
                                    Contact Information
                                 </h4>
                                 <div className='flex items-center gap-3 text-gray-600'>
                                    <FontAwesomeIcon
                                       icon={faPhone}
                                       className='text-[#3298C8]'
                                    />
                                    <span>{member?.phone}</span>
                                 </div>
                                 <div className='flex items-center gap-3 text-gray-600'>
                                    <FontAwesomeIcon
                                       icon={faEnvelope}
                                       className='text-[#3298C8]'
                                    />
                                    <span>{member?.email}</span>
                                 </div>
                              </div>

                              <div className='relative pt-6'>
                                 <FontAwesomeIcon
                                    icon={faQuoteLeft}
                                    className='text-[#3298C8] opacity-10 text-6xl absolute -top-2 -left-4'
                                 />
                                 <p className='text-xl text-gray-600 italic leading-relaxed relative z-10'>
                                    &quot;{member?.quote}&quot;
                                 </p>
                              </div>

                              {!isAuthenticated && (
                                 <div className='pt-4'>
                                    <button
                                       onClick={() =>
                                          setActiveMessageForm(index)
                                       }
                                       className='inline-flex items-center gap-3 bg-[#3298C8] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg hover:shadow-sky-200/50 active:scale-95'
                                    >
                                       <FontAwesomeIcon icon={faEnvelope} />
                                       Message {member?.name.split(" ")[0]}
                                    </button>
                                 </div>
                              )}
                           </>
                        )}
                     </div>
                  </div>
               ))
            ) : (
               <NoEvents />
            )}
         </div>
      </div>
   );
};

export default Leadership;
