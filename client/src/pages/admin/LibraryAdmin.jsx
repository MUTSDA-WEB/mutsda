import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faBook } from "@fortawesome/free-solid-svg-icons";

const LibraryAdmin = () => {
   const [hardCopies, setHardCopies] = useState([
      { name: "Bible Stories", count: "10", category: "Spiritual" },
   ]);
   const [softCopies, setSoftCopies] = useState([
      {
         name: "Hymnal PDF",
         downloadLink: "https://example.com/hymnal.pdf",
         category: "Music",
      },
   ]);
   const [form, setForm] = useState({
      name: "",
      count: "",
      category: "",
      downloadLink: "",
   });
   const [editing, setEditing] = useState({ type: null, idx: null });
   const [showForm, setShowForm] = useState(false);
   const [formType, setFormType] = useState(null); // 'hard' or 'soft'
   const [success, setSuccess] = useState(false);

   const handleFormChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleEdit = (type, idx) => {
      setForm(type === "hard" ? hardCopies[idx] : softCopies[idx]);
      setEditing({ type, idx });
      setFormType(type);
      setShowForm(true);
   };

   const handleDelete = (type, idx) => {
      if (type === "hard")
         setHardCopies((prev) => prev.filter((_, i) => i !== idx));
      else setSoftCopies((prev) => prev.filter((_, i) => i !== idx));
   };

   const handleAddNew = (type) => {
      setForm({ name: "", count: "", category: "", downloadLink: "" });
      setEditing({ type: null, idx: null });
      setFormType(type);
      setShowForm(true);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (formType === "hard") {
         if (editing.idx !== null) {
            setHardCopies((prev) =>
               prev.map((b, i) => (i === editing.idx ? form : b)),
            );
         } else {
            setHardCopies((prev) => [
               ...prev,
               { name: form.name, count: form.count, category: form.category },
            ]);
         }
      } else if (formType === "soft") {
         if (editing.idx !== null) {
            setSoftCopies((prev) =>
               prev.map((b, i) => (i === editing.idx ? form : b)),
            );
         } else {
            setSoftCopies((prev) => [
               ...prev,
               {
                  name: form.name,
                  downloadLink: form.downloadLink,
                  category: form.category,
               },
            ]);
         }
      }
      setShowForm(false);
      setEditing({ type: null, idx: null });
      setFormType(null);
      setForm({ name: "", count: "", category: "", downloadLink: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
   };

   return (
      <div className='max-w-2xl mx-auto py-12 px-6 bg-white rounded-2xl shadow-sm border border-gray-100'>
         <h1 className='text-3xl font-bold text-blue-700 mb-2'>
            Communication Board
         </h1>
         <p className='mb-6 text-gray-500'>
            Manage and update the church library records.
         </p>

         {/* Hard Copy Cards */}
         <h3 className='text-lg font-semibold text-blue-700 mb-2'>
            Hard Copies
         </h3>
         <div className='grid gap-4 mb-6'>
            {hardCopies.map((b, idx) => (
               <div
                  key={idx}
                  className='flex items-center bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm'
               >
                  <div className='shrink-0 mr-4'>
                     <span className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-200 text-blue-700'>
                        <FontAwesomeIcon icon={faBook} size='lg' />
                     </span>
                  </div>
                  <div className='flex-1'>
                     <div className='font-semibold text-lg text-blue-800'>
                        {b.name}
                     </div>
                     <div className='text-sm text-gray-600'>
                        Category: {b.category}
                     </div>
                     <div className='text-xs text-gray-500 mt-1'>
                        Count: {b.count}
                     </div>
                  </div>
                  <div className='flex flex-col gap-2 ml-4'>
                     <button
                        onClick={() => handleEdit("hard", idx)}
                        className='p-2 rounded-full bg-white border border-gray-200 text-blue-600 hover:bg-blue-100'
                        title='Edit'
                     >
                        <FontAwesomeIcon icon={faEdit} />
                     </button>
                     <button
                        onClick={() => handleDelete("hard", idx)}
                        className='p-2 rounded-full bg-white border border-gray-200 text-blue-600 hover:bg-blue-100'
                        title='Delete'
                     >
                        <FontAwesomeIcon icon={faTrash} />
                     </button>
                  </div>
               </div>
            ))}
         </div>
         <button
            onClick={() => handleAddNew("hard")}
            className='mb-8 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition'
         >
            Add New Book
         </button>

         {/* Soft Copy Cards */}
         <h3 className='text-lg font-semibold text-blue-700 mb-2'>
            Soft Copies
         </h3>
         <div className='grid gap-4 mb-6'>
            {softCopies.map((b, idx) => (
               <div
                  key={idx}
                  className='flex items-center bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm'
               >
                  <div className='shrink-0 mr-4'>
                     <span className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-200 text-blue-700'>
                        <FontAwesomeIcon icon={faBook} size='lg' />
                     </span>
                  </div>
                  <div className='flex-1'>
                     <div className='font-semibold text-lg text-blue-800'>
                        {b.name}
                     </div>
                     <div className='text-sm text-gray-600'>
                        Category: {b.category}
                     </div>
                     <div className='text-xs text-gray-500 mt-1'>
                        <a
                           href={b.downloadLink}
                           className='underline text-blue-600'
                           target='_blank'
                           rel='noopener noreferrer'
                        >
                           Download
                        </a>
                     </div>
                  </div>
                  <div className='flex flex-col gap-2 ml-4'>
                     <button
                        onClick={() => handleEdit("soft", idx)}
                        className='p-2 rounded-full bg-white border border-gray-200 text-blue-600 hover:bg-blue-100'
                        title='Edit'
                     >
                        <FontAwesomeIcon icon={faEdit} />
                     </button>
                     <button
                        onClick={() => handleDelete("soft", idx)}
                        className='p-2 rounded-full bg-white border border-gray-200 text-blue-600 hover:bg-blue-100'
                        title='Delete'
                     >
                        <FontAwesomeIcon icon={faTrash} />
                     </button>
                  </div>
               </div>
            ))}
         </div>
         <button
            onClick={() => handleAddNew("soft")}
            className='mb-8 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition'
         >
            Add New Book
         </button>

         {/* Book Form */}
         {showForm && (
            <form onSubmit={handleSubmit} className='space-y-6 mb-4'>
               {formType === "hard" ? (
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                     <input
                        name='name'
                        value={form.name}
                        onChange={handleFormChange}
                        placeholder='Book Name'
                        className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        required
                     />
                     <input
                        name='count'
                        value={form.count}
                        onChange={handleFormChange}
                        placeholder='Count'
                        className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        required
                     />
                     <input
                        name='category'
                        value={form.category}
                        onChange={handleFormChange}
                        placeholder='Category'
                        className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        required
                     />
                  </div>
               ) : (
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                     <input
                        name='name'
                        value={form.name}
                        onChange={handleFormChange}
                        placeholder='Book Name'
                        className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        required
                     />
                     <input
                        name='downloadLink'
                        value={form.downloadLink}
                        onChange={handleFormChange}
                        placeholder='Download Link'
                        className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        required
                     />
                     <input
                        name='category'
                        value={form.category}
                        onChange={handleFormChange}
                        placeholder='Category'
                        className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        required
                     />
                  </div>
               )}
               <div className='flex gap-3'>
                  <button
                     type='submit'
                     className='py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm'
                  >
                     {editing.idx !== null ? "Update Book" : "Add Book"}
                  </button>
                  <button
                     type='button'
                     onClick={() => {
                        setShowForm(false);
                        setEditing({ type: null, idx: null });
                        setFormType(null);
                     }}
                     className='py-2 px-6 bg-gray-100 text-gray-700 rounded-lg font-medium border border-gray-200'
                  >
                     Cancel
                  </button>
               </div>
               {success && (
                  <div className='mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm'>
                     Library record updated successfully.
                  </div>
               )}
            </form>
         )}
      </div>
   );
};

export default LibraryAdmin;
