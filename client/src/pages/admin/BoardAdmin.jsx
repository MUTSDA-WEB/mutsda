import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faPlus,
   faTrash,
   faSpinner,
   faExclamationCircle,
   faUsers,
   faPhone,
   faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../../hooks/useStore";
import { useGetMembers, useAddBoardMember } from "../../services/user";
import AddBoardMemberForm from "../../components/ui/AddBoardMemberForm";

const BoardAdmin = () => {
   const { user, members: boardMembers = [], setMembers } = useStore();
   const [isFormOpen, setIsFormOpen] = useState(false);
   const [deletingId, setDeletingId] = useState(null);
   const [formError, setFormError] = useState(null);

   // Fetch all available members
   const { data: membersData, isLoading, isSuccess } = useGetMembers();

   // Add board member mutation
   const { mutate: addBoardMember, isPending: isAddingMember } =
      useAddBoardMember();

   useEffect(() => {
      if (membersData && isSuccess) {
         const allLeaders = membersData.leaders || [];
         // Filter out admins from board members (they manage but don't appear as members)
         const nonAdminMembers = allLeaders.filter(
            (member) => !member.role?.startsWith("admin"),
         );
         setMembers(nonAdminMembers);
      }
   }, [membersData, isSuccess, setMembers]);

   const handleAddMember = (formData) => {
      setFormError(null);
      addBoardMember(formData, {
         onSuccess: (response) => {
            // Add the newly created member to the board
            const newMember = response.user;
            setMembers([...boardMembers, newMember]);
            // Form will handle closing itself after showing success
         },
         onError: (error) => {
            setFormError(
               error.response?.data?.error || "Failed to add board member",
            );
         },
      });
   };

   const handleDeleteMember = (memberId) => {
      const updatedMembers = boardMembers.filter(
         (member) => member.userID !== memberId,
      );
      setMembers(updatedMembers);
      setDeletingId(null);
   };

   // Check role authorization (admins can manage, but not be members)
   const isAuthorized =
      user?.role?.startsWith("admin") ||
      user?.role?.startsWith("elder") ||
      user?.role === "pastor";

   if (!isAuthorized) {
      return (
         <div className='min-h-screen bg-linear-to-br from-red-50 to-red-100 flex items-center justify-center p-6'>
            <div className='bg-white rounded-xl shadow-2xl p-8 text-center max-w-md'>
               <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className='text-red-500 text-4xl mb-4'
               />
               <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                  Access Denied
               </h2>
               <p className='text-gray-600'>
                  You do not have permission to manage board members. Only
                  elders and administrators can access this page.
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-6'>
         {/* Header Section */}
         <div className='max-w-6xl mx-auto mb-8'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
               <div>
                  <h1 className='text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                     Board Members Management
                  </h1>
                  <p className='text-gray-600 mt-2'>
                     Add or remove members from the church board
                  </p>
               </div>
               <button
                  onClick={() => setIsFormOpen(true)}
                  disabled={isLoading || isAddingMember}
                  className='flex items-center gap-2 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed'
               >
                  <FontAwesomeIcon icon={faPlus} />
                  Add Board Member
               </button>
            </div>
         </div>

         {/* Loading State */}
         {isLoading && (
            <div className='max-w-6xl mx-auto flex items-center justify-center h-64'>
               <div className='text-center'>
                  <FontAwesomeIcon
                     icon={faSpinner}
                     className='text-blue-600 text-4xl mb-4 animate-spin'
                  />
                  <p className='text-gray-600 font-medium'>
                     Loading board members...
                  </p>
               </div>
            </div>
         )}

         {/* Empty State */}
         {!isLoading && boardMembers.length === 0 && (
            <div className='max-w-6xl mx-auto'>
               <div className='bg-white rounded-xl shadow-lg p-12 text-center'>
                  <FontAwesomeIcon
                     icon={faUsers}
                     className='text-gray-400 text-5xl mb-4'
                  />
                  <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                     No Board Members Yet
                  </h3>
                  <p className='text-gray-600 mb-6'>
                     Start building your board by adding the first member
                  </p>
                  <button
                     onClick={() => setIsFormOpen(true)}
                     disabled={isAddingMember}
                     className='inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                     <FontAwesomeIcon icon={faPlus} />
                     Add First Member
                  </button>
               </div>
            </div>
         )}

         {/* Board Members Grid */}
         {!isLoading && boardMembers.length > 0 && (
            <div className='max-w-6xl mx-auto'>
               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {boardMembers.map((member) => (
                     <div
                        key={member.userID}
                        className='group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100'
                     >
                        {/* Member Avatar and Name */}
                        <div className='bg-linear-to-r from-blue-500 to-purple-600 p-6 text-white'>
                           <div className='w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3'>
                              <span className='text-2xl font-bold'>
                                 {member.userName?.[0]?.toUpperCase() || "?"}
                              </span>
                           </div>
                           <h3 className='text-xl font-bold mb-1'>
                              {member.userName}
                           </h3>
                           <p className='text-white text-opacity-90 text-sm font-medium'>
                              {member.role
                                 ?.replace(/([A-Z])/g, " $1")
                                 .replace(/^./, (str) => str.toUpperCase()) ||
                                 "Member"}
                           </p>
                        </div>

                        {/* Member Details */}
                        <div className='p-6'>
                           {/* Email */}
                           {member.email && (
                              <div className='flex items-start gap-3 mb-4'>
                                 <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className='text-blue-600 mt-1 shrink-0'
                                 />
                                 <div>
                                    <p className='text-xs text-gray-500 font-semibold uppercase tracking-wide'>
                                       Email
                                    </p>
                                    <p className='text-gray-800 word-break text-sm'>
                                       {member.email}
                                    </p>
                                 </div>
                              </div>
                           )}

                           {/* Phone */}
                           {member.phoneNumber && (
                              <div className='flex items-start gap-3 mb-4'>
                                 <FontAwesomeIcon
                                    icon={faPhone}
                                    className='text-green-600 mt-1 shrink-0'
                                 />
                                 <div>
                                    <p className='text-xs text-gray-500 font-semibold uppercase tracking-wide'>
                                       Phone
                                    </p>
                                    <p className='text-gray-800 text-sm'>
                                       {member.phoneNumber}
                                    </p>
                                 </div>
                              </div>
                           )}

                           {/* Delete Button */}
                           <div className='mt-6 pt-4 border-t border-gray-200'>
                              {deletingId === member.userID ? (
                                 <div className='space-y-3'>
                                    <p className='text-sm text-gray-700 font-medium'>
                                       Remove {member.userName} from board?
                                    </p>
                                    <div className='flex gap-2'>
                                       <button
                                          onClick={() =>
                                             handleDeleteMember(member.userID)
                                          }
                                          className='flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors'
                                       >
                                          Confirm
                                       </button>
                                       <button
                                          onClick={() => setDeletingId(null)}
                                          className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg text-sm font-semibold transition-colors'
                                       >
                                          Cancel
                                       </button>
                                    </div>
                                 </div>
                              ) : (
                                 <button
                                    onClick={() => setDeletingId(member.userID)}
                                    className='w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg font-semibold transition-colors'
                                 >
                                    <FontAwesomeIcon icon={faTrash} />
                                    Remove from Board
                                 </button>
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* Add Board Member Form */}
         <AddBoardMemberForm
            onClose={() => setIsFormOpen(false)}
            onSuccess={handleAddMember}
            isLoading={isAddingMember}
            error={formError}
            isOpen={isFormOpen}
         />
      </div>
   );
};

export default BoardAdmin;
