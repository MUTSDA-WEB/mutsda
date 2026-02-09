import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faTimes,
   faUserPlus,
   faUserMinus,
   faCrown,
   faUser,
   faSearch,
   faShieldAlt,
   faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
   useGetGroupMembers,
   useAddGroupMember,
   useRemoveGroupMember,
   useUpdateMemberRole,
} from "../../services/groups";
import { queryClient } from "../../main";
import userStore from "../../hooks/useStore";

const GroupMembersModal = ({ group, onClose }) => {
   const [showAddMember, setShowAddMember] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [confirmAction, setConfirmAction] = useState(null);

   const { members: allUsers, user: currentUser } = userStore();

   // Fetch group members
   const {
      data: groupData,
      isLoading,
      isError,
   } = useGetGroupMembers(group?.id);

   // Mutations
   const { mutate: addMember, isPending: adding } = useAddGroupMember();
   const { mutate: removeMember, isPending: removing } = useRemoveGroupMember();
   const { mutate: updateRole, isPending: updatingRole } =
      useUpdateMemberRole();

   const members = groupData?.members || [];
   const isAdmin = groupData?.isAdmin || false;

   // Get list of users not in the group
   const nonMembers =
      allUsers?.filter((u) => !members.some((m) => m.userId === u.userID)) ||
      [];

   const filteredNonMembers = nonMembers.filter(
      (u) =>
         u.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         u.email?.toLowerCase().includes(searchQuery.toLowerCase()),
   );

   const handleAddMember = (userId) => {
      addMember(
         { groupId: group.id, userId },
         {
            onSuccess: () => {
               queryClient.invalidateQueries({
                  queryKey: ["GET_GROUP_MEMBERS", group.id],
               });
               setSearchQuery("");
            },
            onError: (e) => console.error("Failed to add member:", e.message),
         },
      );
   };

   const handleRemoveMember = (memberId) => {
      removeMember(
         { groupId: group.id, memberId },
         {
            onSuccess: () => {
               queryClient.invalidateQueries({
                  queryKey: ["GET_GROUP_MEMBERS", group.id],
               });
               setConfirmAction(null);
            },
            onError: (e) =>
               console.error("Failed to remove member:", e.message),
         },
      );
   };

   const handleUpdateRole = (memberId, newRole) => {
      updateRole(
         { groupId: group.id, memberId, role: newRole },
         {
            onSuccess: () => {
               queryClient.invalidateQueries({
                  queryKey: ["GET_GROUP_MEMBERS", group.id],
               });
               setConfirmAction(null);
            },
            onError: (e) => console.error("Failed to update role:", e.message),
         },
      );
   };

   return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
         <div className='bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col'>
            {/* Header */}
            <div className='p-4 border-b border-gray-200 flex items-center justify-between bg-linear-to-r from-[#3298C8] to-sky-600'>
               <div>
                  <h2 className='text-lg font-bold text-white'>
                     Group Members
                  </h2>
                  <p className='text-sm text-white/70'>{group?.name}</p>
               </div>
               <button
                  onClick={onClose}
                  className='p-2 hover:bg-white/20 rounded-lg transition-colors'
               >
                  <FontAwesomeIcon icon={faTimes} className='text-white' />
               </button>
            </div>

            {/* Add Member Section (Admin only) */}
            {isAdmin && (
               <div className='p-4 border-b border-gray-100'>
                  {!showAddMember ? (
                     <button
                        onClick={() => setShowAddMember(true)}
                        className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#3298C8] text-white rounded-xl font-medium hover:bg-sky-600 transition-colors'
                     >
                        <FontAwesomeIcon icon={faUserPlus} />
                        Add Member
                     </button>
                  ) : (
                     <div className='space-y-3'>
                        <div className='flex items-center gap-2'>
                           <div className='flex-1 relative'>
                              <FontAwesomeIcon
                                 icon={faSearch}
                                 className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                              />
                              <input
                                 type='text'
                                 value={searchQuery}
                                 onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                 }
                                 placeholder='Search users...'
                                 className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3298C8]/20 focus:border-[#3298C8]'
                              />
                           </div>
                           <button
                              onClick={() => {
                                 setShowAddMember(false);
                                 setSearchQuery("");
                              }}
                              className='p-2 hover:bg-gray-100 rounded-lg'
                           >
                              <FontAwesomeIcon
                                 icon={faTimes}
                                 className='text-gray-500'
                              />
                           </button>
                        </div>

                        {/* Non-members list */}
                        <div className='max-h-40 overflow-y-auto space-y-1'>
                           {filteredNonMembers.length === 0 ? (
                              <p className='text-center text-gray-500 py-4 text-sm'>
                                 {searchQuery
                                    ? "No users found"
                                    : "All users are already members"}
                              </p>
                           ) : (
                              filteredNonMembers.map((user) => (
                                 <div
                                    key={user.userID}
                                    className='flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg'
                                 >
                                    <div className='flex items-center gap-3'>
                                       <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600'>
                                          {user.userName
                                             ?.substring(0, 2)
                                             .toUpperCase()}
                                       </div>
                                       <span className='text-sm font-medium text-gray-800'>
                                          {user.userName}
                                       </span>
                                    </div>
                                    <button
                                       onClick={() =>
                                          handleAddMember(user.userID)
                                       }
                                       disabled={adding}
                                       className='px-3 py-1 bg-[#3298C8] text-white text-xs rounded-lg hover:bg-sky-600 disabled:opacity-50'
                                    >
                                       {adding ? "Adding..." : "Add"}
                                    </button>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  )}
               </div>
            )}

            {/* Members List */}
            <div className='flex-1 overflow-y-auto p-4'>
               {isLoading ? (
                  <div className='flex items-center justify-center py-8'>
                     <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        className='text-2xl text-[#3298C8]'
                     />
                  </div>
               ) : isError ? (
                  <div className='text-center py-8 text-red-500'>
                     Failed to load members
                  </div>
               ) : members.length === 0 ? (
                  <div className='text-center py-8 text-gray-500'>
                     No members in this group
                  </div>
               ) : (
                  <div className='space-y-2'>
                     {/* Admins first, then members */}
                     {[...members]
                        .sort((a, b) => (a.role === "admin" ? -1 : 1))
                        .map((member) => (
                           <div
                              key={member.id}
                              className='flex items-center justify-between p-3 bg-gray-50 rounded-xl'
                           >
                              <div className='flex items-center gap-3'>
                                 <div className='relative'>
                                    <div className='w-10 h-10 bg-linear-to-br from-[#3298C8] to-sky-600 rounded-full flex items-center justify-center text-white font-semibold'>
                                       {member.user?.userName
                                          ?.substring(0, 2)
                                          .toUpperCase()}
                                    </div>
                                    {member.role === "admin" && (
                                       <div className='absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center'>
                                          <FontAwesomeIcon
                                             icon={faCrown}
                                             className='text-[10px] text-yellow-800'
                                          />
                                       </div>
                                    )}
                                 </div>
                                 <div>
                                    <p className='font-medium text-gray-800'>
                                       {member.user?.userName}
                                       {member.userId ===
                                          currentUser?.userID && (
                                          <span className='text-xs text-gray-400 ml-1'>
                                             (You)
                                          </span>
                                       )}
                                    </p>
                                    <p className='text-xs text-gray-500 flex items-center gap-1'>
                                       <FontAwesomeIcon
                                          icon={
                                             member.role === "admin"
                                                ? faShieldAlt
                                                : faUser
                                          }
                                          className={
                                             member.role === "admin"
                                                ? "text-yellow-500"
                                                : "text-gray-400"
                                          }
                                       />
                                       {member.role === "admin"
                                          ? "Admin"
                                          : "Member"}
                                    </p>
                                 </div>
                              </div>

                              {/* Actions (Admin only) */}
                              {isAdmin &&
                                 member.userId !== currentUser?.userID && (
                                    <div className='flex items-center gap-1'>
                                       {/* Promote/Demote button */}
                                       <button
                                          onClick={() =>
                                             setConfirmAction({
                                                type:
                                                   member.role === "admin"
                                                      ? "demote"
                                                      : "promote",
                                                memberId: member.userId,
                                                memberName:
                                                   member.user?.userName,
                                             })
                                          }
                                          className={`p-2 rounded-lg transition-colors ${
                                             member.role === "admin"
                                                ? "hover:bg-gray-200 text-gray-500"
                                                : "hover:bg-yellow-50 text-yellow-600"
                                          }`}
                                          title={
                                             member.role === "admin"
                                                ? "Demote to member"
                                                : "Promote to admin"
                                          }
                                       >
                                          <FontAwesomeIcon icon={faCrown} />
                                       </button>
                                       {/* Remove button */}
                                       <button
                                          onClick={() =>
                                             setConfirmAction({
                                                type: "remove",
                                                memberId: member.userId,
                                                memberName:
                                                   member.user?.userName,
                                             })
                                          }
                                          className='p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors'
                                          title='Remove from group'
                                       >
                                          <FontAwesomeIcon icon={faUserMinus} />
                                       </button>
                                    </div>
                                 )}
                           </div>
                        ))}
                  </div>
               )}
            </div>

            {/* Member count */}
            <div className='p-4 border-t border-gray-100 text-center text-sm text-gray-500'>
               {members.length} {members.length === 1 ? "member" : "members"}
            </div>
         </div>

         {/* Confirmation Modal */}
         {confirmAction && (
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4'>
               <div className='bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl'>
                  <div className='text-center'>
                     <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                           confirmAction.type === "remove"
                              ? "bg-red-100"
                              : confirmAction.type === "promote"
                                ? "bg-yellow-100"
                                : "bg-gray-100"
                        }`}
                     >
                        <FontAwesomeIcon
                           icon={
                              confirmAction.type === "remove"
                                 ? faUserMinus
                                 : faCrown
                           }
                           className={`text-2xl ${
                              confirmAction.type === "remove"
                                 ? "text-red-500"
                                 : confirmAction.type === "promote"
                                   ? "text-yellow-600"
                                   : "text-gray-500"
                           }`}
                        />
                     </div>
                     <h3 className='text-xl font-bold text-gray-800 mb-2'>
                        {confirmAction.type === "remove"
                           ? "Remove Member?"
                           : confirmAction.type === "promote"
                             ? "Promote to Admin?"
                             : "Demote to Member?"}
                     </h3>
                     <p className='text-gray-500 mb-6'>
                        {confirmAction.type === "remove"
                           ? `${confirmAction.memberName} will be removed from the group.`
                           : confirmAction.type === "promote"
                             ? `${confirmAction.memberName} will become a group admin.`
                             : `${confirmAction.memberName} will no longer be an admin.`}
                     </p>
                     <div className='flex gap-3'>
                        <button
                           onClick={() => setConfirmAction(null)}
                           className='flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors'
                        >
                           Cancel
                        </button>
                        <button
                           onClick={() => {
                              if (confirmAction.type === "remove") {
                                 handleRemoveMember(confirmAction.memberId);
                              } else {
                                 handleUpdateRole(
                                    confirmAction.memberId,
                                    confirmAction.type === "promote"
                                       ? "admin"
                                       : "member",
                                 );
                              }
                           }}
                           disabled={removing || updatingRole}
                           className={`flex-1 px-4 py-3 text-white rounded-xl font-medium transition-colors disabled:opacity-50 ${
                              confirmAction.type === "remove"
                                 ? "bg-red-500 hover:bg-red-600"
                                 : "bg-[#3298C8] hover:bg-sky-600"
                           }`}
                        >
                           {removing || updatingRole
                              ? "Processing..."
                              : "Confirm"}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default GroupMembersModal;
