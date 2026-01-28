import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

const EmptyState = ({ activeTab }) => {
   return (
      <div className='flex-1 flex items-center justify-center bg-gray-50'>
         <div className='text-center'>
            <div className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
               <FontAwesomeIcon
                  icon={faComments}
                  className='text-4xl text-gray-400'
               />
            </div>
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>
               Select a conversation
            </h3>
            <p className='text-gray-500'>
               Choose a {activeTab === "messages" ? "contact" : "group"} to
               start chatting
            </p>
         </div>
      </div>
   );
};

export default EmptyState;
