import { useState, useEffect } from "react";
import useStore from "../../hooks/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCalendarAlt,
   faEdit,
   faTrash,
} from "@fortawesome/free-solid-svg-icons";
const handleRemoveEvent = (idx) => {
   setForm((prev) => ({
      ...prev,
      event: prev.event.filter((_, i) => i !== idx),
   }));
};

const EventsAdmin = () => {
   const { user, siteData } = useStore();
   const [form, setForm] = useState({
      event: [
         {
            date: "",
            event: "",
            description: "",
         },
      ],
   });

   useEffect(() => {
      if (siteData && Array.isArray(siteData.events)) {
         setForm({
            event:
               siteData.events.length > 0
                  ? siteData.events
                  : [{ date: "", event: "", description: "" }],
         });
      }
   }, [siteData]);
   const [success, setSuccess] = useState(false);

   const allowedRoles = ["elder", "admin", "pastor"];

   if (!user || !allowedRoles.some((role) => user.role?.startsWith(role))) {
      return (
         <div className='max-w-2xl mx-auto mt-20 p-8 bg-white rounded-xl shadow border text-center text-red-600 text-lg font-semibold'>
            Access denied
         </div>
      );
   }
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

   return (
      <div className='max-w-3xl mx-auto py-10 px-8 bg-white rounded-2xl shadow-lg border border-gray-200'>
         <div className='flex items-center gap-3 mb-8'>
            <div className='bg-rose-100 p-3 rounded-full text-rose-600'>
               <FontAwesomeIcon icon={faCalendarAlt} size='lg' />
            </div>
            <div>
               <h2 className='text-2xl font-bold text-rose-700'>
                  Update Calendar of Events
               </h2>
               <p className='text-xs text-gray-400 mt-1'>
                  Add, edit, or remove upcoming church events for the calendar.
               </p>
            </div>
         </div>
         <form onSubmit={handleSubmit} className='space-y-8'>
            <div>
               <label className='block text-sm font-medium text-gray-700 mb-3'>
                  Events
               </label>
               <div className='space-y-4'>
                  {form.event.map((ev, idx) => (
                     <div
                        key={idx}
                        className='bg-gray-50 border border-gray-200 rounded-xl p-4'
                     >
                        <div className='flex items-center justify-between mb-2'>
                           <span className='text-xs font-semibold text-gray-600'>
                              Event {idx + 1}
                           </span>
                           {form.event.length > 1 && (
                              <button
                                 type='button'
                                 onClick={() => removeEvent(idx)}
                                 className='text-red-500 text-xs hover:underline'
                              >
                                 Remove
                              </button>
                           )}
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
                           <input
                              name='date'
                              value={ev.date}
                              onChange={(e) => handleEventChange(idx, e)}
                              placeholder='Date'
                              className='border border-gray-300 rounded-lg px-3 py-2 text-xs'
                           />
                           <input
                              name='event'
                              value={ev.event}
                              onChange={(e) => handleEventChange(idx, e)}
                              placeholder='Event'
                              className='border border-gray-300 rounded-lg px-3 py-2 text-xs'
                           />
                           <input
                              name='description'
                              value={ev.description}
                              onChange={(e) => handleEventChange(idx, e)}
                              placeholder='Description'
                              className='border border-gray-300 rounded-lg px-3 py-2 text-xs'
                           />
                        </div>
                     </div>
                  ))}
               </div>
               <button
                  type='button'
                  onClick={addEvent}
                  className='mt-2 text-rose-600 text-xs hover:underline'
               >
                  + Add Event
               </button>
            </div>
            <button
               type='submit'
               className='w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition shadow-sm'
            >
               Update
            </button>
            {success && (
               <div className='mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm'>
                  Events updated successfully.
               </div>
            )}
         </form>

         {/* Events Table */}
         <div className='mb-10 mt-10'>
            <h3 className='text-lg font-bold text-rose-700 mb-4'>
               Current Events
            </h3>
            <div className='overflow-x-auto'>
               <table className='min-w-full text-xs border rounded-xl'>
                  <thead className='bg-rose-50'>
                     <tr>
                        <th className='py-2 px-3 text-left font-semibold text-rose-700'>
                           Date
                        </th>
                        <th className='py-2 px-3 text-left font-semibold text-rose-700'>
                           Event
                        </th>
                        <th className='py-2 px-3 text-left font-semibold text-rose-700'>
                           Description
                        </th>
                        <th className='py-2 px-3 text-center font-semibold text-rose-700'>
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {form.event.map((ev, idx) => (
                        <tr key={idx} className='border-b last:border-b-0'>
                           <td className='py-2 px-3'>{ev.date}</td>
                           <td className='py-2 px-3'>{ev.event}</td>
                           <td className='py-2 px-3'>{ev.description}</td>
                           <td className='py-2 px-3 text-center flex gap-2 justify-center'>
                              <button
                                 className='text-rose-700 hover:text-rose-900'
                                 title='Edit'
                              >
                                 <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button
                                 className='text-red-500 hover:text-red-700'
                                 title='Remove'
                                 onClick={() => handleRemoveEvent(idx)}
                              >
                                 <FontAwesomeIcon icon={faTrash} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};
export default EventsAdmin;
