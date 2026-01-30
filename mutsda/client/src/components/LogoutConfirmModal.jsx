import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

const LogoutConfirmModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
   if (!isOpen) return null;

   return (
      <>
         {/* Backdrop */}
         <div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-100'
            onClick={onClose}
         />

         {/* Modal */}
         <div className='fixed inset-0 z-100 flex items-center justify-center px-4'>
            <div className='bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm'>
               {/* Header */}
               <div className='bg-red-500 px-6 py-4 flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                     <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
                        <FontAwesomeIcon
                           icon={faSignOutAlt}
                           className='text-white text-lg'
                        />
                     </div>
                     <h2 className='text-xl font-bold text-white'>Logout</h2>
                  </div>
                  <button
                     onClick={onClose}
                     className='text-white/80 hover:text-white transition-colors'
                  >
                     <FontAwesomeIcon icon={faTimes} className='text-xl' />
                  </button>
               </div>

               {/* Content */}
               <div className='px-6 py-6'>
                  <p className='text-gray-600 text-center'>
                     Are you sure you want to log out of your account?
                  </p>
               </div>

               {/* Actions */}
               <div className='px-6 pb-6 flex gap-3'>
                  <button
                     onClick={onClose}
                     disabled={isLoading}
                     className='flex-1 px-4 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50'
                  >
                     Cancel
                  </button>
                  <button
                     onClick={onConfirm}
                     disabled={isLoading}
                     className='flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2'
                  >
                     {isLoading ? (
                        <>
                           <svg
                              className='animate-spin h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                           >
                              <circle
                                 className='opacity-25'
                                 cx='12'
                                 cy='12'
                                 r='10'
                                 stroke='currentColor'
                                 strokeWidth='4'
                              />
                              <path
                                 className='opacity-75'
                                 fill='currentColor'
                                 d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                              />
                           </svg>
                           <span>Logging out...</span>
                        </>
                     ) : (
                        <>
                           <FontAwesomeIcon icon={faSignOutAlt} />
                           <span className='text-sm'>Yes, Log Out</span>
                        </>
                     )}
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default LogoutConfirmModal;
