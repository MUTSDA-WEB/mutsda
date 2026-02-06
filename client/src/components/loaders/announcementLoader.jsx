const AnnouncementLoader = ({ info }) => {
   return (
      <p className='relative flex gap-6'>
         {info}
         <div
            className='animate-spin w-8 h-8 rounded-full border-2
        border-r-indigo-500 border-l-amber-500 decoration-dotted '
         ></div>
      </p>
   );
};

export default AnnouncementLoader;
