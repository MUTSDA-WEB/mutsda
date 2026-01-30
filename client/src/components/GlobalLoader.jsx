import { useState, useEffect } from "react";
import logo from "../assets/church_logo.png";
import userStore from "../hooks/useStore";

const GlobalLoader = () => {
   const { isLoading, setLoading } = userStore();
   const [currentTextIndex, setCurrentTextIndex] = useState(0);
   const [displayText, setDisplayText] = useState("");
   const [isTyping, setIsTyping] = useState(true);

   const messages = [
      "Welcome to MUTSDA",
      "We love you",
      "We value you",
      "And we mean it",
   ];

   useEffect(() => {
      if (!isLoading) return;

      const currentMessage = messages[currentTextIndex];

      if (isTyping) {
         if (displayText.length < currentMessage.length) {
            const timeout = setTimeout(() => {
               setDisplayText(currentMessage.slice(0, displayText.length + 1));
            }, 80);
            return () => clearTimeout(timeout);
         } else {
            // Pause at end of message
            const timeout = setTimeout(() => {
               setIsTyping(false);
            }, 1500);
            return () => clearTimeout(timeout);
         }
      } else {
         // Erasing
         if (displayText.length > 0) {
            const timeout = setTimeout(() => {
               setDisplayText(displayText.slice(0, -1));
            }, 40);
            return () => clearTimeout(timeout);
         } else {
            // Move to next message
            setCurrentTextIndex((prev) => (prev + 1) % messages.length);
            setIsTyping(true);
         }
      }
   }, [isLoading, displayText, isTyping, currentTextIndex, messages]);

   // Reset on mount
   useEffect(() => {
      if (isLoading) {
         setCurrentTextIndex(0);
         setDisplayText("");
         setIsTyping(true);
      }
   }, [isLoading]);

   if (!isLoading) return null;

   return (
      <div className='fixed inset-0 z-300 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
         <div className='relative w-[90%] max-w-md rounded-2xl bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 p-8 shadow-2xl border border-white/10'>
            {/* Decorative glow */}
            <div className='absolute -inset-1 bg-linear-to-r from-[#3298C8] to-sky-600 rounded-2xl blur-lg opacity-20'></div>

            <div className='relative flex flex-col items-center'>
               {/* Logo */}
               <div className='mb-6 w-24 h-24 rounded-full bg-white/10 p-3 ring-2 ring-[#3298C8]/50'>
                  <img
                     src={logo}
                     alt='MUTSDA Logo'
                     className='w-full h-full object-contain'
                  />
               </div>

               {/* Dynamic Typing Text */}
               <div className='h-12 flex items-center justify-center mb-8'>
                  <h2 className='text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse'>
                     {displayText}
                     <span className='animate-blink text-yellow-400'>|</span>
                  </h2>
               </div>

               {/* Dotted Spinner */}
               <div className='flex items-center gap-2'>
                  <div className='flex space-x-1'>
                     <span
                        className='w-2 h-2 bg-[#3298C8] rounded-full animate-bounce'
                        style={{ animationDelay: "0ms" }}
                     ></span>
                     <span
                        className='w-2 h-2 bg-[#3298C8] rounded-full animate-bounce'
                        style={{ animationDelay: "150ms" }}
                     ></span>
                     <span
                        className='w-2 h-2 bg-[#3298C8] rounded-full animate-bounce'
                        style={{ animationDelay: "300ms" }}
                     ></span>
                     <span
                        className='w-2 h-2 bg-[#3298C8] rounded-full animate-bounce'
                        style={{ animationDelay: "450ms" }}
                     ></span>
                  </div>
               </div>

               {/* Loading text */}
               <p className='mt-4 text-gray-400 text-sm'>Loading...</p>
            </div>
         </div>
      </div>
   );
};

export default GlobalLoader;
