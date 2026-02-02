import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import userStore from "../../hooks/useStore";

const CreateGroupModal = ({
   show,
   onClose,
   groupName,
   setGroupName,
   selectedMembers,
   setSelectedMembers,
   allUsers,
   onCreateGroup,
}) => {
   const { user } = userStore();

   if (!show) return null;

   // Filter out the current user (creator) from the list
   const availableUsers = allUsers.filter((u) => u.userID !== user?.userID);

   return (
      <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
         <div className='bg-white rounded-2xl w-full max-w-md overflow-hidden animate-fadeIn'>
            <div className='p-6 border-b border-gray-200 flex items-center justify-between'>
               <h3 className='text-xl font-bold text-gray-800'>
                  Create New Group
               </h3>
               <button
                  onClick={onClose}
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
               >
                  <FontAwesomeIcon icon={faTimes} className='text-gray-500' />
               </button>
            </div>

            <div className='p-6 space-y-6'>
               {/* Group Name */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Group Name
                  </label>
                  <input
                     type='text'
                     value={groupName}
                     onChange={(e) => setGroupName(e.target.value)}
                     placeholder='Enter group name...'
                     className='w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3298C8]/30 transition-all'
                  />
               </div>

               {/* Select Members */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Add Members ({selectedMembers.length} selected)
                  </label>
                  <div className='max-h-48 overflow-y-auto border border-gray-200 rounded-xl'>
                     {availableUsers.map((user) => (
                        <label
                           key={user.userID}
                           className='flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0'
                        >
                           <input
                              type='checkbox'
                              checked={selectedMembers.includes(user.userID)}
                              onChange={(e) => {
                                 if (e.target.checked) {
                                    setSelectedMembers([
                                       ...selectedMembers,
                                       user.userID,
                                    ]);
                                 } else {
                                    setSelectedMembers(
                                       selectedMembers.filter(
                                          (id) => id !== user.userID,
                                       ),
                                    );
                                 }
                              }}
                              className='w-5 h-5 text-[#3298C8] rounded focus:ring-[#3298C8]'
                           />
                           <div className='w-10 h-10 bg-linear-to-br from-[#3298C8] to-sky-600 rounded-full flex items-center justify-center text-white text-sm font-semibold'>
                              {user.userName?.substring(0, 2).toUpperCase() ||
                                 "??"}
                           </div>
                           <span className='font-medium text-gray-800'>
                              {user.userName}
                           </span>
                        </label>
                     ))}
                  </div>
               </div>
            </div>

            <div className='p-6 border-t border-gray-200 flex gap-3'>
               <button
                  onClick={onClose}
                  className='flex-1 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium'
               >
                  Cancel
               </button>
               <button
                  onClick={onCreateGroup}
                  disabled={!groupName.trim() || selectedMembers.length === 0}
                  className='flex-1 p-3 bg-[#3298C8] text-white rounded-xl hover:bg-sky-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
               >
                  Create Group
               </button>
            </div>
         </div>
      </div>
   );
};

export default CreateGroupModal;
