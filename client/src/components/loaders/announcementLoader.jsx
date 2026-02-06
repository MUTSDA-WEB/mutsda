const AnnouncementLoader = ({ info }) => {
   return (
      <div className='relative flex gap-6 mx-auto w-max text-2xl text-amber-900 font-semibold'>
         {info}
         <div
            className='animate-spin w-12 h-12 rounded-full border-3
        border-r-indigo-500 border-l-amber-500 decoration-dotted '
         ></div>
      </div>
   );
};

export default AnnouncementLoader;
