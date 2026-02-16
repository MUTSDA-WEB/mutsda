import { useState } from "react";
import useStore from "../../hooks/useStore";

const BibleStudyAdmin = () => {
   const { user } = useStore();
   const [form, setForm] = useState({
      Topic: "",
      schedule: [
         { subtopic: "", group: "", day: "", time: "", coordinator: "" },
      ],
      Resources: "",
   });
   const [success, setSuccess] = useState(false);

   //   if (!user || user.role !== "prophecy") return <div>Access denied</div>;

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleScheduleChange = (idx, e) => {
      const { name, value } = e.target;
      setForm((prev) => {
         const schedule = [...prev.schedule];
         schedule[idx][name] = value;
         return { ...prev, schedule };
      });
   };

   const addSchedule = () => {
      setForm((prev) => ({
         ...prev,
         schedule: [
            ...prev.schedule,
            { subtopic: "", group: "", day: "", time: "", coordinator: "" },
         ],
      }));
   };

   const removeSchedule = (index) => {
      setForm((prev) => ({
         ...prev,
         schedule: prev.schedule.filter((_, i) => i !== index),
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // TODO: Call upsertBibleStudy API
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
   };

   return (
      <div className='max-w-2xl mx-auto py-12 px-6 bg-white rounded-2xl shadow-sm border border-gray-100'>
         <h2 className='text-2xl font-semibold text-sky-700'>
            Update Bible Study
         </h2>

         <p className='mt-2 text-sm text-gray-500'>
            Add the main topic, then create the discussion days and provide the
            details for each day.
         </p>
         <form onSubmit={handleSubmit} className='space-y-6 mt-8'>
            {/* Topic */}
            <div>
               <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Topic
               </label>
               <input
                  name='Topic'
                  value={form.Topic}
                  onChange={handleChange}
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition'
                  required
               />
            </div>

            {/* Schedule */}
            <div>
               <label className='block text-sm font-medium text-gray-700 mb-3'>
                  Schedule
               </label>

               <div className='space-y-4'>
                  {form.schedule.map((s, idx) => (
                     <div
                        key={idx}
                        className='bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4'
                     >
                        {/* Header Row */}
                        <div className='flex items-center justify-between'>
                           <span className='text-sm font-medium text-gray-600'>
                              Day {idx + 1}
                           </span>

                           {form.schedule.length > 1 && (
                              <button
                                 type='button'
                                 onClick={() => removeSchedule(idx)}
                                 className='w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition text-lg font-semibold'
                              >
                                 −
                              </button>
                           )}
                        </div>

                        {/* Inputs */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                           <input
                              name='subtopic'
                              value={s.subtopic}
                              onChange={(e) => handleScheduleChange(idx, e)}
                              placeholder='Subtopic'
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none'
                           />
                           <input
                              name='group'
                              value={s.group}
                              onChange={(e) => handleScheduleChange(idx, e)}
                              placeholder='Group'
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none'
                           />
                           <input
                              name='day'
                              value={s.day}
                              onChange={(e) => handleScheduleChange(idx, e)}
                              placeholder='Day'
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none'
                           />
                           <input
                              name='time'
                              value={s.time}
                              onChange={(e) => handleScheduleChange(idx, e)}
                              placeholder='Time'
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none'
                           />
                           <input
                              name='coordinator'
                              value={s.coordinator}
                              onChange={(e) => handleScheduleChange(idx, e)}
                              placeholder='Coordinator'
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none sm:col-span-2'
                           />
                        </div>
                     </div>
                  ))}
               </div>

               <button
                  type='button'
                  onClick={addSchedule}
                  className='mt-4 text-sm font-medium text-sky-600 hover:text-sky-700 transition'
               >
                  + Add Day
               </button>
            </div>

            {/* Resources */}
            <div>
               <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Resources (comma separated)
               </label>
               <input
                  name='Resources'
                  value={form.Resources}
                  onChange={handleChange}
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition'
               />
            </div>

            {/* Submit */}
            <button
               type='submit'
               className='w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition shadow-sm'
            >
               Update
            </button>

            {success && (
               <div className='mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm'>
                  Bible Study updated successfully.
               </div>
            )}
         </form>
      </div>
   );
};

export default BibleStudyAdmin;
