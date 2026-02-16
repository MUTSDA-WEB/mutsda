import { useState } from "react";
import useStore from "../../hooks/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faBook,
   faEdit,
   faTrash,
   faSave,
   faPlus,
   faTimes,
} from "@fortawesome/free-solid-svg-icons";

// Sample initial data (can be replaced with API data)
const initialBooks = [
   {
      id: 1,
      title: "King James Version",
      author: "Various",
      category: "Bible",
      format: "PDF",
      size: "2.4 MB",
      type: "softcopy",
      downloadUrl: "https://example.com/kjv.pdf",
   },
   {
      id: 2,
      title: "SDA Hymnal",
      author: "Various",
      category: "Music",
      format: "PDF",
      size: "5.1 MB",
      type: "softcopy",
      downloadUrl: "https://example.com/hymnal.pdf",
   },
   {
      id: 3,
      title: "Patriarchs and Prophets",
      author: "E.G. White",
      category: "SOP",
      format: "PDF",
      size: "3.2 MB",
      type: "hardcopy",
      downloadUrl: "",
   },
];

const LibraryAdmin = () => {
   const { user } = useStore();
   const [books, setBooks] = useState(initialBooks);
   const [editId, setEditId] = useState(null);
   const [form, setForm] = useState({
      title: "",
      author: "",
      category: "",
      format: "PDF",
      size: "",
      type: "softcopy",
      downloadUrl: "",
   });
   const [adding, setAdding] = useState(false);
   const [success, setSuccess] = useState(false);

   const handleEdit = (book) => {
      setEditId(book.id);
      setForm({
         ...book,
         type: book.type || "softcopy",
         downloadUrl: book.downloadUrl || "",
      });
      setAdding(false);
   };

   const handleDelete = (id) => {
      setBooks(books.filter((b) => b.id !== id));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
   };

   const handleSave = () => {
      setBooks(
         books.map((b) => (b.id === editId ? { ...form, id: editId } : b)),
      );
      setEditId(null);
      setForm({
         title: "",
         author: "",
         category: "",
         format: "PDF",
         size: "",
         type: "softcopy",
         downloadUrl: "",
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
   };

   const handleAdd = () => {
      const newBook = {
         ...form,
         id: Date.now(),
      };
      setBooks([...books, newBook]);
      setForm({
         title: "",
         author: "",
         category: "",
         format: "PDF",
         size: "",
         type: "softcopy",
         downloadUrl: "",
      });
      setAdding(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
   };

   const handleCancel = () => {
      setEditId(null);
      setAdding(false);
      setForm({ title: "", author: "", category: "", format: "PDF", size: "" });
   };

   const allowedRoles = ["elder", "admin", "pastor"];

   if (!user || !allowedRoles.some((role) => user.role?.startsWith(role))) {
      return (
         <div className='max-w-2xl mx-auto mt-20 p-8 bg-white rounded-xl shadow border text-center text-red-600 text-lg font-semibold'>
            Access denied
         </div>
      );
   }
   return (
      <div className='max-w-4xl mx-auto py-10 px-8 bg-white rounded-2xl shadow-lg border border-gray-200'>
         <div className='flex items-center gap-3 mb-8'>
            <div className='bg-blue-100 p-3 rounded-full text-blue-600'>
               <FontAwesomeIcon icon={faBook} size='lg' />
            </div>
            <div>
               <h2 className='text-2xl font-bold text-blue-700'>
                  Manage Library Resources
               </h2>
               <p className='text-xs text-gray-400 mt-1'>
                  View, edit, or remove books and resources in the church
                  library.
               </p>
            </div>
         </div>

         {/* Book List */}
         <div className='mb-8'>
            <div className='flex justify-between items-center mb-4'>
               <h3 className='text-lg font-semibold text-gray-700'>
                  Available Books
               </h3>
               <button
                  className='flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition'
                  onClick={() => {
                     setAdding(true);
                     setEditId(null);
                     setForm({
                        title: "",
                        author: "",
                        category: "",
                        format: "PDF",
                        size: "",
                     });
                  }}
               >
                  <FontAwesomeIcon icon={faPlus} /> Add Book
               </button>
            </div>
            <div className='overflow-x-auto'>
               <table className='min-w-full text-xs border rounded-xl'>
                  <thead className='bg-gray-50'>
                     <tr>
                        <th className='py-2 px-3 text-left font-semibold text-gray-600'>
                           Title
                        </th>
                        <th className='py-2 px-3 text-left font-semibold text-gray-600'>
                           Author
                        </th>
                        <th className='py-2 px-3 text-left font-semibold text-gray-600'>
                           Category
                        </th>
                        <th className='py-2 px-3 text-left font-semibold text-gray-600'>
                           Format
                        </th>
                        <th className='py-2 px-3 text-left font-semibold text-gray-600'>
                           Size
                        </th>
                        <th className='py-2 px-3 text-left font-semibold text-gray-600'>
                           Type
                        </th>
                        <th className='py-2 px-3 text-left font-semibold text-gray-600'>
                           Download
                        </th>
                        <th className='py-2 px-3 text-center font-semibold text-gray-600'>
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {books.map((book) => (
                        <tr key={book.id} className='border-b last:border-b-0'>
                           {editId === book.id ? (
                              <>
                                 <td className='py-2 px-3'>
                                    <input
                                       className='border border-gray-300 rounded px-2 py-1 w-full'
                                       value={form.title}
                                       onChange={(e) =>
                                          setForm({
                                             ...form,
                                             title: e.target.value,
                                          })
                                       }
                                       placeholder='Title'
                                    />
                                 </td>
                                 <td className='py-2 px-3'>
                                    <input
                                       className='border border-gray-300 rounded px-2 py-1 w-full'
                                       value={form.author}
                                       onChange={(e) =>
                                          setForm({
                                             ...form,
                                             author: e.target.value,
                                          })
                                       }
                                       placeholder='Author'
                                    />
                                 </td>
                                 <td className='py-2 px-3'>
                                    <input
                                       className='border border-gray-300 rounded px-2 py-1 w-full'
                                       value={form.category}
                                       onChange={(e) =>
                                          setForm({
                                             ...form,
                                             category: e.target.value,
                                          })
                                       }
                                       placeholder='Category'
                                    />
                                 </td>
                                 <td className='py-2 px-3'>
                                    <input
                                       className='border border-gray-300 rounded px-2 py-1 w-full'
                                       value={form.format}
                                       onChange={(e) =>
                                          setForm({
                                             ...form,
                                             format: e.target.value,
                                          })
                                       }
                                       placeholder='Format'
                                    />
                                 </td>
                                 <td className='py-2 px-3'>
                                    <input
                                       className='border border-gray-300 rounded px-2 py-1 w-full'
                                       value={form.size}
                                       onChange={(e) =>
                                          setForm({
                                             ...form,
                                             size: e.target.value,
                                          })
                                       }
                                       placeholder='Size'
                                    />
                                 </td>
                                 <td className='py-2 px-3 text-center flex gap-2 justify-center'>
                                    <button
                                       className='text-green-600 hover:text-green-800'
                                       onClick={handleSave}
                                       type='button'
                                    >
                                       <FontAwesomeIcon icon={faSave} />
                                    </button>
                                    <button
                                       className='text-gray-400 hover:text-gray-600'
                                       onClick={handleCancel}
                                       type='button'
                                    >
                                       <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                 </td>
                              </>
                           ) : (
                              <>
                                 <td className='py-2 px-3'>{book.title}</td>
                                 <td className='py-2 px-3'>{book.author}</td>
                                 <td className='py-2 px-3'>{book.category}</td>
                                 <td className='py-2 px-3'>{book.format}</td>
                                 <td className='py-2 px-3'>{book.size}</td>
                                 <td className='py-2 px-3 capitalize'>
                                    {book.type || "softcopy"}
                                 </td>
                                 <td className='py-2 px-3'>
                                    {book.type === "softcopy" &&
                                    book.downloadUrl ? (
                                       <a
                                          href={book.downloadUrl}
                                          target='_blank'
                                          rel='noopener noreferrer'
                                          className='text-blue-600 underline'
                                       >
                                          Download
                                       </a>
                                    ) : (
                                       <span className='text-gray-400'>-</span>
                                    )}
                                 </td>
                                 <td className='py-2 px-3 text-center flex gap-2 justify-center'>
                                    <button
                                       className='text-blue-600 hover:text-blue-800'
                                       onClick={() => handleEdit(book)}
                                       type='button'
                                    >
                                       <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                       className='text-red-500 hover:text-red-700'
                                       onClick={() => handleDelete(book.id)}
                                       type='button'
                                    >
                                       <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                 </td>
                              </>
                           )}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Add Book Form */}
         {adding && (
            <div className='mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6'>
               <h4 className='font-semibold text-blue-700 mb-4'>
                  Add New Book
               </h4>
               <div className='grid grid-cols-1 sm:grid-cols-6 gap-3 mb-4'>
                  <input
                     className='border border-gray-300 rounded px-2 py-1'
                     value={form.title}
                     onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                     }
                     placeholder='Title'
                  />
                  <input
                     className='border border-gray-300 rounded px-2 py-1'
                     value={form.author}
                     onChange={(e) =>
                        setForm({ ...form, author: e.target.value })
                     }
                     placeholder='Author'
                  />
                  <input
                     className='border border-gray-300 rounded px-2 py-1'
                     value={form.category}
                     onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                     }
                     placeholder='Category'
                  />
                  <input
                     className='border border-gray-300 rounded px-2 py-1'
                     value={form.format}
                     onChange={(e) =>
                        setForm({ ...form, format: e.target.value })
                     }
                     placeholder='Format'
                  />
                  <input
                     className='border border-gray-300 rounded px-2 py-1'
                     value={form.size}
                     onChange={(e) =>
                        setForm({ ...form, size: e.target.value })
                     }
                     placeholder='Size'
                  />
                  <select
                     className='border border-gray-300 rounded px-2 py-1'
                     value={form.type}
                     onChange={(e) =>
                        setForm({ ...form, type: e.target.value })
                     }
                  >
                     <option value='softcopy'>Softcopy</option>
                     <option value='hardcopy'>Hardcopy</option>
                  </select>
               </div>
               {form.type === "softcopy" && (
                  <div className='mb-4'>
                     <label className='block text-xs font-semibold text-blue-700 mb-1'>
                        Download URL
                     </label>
                     <input
                        className='border border-blue-300 rounded px-2 py-1 w-full text-sm'
                        value={form.downloadUrl}
                        onChange={(e) =>
                           setForm({ ...form, downloadUrl: e.target.value })
                        }
                        placeholder='Download URL (for softcopy)'
                        required
                     />
                  </div>
               )}
               <div className='flex gap-3'>
                  <button
                     className='px-4 py-2 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700'
                     onClick={handleAdd}
                     type='button'
                  >
                     <FontAwesomeIcon icon={faSave} /> Save
                  </button>
                  <button
                     className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs hover:bg-gray-300'
                     onClick={handleCancel}
                     type='button'
                  >
                     Cancel
                  </button>
               </div>
            </div>
         )}

         {/* Success Message */}
         {success && (
            <div className='mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm'>
               Library updated successfully.
            </div>
         )}
      </div>
   );
};

export default LibraryAdmin;
