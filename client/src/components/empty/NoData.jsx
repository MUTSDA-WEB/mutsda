import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

const NoData = ({ info = "No data available", icon = faInbox, children }) => (
   <div className='flex flex-col items-center justify-center py-16 text-gray-400'>
      <FontAwesomeIcon icon={icon} className='text-5xl mb-4 opacity-30' />
      <p className='text-lg font-semibold mb-2'>{info}</p>
      {children}
   </div>
);

export default NoData;
