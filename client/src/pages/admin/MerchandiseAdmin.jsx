import { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faStore,
   faEdit,
   faSave,
   faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useUpdateSiteData } from "../../services/data.service";

const MerchandiseAdmin = () => {
   const { user, siteData } = useStore();
   const [products, setProducts] = useState([]);
   // Load products from siteData.merchandise if available
   useEffect(() => {
      if (siteData && Array.isArray(siteData.merchandise)) {
         setProducts(siteData.merchandise);
      }
   }, [siteData]);
   const { mutate: updateSiteData, isPending: isSaving } = useUpdateSiteData();
   const [form, setForm] = useState({
      name: "",
      description: "",
      price: "",
      productImage: "",
   });
   const [editIdx, setEditIdx] = useState(null);
   const [adding, setAdding] = useState(false);
   const [success, setSuccess] = useState(false);

   const allowedRoles = ["elder", "admin", "pastor"];

   if (!user || !allowedRoles.some((role) => user.role?.startsWith(role))) {
      return (
         <div className='max-w-2xl mx-auto mt-20 p-8 bg-white rounded-xl shadow border text-center text-red-600 text-lg font-semibold'>
            Access denied
         </div>
      );
   }

   const handleProductChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "productImage" && files && files[0]) {
         const reader = new FileReader();
         reader.onload = (ev) => {
            setForm((prev) => ({ ...prev, productImage: ev.target.result }));
         };
         reader.readAsDataURL(files[0]);
      } else {
         setForm((prev) => ({ ...prev, [name]: value }));
      }
   };

   const addProduct = () => {
      setForm({ name: "", description: "", price: "", productImage: "" });
      setAdding(true);
      setEditIdx(null);
   };

   const handleSave = () => {
      if (editIdx !== null) {
         setProducts(products.map((p, idx) => (idx === editIdx ? form : p)));
      } else {
         setProducts([...products, form]);
      }
      setForm({ name: "", description: "", price: "", productImage: "" });
      setAdding(false);
      setEditIdx(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
   };

   const handleEdit = (idx) => {
      setForm(products[idx]);
      setEditIdx(idx);
      setAdding(true);
   };

   const handleCancel = () => {
      setForm({ name: "", description: "", price: "", productImage: "" });
      setAdding(false);
      setEditIdx(null);
   };

   const handleDelete = (idx) => {
      setProducts(products.filter((_, i) => i !== idx));
      setSuccess(true);
      updateSiteData(["merchandise", products], {
         onSuccess: () => {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
         },
         onError: () => {
            alert("Failed to update merchandise");
         },
      });
      setTimeout(() => setSuccess(false), 2000);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // TODO: Call upsertMerchandise API
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
   };

   return (
      <div className='max-w-4xl mx-auto py-10 px-8 bg-white rounded-2xl shadow-lg border border-gray-200'>
         <div className='flex items-center gap-3 mb-8'>
            <div className='bg-green-100 p-3 rounded-full text-green-600'>
               <FontAwesomeIcon icon={faStore} size='lg' />
            </div>
            <div>
               <h2 className='text-2xl font-bold text-green-700'>
                  Manage Merchandise
               </h2>
               <p className='text-xs text-gray-400 mt-1'>
                  View, edit, or remove merchandise products for the church
                  store.
               </p>
            </div>
         </div>

         {/* Merchandise Cards */}
         <div className='mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {products.map((p, idx) => (
               <div
                  key={idx}
                  className='bg-linear-to-br from-green-50 to-white border border-green-200 rounded-2xl p-6 flex flex-col items-center shadow group hover:shadow-lg transition-all duration-200'
               >
                  {p.productImage ? (
                     <img
                        src={p.productImage}
                        alt={p.name}
                        className='w-28 h-28 object-cover rounded-xl mb-4 border-2 border-green-200 shadow-sm'
                     />
                  ) : (
                     <div className='w-28 h-28 flex items-center justify-center bg-gray-200 rounded-xl mb-4 text-gray-400 text-lg font-semibold'>
                        No Image
                     </div>
                  )}
                  <h4 className='text-lg font-extrabold text-green-800 mb-1 tracking-wide'>
                     {p.name}
                  </h4>
                  <p className='text-sm text-gray-600 mb-2 text-center'>
                     {p.description}
                  </p>
                  <p className='text-base text-green-700 font-bold mb-3'>
                     ${p.price}
                  </p>
                  <div className='flex gap-2'>
                     <button
                        className='text-green-700 hover:text-green-900 bg-green-100 p-2 rounded-full shadow-sm transition'
                        onClick={() => handleEdit(idx)}
                        title='Edit'
                     >
                        <FontAwesomeIcon icon={faEdit} />
                     </button>
                     <button
                        className='text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-full shadow-sm transition'
                        onClick={() => handleDelete(idx)}
                        title='Delete'
                     >
                        <FontAwesomeIcon icon={faTimes} />
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {/* Add/Edit Product Form */}
         {adding && (
            <div className='mb-8 bg-green-50 border border-green-200 rounded-xl p-6'>
               <h4 className='font-semibold text-green-700 mb-4'>
                  {editIdx !== null ? "Edit Product" : "Add New Product"}
               </h4>
               <div className='grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4'>
                  <input
                     name='name'
                     value={form.name}
                     onChange={handleProductChange}
                     placeholder='Name'
                     className='border border-gray-300 rounded px-2 py-1'
                  />
                  <input
                     name='description'
                     value={form.description}
                     onChange={handleProductChange}
                     placeholder='Description'
                     className='border border-gray-300 rounded px-2 py-1'
                  />
                  <input
                     name='price'
                     value={form.price}
                     onChange={handleProductChange}
                     placeholder='Price'
                     className='border border-gray-300 rounded px-2 py-1'
                  />
                  <input
                     name='productImage'
                     type='file'
                     accept='image/*'
                     onChange={handleProductChange}
                     className='border border-gray-300 rounded px-2 py-1 bg-white'
                  />
               </div>
               {form.productImage && (
                  <img
                     src={form.productImage}
                     alt='Preview'
                     className='w-20 h-20 object-cover rounded mb-3 border'
                  />
               )}
               <div className='flex gap-3'>
                  <button
                     className='px-4 py-2 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700'
                     onClick={handleSave}
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

         <button
            type='button'
            onClick={addProduct}
            className='mb-6 px-4 py-2 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700'
         >
            + Add Product
         </button>

         {success && (
            <div className='mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm'>
               Merchandise updated successfully.
            </div>
         )}
      </div>
   );
   //                <div className='mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm'>
   //                   Merchandise updated successfully.
   //                </div>
   //             )}
   //          </form>
   //       </div>
   //    );
};

export default MerchandiseAdmin;
