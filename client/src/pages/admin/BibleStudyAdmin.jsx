// import { useState } from "react";
// import useStore from "../../hooks/useStore";

// const BibleStudyAdmin = () => {
//    const { user } = useStore();
//    const [form, setForm] = useState({
//       Topic: "",
//       schedule: [
//          { subtopic: "", group: "", day: "", time: "", coordinator: "" },
//       ],
//       Resources: "",
//    });
//    const [success, setSuccess] = useState(false);

//    //   if (!user || user.role !== "prophecy") return <div>Access denied</div>;

//    const handleChange = (e) => {
//       const { name, value } = e.target;
//       setForm((prev) => ({ ...prev, [name]: value }));
//    };

//    const handleScheduleChange = (idx, e) => {
//       const { name, value } = e.target;
//       setForm((prev) => {
//          const schedule = [...prev.schedule];
//          schedule[idx][name] = value;
//          return { ...prev, schedule };
//       });
//    };

//    const addSchedule = () => {
//       setForm((prev) => ({
//          ...prev,
//          schedule: [
//             ...prev.schedule,
//             { subtopic: "", group: "", day: "", time: "", coordinator: "" },
//          ],
//       }));
//    };

//    const removeSchedule = (index) => {
//       setForm((prev) => ({
//          ...prev,
//          schedule: prev.schedule.filter((_, i) => i !== index),
//       }));
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       // TODO: Call upsertBibleStudy API
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//    };

//    return (
//       <div className='max-w-2xl mx-auto py-12 px-6 bg-white rounded-2xl shadow-sm border border-gray-100'>
//          <h2 className='text-2xl font-semibold text-sky-700'>
//             Update Bible Study
//          </h2>

//          <p className='mt-2 text-sm text-gray-500'>
//             Add the main topic, then create the discussion days and provide the
//             details for each day.
//          </p>
//          <form onSubmit={handleSubmit} className='space-y-6 mt-8'>
//             {/* Topic */}
//             <div>
//                <label className='block text-sm font-medium text-gray-700 mb-2'>
//                   Topic
//                </label>
//                <input
//                   name='Topic'
//                   value={form.Topic}
//                   onChange={handleChange}
//                   className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition'
//                   required
//                />
//             </div>

//             {/* Schedule */}
//             <div>
//                <label className='block text-sm font-medium text-gray-700 mb-3'>
//                   Schedule
//                </label>

//                <div className='space-y-4'>
//                   {form.schedule.map((s, idx) => (
//                      <div
//                         key={idx}
//                         className='bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4'
//                      >
//                         {/* Header Row */}
//                         <div className='flex items-center justify-between'>
//                            <span className='text-sm font-medium text-gray-600'>
//                               Day {idx + 1}
//                            </span>

//                            {form.schedule.length > 1 && (
//                               <button
//                                  type='button'
//                                  onClick={() => removeSchedule(idx)}
//                                  className='w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition text-lg font-semibold'
//                               >
//                                  −
//                               </button>
//                            )}
//                         </div>

//                         {/* Inputs */}
//                         <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
//                            <input
//                               name='subtopic'
//                               value={s.subtopic}
//                               onChange={(e) => handleScheduleChange(idx, e)}
//                               placeholder='Subtopic'
//                               className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none'
//                            />
//                            <input
//                               name='group'
//                               value={s.group}
//                               onChange={(e) => handleScheduleChange(idx, e)}
//                               placeholder='Group'
//                               className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none'
//                            />
//                            <input
//                               name='day'
//                               value={s.day}
//                               onChange={(e) => handleScheduleChange(idx, e)}
//                               placeholder='Day'
//                               className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none'
//                            />
//                            <input
//                               name='time'
//                               value={s.time}
//                               onChange={(e) => handleScheduleChange(idx, e)}
//                               placeholder='Time'
//                               className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none'
//                            />
//                            <input
//                               name='coordinator'
//                               value={s.coordinator}
//                               onChange={(e) => handleScheduleChange(idx, e)}
//                               placeholder='Coordinator'
//                               className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none sm:col-span-2'
//                            />
//                         </div>
//                      </div>
//                   ))}
//                </div>

//                <button
//                   type='button'
//                   onClick={addSchedule}
//                   className='mt-4 text-sm font-medium text-sky-600 hover:text-sky-700 transition'
//                >
//                   + Add Day
//                </button>
//             </div>

//             {/* Resources */}
//             <div>
//                <label className='block text-sm font-medium text-gray-700 mb-2'>
//                   Resources (comma separated)
//                </label>
//                <input
//                   name='Resources'
//                   value={form.Resources}
//                   onChange={handleChange}
//                   className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition'
//                />
//             </div>

//             {/* Submit */}
//             <button
//                type='submit'
//                className='w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition shadow-sm'
//             >
//                Update
//             </button>

//             {success && (
//                <div className='mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm'>
//                   Bible Study updated successfully.
//                </div>
//             )}
//          </form>
//       </div>
//    );
// };

// export default BibleStudyAdmin;

import { useState, useEffect } from "react";
import useStore from "../../hooks/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faBook } from "@fortawesome/free-solid-svg-icons";

const BibleStudyAdmin = () => {
   const { user, siteData } = useStore();

   // Use siteData.bibleStudy if available, else fallback to default
   const [form, setForm] = useState({
      Topic: "",
      schedule: [
         { subtopic: "", group: "", day: "", time: "", coordinator: "" },
      ],
      Resources: "",
   });

   useEffect(() => {
      if (siteData && siteData.bibleStudy) {
         setForm({
            Topic: siteData.bibleStudy.Topic || "",
            schedule:
               Array.isArray(siteData.bibleStudy.schedule) &&
               siteData.bibleStudy.schedule.length > 0
                  ? siteData.bibleStudy.schedule
                  : [
                       {
                          subtopic: "",
                          group: "",
                          day: "",
                          time: "",
                          coordinator: "",
                       },
                    ],
            Resources: siteData.bibleStudy.Resources || "",
         });
      }
   }, [siteData]);

   const [isEditing, setIsEditing] = useState(false);
   const [success, setSuccess] = useState(false);

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
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
   };

   const handleDelete = () => {
      // TODO: Call delete API
      alert("Delete topic");
   };

   return (
      <div className='max-w-3xl mx-auto py-10 px-8 bg-white rounded-2xl shadow-lg border border-gray-200'>
         {/* ===================== VIEW MODE ===================== */}
         {!isEditing && (
            <>
               <div className='flex justify-between items-center mb-8'>
                  <div className='flex items-center gap-3'>
                     <div className='bg-sky-100 p-3 rounded-full text-sky-600'>
                        <FontAwesomeIcon icon={faBook} size='lg' />
                     </div>
                     <div>
                        <h2 className='text-2xl font-bold text-sky-700'>
                           {form.Topic}
                        </h2>
                        <p className='text-xs text-gray-400 mt-1'>
                           Bible Study Topic
                        </p>
                     </div>
                  </div>
                  <div className='flex gap-2'>
                     <button
                        onClick={() => setIsEditing(true)}
                        className='p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition border border-sky-200'
                        title='Edit'
                     >
                        <FontAwesomeIcon icon={faEdit} />
                     </button>
                     <button
                        onClick={handleDelete}
                        className='p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition border border-red-200'
                        title='Delete'
                     >
                        <FontAwesomeIcon icon={faTrash} />
                     </button>
                  </div>
               </div>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                     <h4 className='text-base font-bold text-sky-700 mb-3 tracking-wide'>
                        Current Schedule
                     </h4>
                     <ul className='space-y-4'>
                        {form.schedule.map((s, idx) => (
                           <li
                              key={idx}
                              className='bg-linear-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2'
                           >
                              <div className='flex items-center gap-2 mb-1'>
                                 <span className='inline-block bg-sky-200 text-sky-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider'>
                                    {s.day || "Day"}
                                 </span>
                                 <span className='text-xs text-gray-400'>
                                    {s.time}
                                 </span>
                              </div>
                              <div className='text-lg font-extrabold text-sky-800 mb-1'>
                                 {s.subtopic || (
                                    <span className='italic text-gray-400'>
                                       No subtopic
                                    </span>
                                 )}
                              </div>
                              <div className='flex flex-wrap gap-2 text-xs text-gray-600'>
                                 <span className='bg-gray-100 px-2 py-1 rounded font-semibold'>
                                    Group: {s.group || "-"}
                                 </span>
                                 <span className='bg-gray-100 px-2 py-1 rounded font-semibold'>
                                    Coordinator: {s.coordinator || "-"}
                                 </span>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div>
                     <h4 className='text-base font-bold text-sky-700 mb-3 tracking-wide'>
                        Resources
                     </h4>
                     <div className='bg-white border border-gray-200 rounded-2xl p-5 text-base text-gray-700 font-medium shadow-sm'>
                        {form.Resources}
                     </div>
                  </div>
               </div>
               {success && (
                  <div className='mt-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm'>
                     Bible Study updated successfully.
                  </div>
               )}
            </>
         )}

         {/* ===================== EDIT MODE ===================== */}
         {isEditing && (
            <form onSubmit={handleSubmit} className='space-y-6 mt-4'>
               <h2 className='text-xl font-bold text-sky-700 mb-2'>
                  Edit Bible Study
               </h2>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                     <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Topic
                     </label>
                     <input
                        name='Topic'
                        value={form.Topic}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition mb-4'
                        required
                     />
                     <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Resources
                     </label>
                     <input
                        name='Resources'
                        value={form.Resources}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition'
                     />
                  </div>
                  <div>
                     <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Schedule
                     </label>
                     <div className='space-y-4'>
                        {form.schedule.map((s, idx) => (
                           <div
                              key={idx}
                              className='bg-gray-50 border border-gray-200 rounded-xl p-4'
                           >
                              <div className='flex justify-between items-center mb-2'>
                                 <span className='text-xs font-semibold text-gray-600'>
                                    Day {idx + 1}
                                 </span>
                                 {form.schedule.length > 1 && (
                                    <button
                                       type='button'
                                       onClick={() => removeSchedule(idx)}
                                       className='text-red-500 text-xs hover:underline'
                                    >
                                       Remove
                                    </button>
                                 )}
                              </div>
                              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                                 <input
                                    name='subtopic'
                                    value={s.subtopic}
                                    onChange={(e) =>
                                       handleScheduleChange(idx, e)
                                    }
                                    placeholder='Subtopic'
                                    className='border border-gray-300 rounded-lg px-3 py-2 text-xs'
                                 />
                                 <input
                                    name='group'
                                    value={s.group}
                                    onChange={(e) =>
                                       handleScheduleChange(idx, e)
                                    }
                                    placeholder='Group'
                                    className='border border-gray-300 rounded-lg px-3 py-2 text-xs'
                                 />
                                 <input
                                    name='day'
                                    value={s.day}
                                    onChange={(e) =>
                                       handleScheduleChange(idx, e)
                                    }
                                    placeholder='Day'
                                    className='border border-gray-300 rounded-lg px-3 py-2 text-xs'
                                 />
                                 <input
                                    name='time'
                                    value={s.time}
                                    onChange={(e) =>
                                       handleScheduleChange(idx, e)
                                    }
                                    placeholder='Time'
                                    className='border border-gray-300 rounded-lg px-3 py-2 text-xs'
                                 />
                                 <input
                                    name='coordinator'
                                    value={s.coordinator}
                                    onChange={(e) =>
                                       handleScheduleChange(idx, e)
                                    }
                                    placeholder='Coordinator'
                                    className='border border-gray-300 rounded-lg px-3 py-2 text-xs sm:col-span-2'
                                 />
                              </div>
                           </div>
                        ))}
                        <button
                           type='button'
                           onClick={addSchedule}
                           className='mt-2 text-sky-600 text-xs hover:underline'
                        >
                           + Add Day
                        </button>
                     </div>
                  </div>
               </div>
               <div className='flex gap-4 mt-6'>
                  <button
                     type='submit'
                     className='flex-1 bg-sky-600 text-white py-2 rounded-lg font-semibold hover:bg-sky-700 transition'
                  >
                     Save Changes
                  </button>
                  <button
                     type='button'
                     onClick={() => setIsEditing(false)}
                     className='flex-1 bg-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-300 transition'
                  >
                     Cancel
                  </button>
               </div>
            </form>
         )}
      </div>
   );
};

export default BibleStudyAdmin;
