import { useState } from "react";
import useStore from "../../hooks/useStore";

const EventsAdmin = () => {
   const { user } = useStore();
   const [form, setForm] = useState({
      event: [{ date: "", event: "", description: "" }],
   });
   const [success, setSuccess] = useState(false);

   //   if (!user || user.role !== "personalMinistry") return <div>Access denied</div>;

   const handleEventChange = (idx, e) => {
      const { name, value } = e.target;
      setForm((prev) => {
         const event = [...prev.event];
         event[idx][name] = value;
         return { ...prev, event };
      });
   };

   const addEvent = () => {
      setForm((prev) => ({
         ...prev,
         event: [...prev.event, { date: "", event: "", description: "" }],
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // TODO: Call upsertEventsCalendar API
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
   };

   const removeEvent = (index) => {
      setForm((prev) => ({
         ...prev,
         event: prev.event.filter((_, i) => i !== index),
      }));
   };

   return (
      <div className='max-w-2xl mx-auto py-12 px-6 bg-white rounded-2xl shadow-sm border border-gray-100'>
         <h2 className='text-2xl font-semibold text-rose-700'>
            Update Calendar of Events
         </h2>
         <p className='mt-2 text-sm text-gray-500'>
            Add, edit, or remove upcoming church events for the calendar.
         </p>
         <form onSubmit={handleSubmit} className='space-y-6 mt-8'>
            <div>
               <label className='block text-sm font-medium text-gray-700 mb-3'>
                  Events
               </label>
               <div className='space-y-4'>
                  {form.event.map((ev, idx) => (
                     <div
                        key={idx}
                        className='bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4'
                     >
                        <div className='flex items-center justify-between'>
                           <span className='text-sm font-medium text-gray-600'>
                              Event {idx + 1}
                           </span>
                           {form.event.length > 1 && (
                              <button
                                 type='button'
                                 onClick={() => removeEvent(idx)}
                                 className='w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition text-lg font-semibold'
                              >
                                 −
                              </button>
                           )}
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                           <input
                              type='date'
                              name='date'
                              value={ev.date}
                              onChange={(e) => handleEventChange(idx, e)}
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:outline-none'
                           />
                           <input
                              name='event'
                              value={ev.event}
                              onChange={(e) => handleEventChange(idx, e)}
                              placeholder='Event Name'
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:outline-none'
                           />
                           <input
                              name='description'
                              value={ev.description}
                              onChange={(e) => handleEventChange(idx, e)}
                              placeholder='Description'
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:outline-none'
                           />
                        </div>
                     </div>
                  ))}
               </div>
               <button
                  type='button'
                  onClick={addEvent}
                  className='mt-4 text-sm font-medium text-rose-600 hover:text-rose-700 transition'
               >
                  + Add Event
               </button>
            </div>
            <button
               type='submit'
               className='w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition shadow-sm'
            >
               Update
            </button>
            {success && (
               <div className='mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm'>
                  Calendar updated successfully.
               </div>
            )}
         </form>
      </div>
   );
};

export default EventsAdmin;
