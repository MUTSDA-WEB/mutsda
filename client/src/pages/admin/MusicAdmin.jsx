import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../hooks/useStore";
import AddChoirForm from "../../components/ui/AddChoirForm";
import { useGetUserGroups, useDeleteGroup } from "../../services/groups";
import { useQueryClient } from "@tanstack/react-query";
import subChoirs from "../../../utilities/subchoirs";

const MusicAdmin = () => {
   const { user } = useStore();
   const [created, setCreated] = useState(null);
   const [editingGroup, setEditingGroup] = useState(null);

   const { data } = useGetUserGroups();
   const queryClient = useQueryClient();
   const { mutate: deleteGroup, isLoading: deleting } = useDeleteGroup();

   // Local choirs list (prefer API groups, fallback to static utilities)
   const [localChoirs, setLocalChoirs] = useState(data?.groups ?? subChoirs);

   useEffect(() => {
      setLocalChoirs(data?.groups ?? subChoirs);
   }, [data]);

   // Only users with role 'music' may access
   if (!user || user.role !== "music") return <Navigate to='/' />;

   return (
      <div className='max-w-4xl mx-auto py-12 px-6'>
         <h2 className='text-2xl font-bold mb-6'>
            Music Admin — Manage Choirs
         </h2>

         <div className='mb-8'>
            <AddChoirForm
               onCreated={(newGroup) => {
                  setCreated(true);
                  // If API returned created group, prepend it to local list
                  if (newGroup && newGroup.id) {
                     setLocalChoirs((prev) => [newGroup, ...(prev || [])]);
                  } else {
                     queryClient.invalidateQueries(["GET_USER_GROUPS"]);
                  }
                  setTimeout(() => setCreated(false), 3000);
               }}
            />
            {created && (
               <div className='mt-4 p-4 bg-green-50 border border-green-200 rounded'>
                  Choir created successfully.
               </div>
            )}
         </div>

         <div>
            <h3 className='text-xl font-semibold mb-4'>Existing Choirs</h3>
            <div className='grid gap-4'>
               {localChoirs && localChoirs.length > 0 ? (
                  localChoirs.map((g) => (
                     <div
                        key={g.id ?? g.name}
                        className='p-4 bg-white rounded shadow-sm border flex items-start gap-4'
                     >
                        <img
                           src={g.image || "/church_logo.png"}
                           alt={g.name}
                           className='w-28 h-28 object-cover rounded'
                        />
                        <div className='flex-1'>
                           <div className='flex justify-between items-start gap-4'>
                              <div>
                                 <h4 className='font-bold text-lg'>{g.name}</h4>
                                 <p className='text-sm text-gray-600 mt-1'>
                                    {g.description}
                                 </p>
                              </div>
                              <div className='flex items-center gap-2'>
                                 <button
                                    onClick={() => setEditingGroup(g)}
                                    className='px-3 py-1 text-sm rounded bg-sky-100 text-sky-700'
                                 >
                                    Edit
                                 </button>
                                 <button
                                    onClick={() => {
                                       if (!g.id) {
                                          // static entry: remove locally
                                          if (
                                             window.confirm(
                                                `Delete ${g.name}? This will remove it locally.`,
                                             )
                                          ) {
                                             setLocalChoirs((prev) =>
                                                prev.filter(
                                                   (c) => c.name !== g.name,
                                                ),
                                             );
                                          }
                                          return;
                                       }

                                       if (
                                          window.confirm(
                                             `Delete ${g.name}? This cannot be undone.`,
                                          )
                                       ) {
                                          deleteGroup(g.id, {
                                             onSuccess: () =>
                                                queryClient.invalidateQueries([
                                                   "GET_USER_GROUPS",
                                                ]),
                                          });
                                       }
                                    }}
                                    disabled={deleting}
                                    className='px-3 py-1 text-sm rounded bg-red-50 text-red-600 disabled:opacity-50'
                                 >
                                    Delete
                                 </button>
                              </div>
                           </div>

                           <div className='text-xs text-gray-500 mt-3 grid md:grid-cols-3 gap-2'>
                              <div>
                                 Contact: {g.contact?.phone ?? g.contact?.phone}{" "}
                                 / {g.contact?.email ?? g.contact?.email}
                              </div>
                              <div>Members: {g.members}</div>
                              <div>Practice: {g.practiceDay}</div>
                           </div>
                        </div>
                     </div>
                  ))
               ) : (
                  <div className='p-4 text-sm text-gray-500'>
                     No choirs found.
                  </div>
               )}
            </div>
         </div>

         {editingGroup && (
            <div className='fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-24'>
               <div className='w-full max-w-3xl p-6'>
                  <AddChoirForm
                     initialData={editingGroup}
                     onUpdated={(updated) => {
                        // if API-backed, update local list by id, else replace by name
                        if (updated && updated.id) {
                           setLocalChoirs((prev) =>
                              prev.map((c) =>
                                 c.id === updated.id ? updated : c,
                              ),
                           );
                        } else {
                           setLocalChoirs((prev) =>
                              prev.map((c) =>
                                 c.name === editingGroup.name
                                    ? { ...c, ...updated }
                                    : c,
                              ),
                           );
                        }
                        setEditingGroup(null);
                        queryClient.invalidateQueries(["GET_USER_GROUPS"]);
                     }}
                     onCancel={() => setEditingGroup(null)}
                  />
               </div>
            </div>
         )}
      </div>
   );
};

export default MusicAdmin;
