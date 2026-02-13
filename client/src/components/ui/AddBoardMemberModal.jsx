import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faTimes,
   faSearch,
   faUser,
   faPhone,
   faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const AddBoardMemberModal = ({
   isOpen,
   onClose,
   availableMembers = [],
   onAddMember,
}) => {
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedMember, setSelectedMember] = useState(null);

   // Filter members based on search term
   const filteredMembers = useMemo(() => {
      if (!searchTerm.trim()) return availableMembers;
      return availableMembers.filter(
         (member) =>
            member.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase()),
      );
   }, [searchTerm, availableMembers]);

   const handleAddClick = () => {
      if (selectedMember) {
         onAddMember(selectedMember);
         setSelectedMember(null);
         setSearchTerm("");
      }
   };

   if (!isOpen) return null;

   return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
         <div className='bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col'>
            {/* Header */}
            <div className='sticky top-0 z-10 bg-linear-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between'>
               <h2 className='text-xl font-bold text-white'>
                  Add Board Member
               </h2>
               <button
                  onClick={onClose}
                  className='text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors'
               >
                  <FontAwesomeIcon icon={faTimes} className='text-lg' />
               </button>
            </div>

            {/* Search Input */}
            <div className='px-6 py-4 border-b border-gray-200 bg-gray-50'>
               <div className='relative'>
                  <FontAwesomeIcon
                     icon={faSearch}
                     className='absolute left-3 top-3 text-gray-400'
                  />
                  <input
                     type='text'
                     placeholder='Search by name, email, or role...'
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
               </div>
               {availableMembers.length === 0 && (
                  <p className='text-sm text-gray-500 mt-2'>
                     No available members to add
                  </p>
               )}
            </div>

            {/* Members List */}
            <div className='flex-1 overflow-y-auto p-4'>
               {filteredMembers.length === 0 ? (
                  <div className='text-center py-8'>
                     <FontAwesomeIcon
                        icon={faUser}
                        className='text-gray-300 text-3xl mb-2'
                     />
                     <p className='text-gray-500'>No members found</p>
                  </div>
               ) : (
                  <div className='space-y-2'>
                     {filteredMembers.map((member) => (
                        <button
                           key={member.userID}
                           onClick={() => setSelectedMember(member)}
                           className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              selectedMember?.userID === member.userID
                                 ? "border-blue-500 bg-blue-50"
                                 : "border-gray-200 bg-white hover:border-blue-300"
                           }`}
                        >
                           <div className='flex items-start gap-3'>
                              <div className='w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shrink-0'>
                                 {member.userName[0].toUpperCase()}
                              </div>
                              <div className='flex-1 min-w-0'>
                                 <h3 className='font-semibold text-gray-800'>
                                    {member.userName}
                                 </h3>
                                 <p className='text-sm text-gray-500'>
                                    {member.role
                                       .replace(/([A-Z])/g, " $1")
                                       .replace(/^./, (str) =>
                                          str.toUpperCase(),
                                       )}
                                 </p>
                                 <div className='flex flex-col gap-1 mt-2 text-xs text-gray-500'>
                                    {member.email && (
                                       <div className='flex items-center gap-2'>
                                          <FontAwesomeIcon
                                             icon={faEnvelope}
                                             className='w-3'
                                          />
                                          <span className='truncate'>
                                             {member.email}
                                          </span>
                                       </div>
                                    )}
                                    {member.phoneNumber && (
                                       <div className='flex items-center gap-2'>
                                          <FontAwesomeIcon
                                             icon={faPhone}
                                             className='w-3'
                                          />
                                          <span>{member.phoneNumber}</span>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </button>
                     ))}
                  </div>
               )}
            </div>

            {/* Footer */}
            <div className='sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3'>
               <button
                  onClick={onClose}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors'
               >
                  Cancel
               </button>
               <button
                  onClick={handleAddClick}
                  disabled={!selectedMember}
                  className='flex-1 px-4 py-2 bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
               >
                  Add Member
               </button>
            </div>
         </div>
      </div>
   );
};

AddBoardMemberModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   availableMembers: PropTypes.arrayOf(
      PropTypes.shape({
         userID: PropTypes.string.isRequired,
         userName: PropTypes.string.isRequired,
         email: PropTypes.string,
         phoneNumber: PropTypes.number,
         role: PropTypes.string,
      }),
   ),
   onAddMember: PropTypes.func.isRequired,
};

export default AddBoardMemberModal;
