import { useState } from "react";
import useStore from "../../hooks/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";

const MerchandiseAdmin = () => {
   const { user } = useStore();
   const [form, setForm] = useState({
      products: [{ name: "", description: "", price: "", productImage: "" }],
   });
   const [success, setSuccess] = useState(false);

   const allowedRoles = ["elder", "admin", "pastor"];

   if (!user || !allowedRoles.some((role) => user.role?.startsWith(role))) {
      return (
         <div className='max-w-2xl mx-auto mt-20 p-8 bg-white rounded-xl shadow border text-center text-red-600 text-lg font-semibold'>
            Access denied
         </div>
      );
   }

   const handleProductChange = (idx, e) => {
      const { name, value } = e.target;
      setForm((prev) => {
         const products = [...prev.products];
         products[idx][name] = value;
         return { ...prev, products };
      });
   };

   const addProduct = () => {
      setForm((prev) => ({
         ...prev,
         products: [
            ...prev.products,
            { name: "", description: "", price: "", productImage: "" },
         ],
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // TODO: Call upsertMerchandise API
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
   };

   return (
      <div className='max-w-3xl mx-auto py-10 px-8 bg-white rounded-2xl shadow-lg border border-gray-200'>
         <div className='flex items-center gap-3 mb-8'>
            <div className='bg-green-100 p-3 rounded-full text-green-600'>
               <FontAwesomeIcon icon={faStore} size='lg' />
            </div>
            <div>
               <h2 className='text-2xl font-bold text-green-700'>
                  Update Merchandise
               </h2>
               <p className='text-xs text-gray-400 mt-1'>
                  Add, edit, or remove merchandise products for the church
                  store.
               </p>
            </div>
         </div>
         <form onSubmit={handleSubmit} className='space-y-8'>
            <div>
               <label className='block text-sm font-medium text-gray-700 mb-3'>
                  Products
               </label>
               <div className='space-y-4'>
                  {form.products.map((p, idx) => (
                     <div
                        key={idx}
                        className='bg-gray-50 border border-gray-200 rounded-xl p-4'
                     >
                        <div className='flex items-center justify-between mb-2'>
                           <span className='text-xs font-semibold text-gray-600'>
                              Product {idx + 1}
                           </span>
                           {form.products.length > 1 && (
                              <button
                                 type='button'
                                 onClick={() => removeProduct(idx)}
                                 className='text-red-500 text-xs hover:underline'
                              >
                                 Remove
                              </button>
                           )}
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-4 gap-2'>
                           <input
                              name='name'
                              value={p.name}
                              onChange={(e) => handleProductChange(idx, e)}
                              placeholder='Name'
                              className='border border-gray-300 rounded-lg px-3 py-2 text-xs'
                           />
                           <input
                              name='description'
                              value={p.description}
                              onChange={(e) => handleProductChange(idx, e)}
                              placeholder='Description'
                              className='border border-gray-300 rounded-lg px-3 py-2 text-xs'
                           />
                           <input
                              name='price'
                              value={p.price}
                              onChange={(e) => handleProductChange(idx, e)}
                              placeholder='Price'
                              className='border border-gray-300 rounded-lg px-3 py-2 text-xs'
                           />
                           <input
                              name='productImage'
                              value={p.productImage}
                              onChange={(e) => handleProductChange(idx, e)}
                              placeholder='Image URL'
                              className='border border-gray-300 rounded-lg px-3 py-2 text-xs'
                           />
                        </div>
                     </div>
                  ))}
               </div>
               <button
                  type='button'
                  onClick={addProduct}
                  className='mt-2 text-green-600 text-xs hover:underline'
               >
                  + Add Product
               </button>
            </div>
            <button
               type='submit'
               className='w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition shadow-sm'
            >
               Update
            </button>
            {success && (
               <div className='mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm'>
                  Merchandise updated successfully.
               </div>
            )}
         </form>
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
