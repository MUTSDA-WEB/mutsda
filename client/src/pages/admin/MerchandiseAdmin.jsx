import { useState } from "react";
import useStore from "../../hooks/useStore";

const MerchandiseAdmin = () => {
   const { user } = useStore();
   const [form, setForm] = useState({
      products: [{ name: "", description: "", price: "", productImage: "" }],
   });
   const [success, setSuccess] = useState(false);

   //   if (!user || user.role !== "welfare") return <div>Access denied</div>;

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

   const removeProduct = (index) => {
      setForm((prev) => ({
         ...prev,
         products: prev.products.filter((_, i) => i !== index),
      }));
   };

   return (
      <div className='max-w-2xl mx-auto py-12 px-6 bg-white rounded-2xl shadow-sm border border-gray-100'>
         <h2 className='text-2xl font-semibold text-green-700'>
            Update Merchandise
         </h2>
         <p className='mt-2 text-sm text-gray-500'>
            Add, edit, or remove merchandise products for the church store.
         </p>
         <form onSubmit={handleSubmit} className='space-y-6 mt-8'>
            <div>
               <label className='block text-sm font-medium text-gray-700 mb-3'>
                  Products
               </label>
               <div className='space-y-4'>
                  {form.products.map((p, idx) => (
                     <div
                        key={idx}
                        className='bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4'
                     >
                        <div className='flex items-center justify-between'>
                           <span className='text-sm font-medium text-gray-600'>
                              Product {idx + 1}
                           </span>
                           {form.products.length > 1 && (
                              <button
                                 type='button'
                                 onClick={() => removeProduct(idx)}
                                 className='w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition text-lg font-semibold'
                              >
                                 −
                              </button>
                           )}
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                           <input
                              name='name'
                              value={p.name}
                              onChange={(e) => handleProductChange(idx, e)}
                              placeholder='Product Name'
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none'
                           />
                           <input
                              name='description'
                              value={p.description}
                              onChange={(e) => handleProductChange(idx, e)}
                              placeholder='Description'
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none'
                           />
                           <input
                              name='price'
                              value={p.price}
                              onChange={(e) => handleProductChange(idx, e)}
                              placeholder='Price'
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none'
                           />
                           <input
                              name='productImage'
                              value={p.productImage}
                              onChange={(e) => handleProductChange(idx, e)}
                              placeholder='Image URL'
                              className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none'
                           />
                        </div>
                     </div>
                  ))}
               </div>
               <button
                  type='button'
                  onClick={addProduct}
                  className='mt-4 text-sm font-medium text-green-600 hover:text-green-700 transition'
               >
                  + Add Product
               </button>
            </div>
            <button
               type='submit'
               className='w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition shadow-sm'
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
};

export default MerchandiseAdmin;
