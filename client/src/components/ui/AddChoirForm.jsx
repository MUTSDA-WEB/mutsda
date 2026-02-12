import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck, faImage } from "@fortawesome/free-solid-svg-icons";
import { useCreateGroup, useUpdateGroup } from "../../services/groups";

const AddChoirForm = ({
   initialData = null,
   onCreated,
   onUpdated,
   onCancel,
}) => {
   const [form, setForm] = useState({
      name: "",
      description: "",
      contact: { phone: "", email: "" },
      members: "",
      practiceDay: "",
      image: "",
   });

   useEffect(() => {
      if (initialData) {
         setForm({
            name: initialData.name || "",
            description: initialData.description || "",
            contact: initialData.contact || { phone: "", email: "" },
            members: initialData.members || "",
            practiceDay: initialData.practiceDay || "",
            image: initialData.image || "",
         });
      }
   }, [initialData]);

   const {
      mutate: createGroup,
      isLoading: creating,
      isSuccess: createSuccess,
   } = useCreateGroup();
   const {
      mutate: updateGroup,
      isLoading: updating,
      isSuccess: updateSuccess,
   } = useUpdateGroup();

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "phone" || name === "email") {
         setForm((p) => ({ ...p, contact: { ...p.contact, [name]: value } }));
      } else {
         setForm((p) => ({ ...p, [name]: value }));
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
         name: form.name,
         description: form.description,
         contact: form.contact,
         members: form.members,
         practiceDay: form.practiceDay,
         image: form.image,
         type: "choir",
      };

      if (initialData && initialData.id) {
         updateGroup(
            { groupId: initialData.id, data: payload },
            {
               onSuccess: (data) => {
                  if (onUpdated) onUpdated(data);
               },
            },
         );
      } else {
         createGroup(payload, {
            onSuccess: (data) => {
               if (onCreated) onCreated(data);
            },
         });
      }
   };

   return (
      <form
         onSubmit={handleSubmit}
         className='space-y-4 p-6 bg-white rounded-2xl shadow-sm border'
      >
         <div className='grid md:grid-cols-2 gap-4'>
            <div>
               <label className='text-sm font-semibold'>Choir Name</label>
               <input
                  name='name'
                  required
                  value={form.name}
                  onChange={handleChange}
                  className='w-full p-3 rounded-lg border mt-1'
                  placeholder='e.g. Youth Choir'
               />
            </div>

            <div>
               <label className='text-sm font-semibold'>Members (approx)</label>
               <input
                  name='members'
                  value={form.members}
                  onChange={handleChange}
                  className='w-full p-3 rounded-lg border mt-1'
                  placeholder='e.g. 20-30'
               />
            </div>
         </div>

         <div>
            <label className='text-sm font-semibold'>Description</label>
            <textarea
               name='description'
               value={form.description}
               onChange={handleChange}
               className='w-full p-3 rounded-lg border mt-1'
               placeholder='Short description of the choir'
            />
         </div>

         <div className='grid md:grid-cols-2 gap-4'>
            <div>
               <label className='text-sm font-semibold'>Contact Phone</label>
               <input
                  name='phone'
                  value={form.contact.phone}
                  onChange={handleChange}
                  className='w-full p-3 rounded-lg border mt-1'
                  placeholder='+254...'
               />
            </div>
            <div>
               <label className='text-sm font-semibold'>Contact Email</label>
               <input
                  name='email'
                  value={form.contact.email}
                  onChange={handleChange}
                  className='w-full p-3 rounded-lg border mt-1'
                  placeholder='choir@example.com'
               />
            </div>
         </div>

         <div className='grid md:grid-cols-2 gap-4 items-center'>
            <div>
               <label className='text-sm font-semibold'>
                  Practice Day / Time
               </label>
               <input
                  name='practiceDay'
                  value={form.practiceDay}
                  onChange={handleChange}
                  className='w-full p-3 rounded-lg border mt-1'
                  placeholder='Saturdays 4pm'
               />
            </div>
            <div>
               <label className='text-sm font-semibold'>Image URL</label>
               <div className='flex gap-2 mt-1'>
                  <input
                     name='image'
                     value={form.image}
                     onChange={handleChange}
                     className='flex-1 p-3 rounded-lg border'
                     placeholder='https://...'
                  />
                  <div className='w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center border'>
                     {form.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                           src={form.image}
                           alt='preview'
                           className='w-full h-full object-cover rounded'
                        />
                     ) : (
                        <FontAwesomeIcon
                           icon={faImage}
                           className='text-gray-400'
                        />
                     )}
                  </div>
               </div>
            </div>
         </div>

         <div className='flex gap-3'>
            <button
               type='submit'
               disabled={creating || updating}
               className='flex-1 bg-[#3298C8] text-white py-3 rounded-xl font-semibold'
            >
               {creating || updating ? (
                  <span className='flex items-center justify-center gap-2'>
                     <FontAwesomeIcon
                        icon={faSpinner}
                        className='animate-spin'
                     />
                     {initialData ? "Updating..." : "Creating..."}
                  </span>
               ) : initialData ? (
                  "Update Choir"
               ) : (
                  "Create Choir"
               )}
            </button>

            {initialData && onCancel && (
               <button
                  type='button'
                  onClick={onCancel}
                  className='px-4 py-3 rounded-xl border'
               >
                  Cancel
               </button>
            )}
         </div>
      </form>
   );
};

export default AddChoirForm;
