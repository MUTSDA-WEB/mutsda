import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCalendarPlus,
   faImage,
   faClock,
   faMapMarkerAlt,
   faUsers,
   faFileAlt,
   faTimes,
   faCheck,
   faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import userStore from "../../hooks/useStore";
import { useCreateEvent } from "../../services/events";
import GlobalLoader from "../../components/GlobalLoader";

const CreateEvent = () => {
   const navigate = useNavigate();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [showSuccess, setShowSuccess] = useState(false);
   const [formData, setFormData] = useState({
      title: "",
      description: "",
      eventStartDate: "",
      eventEndDate: "",
      startTime: "",
      endTime: "",
      location: "",
      category: "",
      maxAttendees: "",
      image: null,
      imagePreview: null,
   });
   const [errors, setErrors] = useState({});

   // calling the create event API Service
   const { data, isSuccess, isLoading, mutate: createEvent } = useCreateEvent();

   const categories = [
      "Youth Event",
      "Music Concert",
      "Bible Study",
      "Community Outreach",
      "Prayer Meeting",
      "Sabbath Service",
      "Social Event",
      "Workshop",
      "Other",
   ];

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
         setErrors((prev) => ({ ...prev, [name]: "" }));
      }
   };

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({
               ...prev,
               image: "Image must be less than 5MB",
            }));
            return;
         }
         setFormData((prev) => ({
            ...prev,
            image: file,
            imagePreview: URL.createObjectURL(file),
         }));
         setErrors((prev) => ({ ...prev, image: "" }));
      }
   };

   const removeImage = () => {
      setFormData((prev) => ({ ...prev, image: null, imagePreview: null }));
   };

   const validateForm = () => {
      const newErrors = {};
      if (!formData.title.trim()) newErrors.title = "Event title is required";
      if (!formData.description.trim())
         newErrors.description = "Description is required";
      if (!formData.eventStartDate) newErrors.date = "Date is required";
      if (!formData.startTime) newErrors.startTime = "Start time is required";
      if (!formData.location.trim())
         newErrors.location = "Location is required";
      if (!formData.category) newErrors.category = "Please select a category";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      createEvent(
         {},
         {
            onSuccess: () => {
               setIsSubmitting(false);
               setShowSuccess(true);
            },
         },
      );

      setIsSubmitting(true);

      console.log("Event Created:", formData);

      // Reset form after success

      setShowSuccess(false);
      setFormData({
         title: "",
         description: "",
         eventStartDate: "",
         eventEndDate: "",
         eventStartTime: "",
         eventEndTime: "",
         eventLocation: "",
         category: "",
         maxAttendees: "",
         imageURL: null,
         imagePreview: null,
      });
   };

   return (
      <div className='min-h-screen bg-gray-50 py-8 px-4 animate-fadeIn'>
         <div className='max-w-3xl mx-auto'>
            {/* Header */}
            <div className='mb-8'>
               <div className='flex items-center gap-4 mb-2'>
                  <div className='w-12 h-12 bg-linear-to-br from-[#3298C8] to-sky-600 rounded-xl flex items-center justify-center'>
                     <FontAwesomeIcon
                        icon={faCalendarPlus}
                        className='text-white text-xl'
                     />
                  </div>
                  <div>
                     <h1 className='text-2xl font-bold text-gray-800'>
                        Create New Event
                     </h1>
                     <p className='text-gray-500 text-sm'>
                        Fill in the details to create a new event
                     </p>
                  </div>
               </div>
            </div>

            {/* Form */}
            <form
               onSubmit={handleSubmit}
               className='bg-white rounded-2xl shadow-lg overflow-hidden'
            >
               <div className='p-8 space-y-6'>
                  {/* Event Title */}
                  <div>
                     <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Event Title <span className='text-red-500'>*</span>
                     </label>
                     <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='Enter event title...'
                        className={`w-full p-4 border rounded-xl outline-none transition-all ${
                           errors.title
                              ? "border-red-300 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:ring-2 focus:ring-[#3298C8]/30 focus:border-[#3298C8]"
                        }`}
                     />
                     {errors.title && (
                        <p className='mt-1 text-sm text-red-500'>
                           {errors.title}
                        </p>
                     )}
                  </div>

                  {/* Event Image - Placed early so it uploads to Cloudinary while user fills other fields */}
                  <div>
                     <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        <FontAwesomeIcon
                           icon={faImage}
                           className='mr-2 text-[#3298C8]'
                        />
                        Event Image
                     </label>
                     {formData.imagePreview ? (
                        <div className='relative rounded-xl overflow-hidden'>
                           <img
                              src={formData.imagePreview}
                              alt='Event preview'
                              className='w-full h-48 object-cover'
                           />
                           <button
                              type='button'
                              onClick={removeImage}
                              className='absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors'
                           >
                              <FontAwesomeIcon icon={faTimes} />
                           </button>
                        </div>
                     ) : (
                        <label className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#3298C8] hover:bg-sky-50/50 transition-all'>
                           <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                              <FontAwesomeIcon
                                 icon={faUpload}
                                 className='text-3xl text-gray-400 mb-3'
                              />
                              <p className='mb-2 text-sm text-gray-500'>
                                 <span className='font-semibold text-[#3298C8]'>
                                    Click to upload
                                 </span>{" "}
                                 or drag and drop
                              </p>
                              <p className='text-xs text-gray-400'>
                                 PNG, JPG or WEBP (MAX. 5MB)
                              </p>
                           </div>
                           <input
                              type='file'
                              accept='image/*'
                              onChange={handleImageChange}
                              className='hidden'
                           />
                        </label>
                     )}
                     {errors.image && (
                        <p className='mt-1 text-sm text-red-500'>
                           {errors.image}
                        </p>
                     )}
                  </div>

                  {/* Description */}
                  <div>
                     <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Description <span className='text-red-500'>*</span>
                     </label>
                     <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        placeholder='Describe your event...'
                        rows={4}
                        className={`w-full p-4 border rounded-xl outline-none transition-all resize-none ${
                           errors.description
                              ? "border-red-300 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:ring-2 focus:ring-[#3298C8]/30 focus:border-[#3298C8]"
                        }`}
                     />
                     {errors.description && (
                        <p className='mt-1 text-sm text-red-500'>
                           {errors.description}
                        </p>
                     )}
                  </div>

                  {/* Date Row */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                     {/* Start Date */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           <FontAwesomeIcon
                              icon={faCalendarPlus}
                              className='mr-2 text-[#3298C8]'
                           />
                           Start Date <span className='text-red-500'>*</span>
                        </label>
                        <input
                           type='date'
                           name='date'
                           value={formData.eventStartDate}
                           onChange={handleChange}
                           min={new Date().toISOString().split("T")[0]}
                           className={`w-full p-4 border rounded-xl outline-none transition-all ${
                              errors.date
                                 ? "border-red-300 focus:ring-2 focus:ring-red-200"
                                 : "border-gray-200 focus:ring-2 focus:ring-[#3298C8]/30 focus:border-[#3298C8]"
                           }`}
                        />
                        {errors.date && (
                           <p className='mt-1 text-sm text-red-500'>
                              {errors.date}
                           </p>
                        )}
                     </div>

                     {/* End Date */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           <FontAwesomeIcon
                              icon={faCalendarPlus}
                              className='mr-2 text-gray-400'
                           />
                           End Date
                        </label>
                        <input
                           type='date'
                           name='endDate'
                           value={formData.eventEndDate}
                           onChange={handleChange}
                           min={
                              formData.eventStartDate ||
                              new Date().toISOString().split("T")[0]
                           }
                           className='w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3298C8]/30 focus:border-[#3298C8] transition-all'
                        />
                     </div>
                  </div>

                  {/* Time Row */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                     {/* Start Time */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           <FontAwesomeIcon
                              icon={faClock}
                              className='mr-2 text-[#3298C8]'
                           />
                           Start Time <span className='text-red-500'>*</span>
                        </label>
                        <input
                           type='time'
                           name='startTime'
                           value={formData.startTime}
                           onChange={handleChange}
                           className={`w-full p-4 border rounded-xl outline-none transition-all ${
                              errors.startTime
                                 ? "border-red-300 focus:ring-2 focus:ring-red-200"
                                 : "border-gray-200 focus:ring-2 focus:ring-[#3298C8]/30 focus:border-[#3298C8]"
                           }`}
                        />
                        {errors.startTime && (
                           <p className='mt-1 text-sm text-red-500'>
                              {errors.startTime}
                           </p>
                        )}
                     </div>

                     {/* End Time */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           <FontAwesomeIcon
                              icon={faClock}
                              className='mr-2 text-gray-400'
                           />
                           End Time
                        </label>
                        <input
                           type='time'
                           name='endTime'
                           value={formData.endTime}
                           onChange={handleChange}
                           className='w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3298C8]/30 focus:border-[#3298C8] transition-all'
                        />
                     </div>
                  </div>

                  {/* Location */}
                  <div>
                     <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        <FontAwesomeIcon
                           icon={faMapMarkerAlt}
                           className='mr-2 text-[#3298C8]'
                        />
                        Location <span className='text-red-500'>*</span>
                     </label>
                     <input
                        type='text'
                        name='location'
                        value={formData.location}
                        onChange={handleChange}
                        placeholder='Enter event location...'
                        className={`w-full p-4 border rounded-xl outline-none transition-all ${
                           errors.location
                              ? "border-red-300 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:ring-2 focus:ring-[#3298C8]/30 focus:border-[#3298C8]"
                        }`}
                     />
                     {errors.location && (
                        <p className='mt-1 text-sm text-red-500'>
                           {errors.location}
                        </p>
                     )}
                  </div>

                  {/* Category and Max Attendees */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                     {/* Category */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           <FontAwesomeIcon
                              icon={faFileAlt}
                              className='mr-2 text-[#3298C8]'
                           />
                           Category <span className='text-red-500'>*</span>
                        </label>
                        <select
                           name='category'
                           value={formData.category}
                           onChange={handleChange}
                           className={`w-full p-4 border rounded-xl outline-none transition-all ${
                              errors.category
                                 ? "border-red-300 focus:ring-2 focus:ring-red-200"
                                 : "border-gray-200 focus:ring-2 focus:ring-[#3298C8]/30 focus:border-[#3298C8]"
                           }`}
                        >
                           <option value=''>Select a category</option>
                           {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                 {cat}
                              </option>
                           ))}
                        </select>
                        {errors.category && (
                           <p className='mt-1 text-sm text-red-500'>
                              {errors.category}
                           </p>
                        )}
                     </div>

                     {/* Max Attendees */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           <FontAwesomeIcon
                              icon={faUsers}
                              className='mr-2 text-gray-400'
                           />
                           Max Attendees (Optional)
                        </label>
                        <input
                           type='number'
                           name='maxAttendees'
                           value={formData.maxAttendees}
                           onChange={handleChange}
                           placeholder='Leave empty for unlimited'
                           min='1'
                           className='w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3298C8]/30 focus:border-[#3298C8] transition-all'
                        />
                     </div>
                  </div>
               </div>

               {/* Form Actions */}
               <div className='px-8 py-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-end'>
                  <button
                     type='button'
                     onClick={() => navigate("/dashboard")}
                     className='px-8 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-colors'
                  >
                     Cancel
                  </button>
                  <button
                     type='submit'
                     disabled={isSubmitting}
                     className='px-8 py-3 bg-linear-to-r from-[#3298C8] to-sky-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-sky-300/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                  >
                     {isSubmitting ? (
                        <>
                           <span className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                           Creating...
                        </>
                     ) : (
                        <>
                           <FontAwesomeIcon icon={faCalendarPlus} />
                           Create Event
                        </>
                     )}
                  </button>
               </div>
            </form>

            {/* Success Modal */}
            {showSuccess && (
               <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
                  <div className='bg-white rounded-2xl p-8 text-center animate-fadeIn max-w-sm w-full'>
                     <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <FontAwesomeIcon
                           icon={faCheck}
                           className='text-3xl text-green-500'
                        />
                     </div>
                     <h3 className='text-xl font-bold text-gray-800 mb-2'>
                        Event Created!
                     </h3>
                     <p className='text-gray-500'>
                        Your event has been created successfully.
                     </p>{" "}
                  </div>
               </div>
            )}
         </div>
         <GlobalLoader />
      </div>
   );
};

export default CreateEvent;
