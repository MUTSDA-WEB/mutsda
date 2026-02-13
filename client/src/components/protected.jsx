import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCheckLoggedIn } from "../services/login";
import userStore from "../hooks/useStore";

// eslint-disable-next-line react/prop-types
function Protected({ children }) {
   const { data, isError, isSuccess, isPending } = useCheckLoggedIn();
   const { setUser, isAuthenticated } = userStore();

   // Set user data to zustand store when data is available
   useEffect(() => {
      if (isSuccess && data?.user) {
         setUser(data.user);
         console.log(isAuthenticated);
      }
   }, [data, isSuccess, setUser]);

   // While loading, show nothing or a loading spinner
   if (isPending) {
      return <div>Loading...</div>;
   }

   // If there's an error checking login, redirect to home
   if (isError) {
      return <Navigate to='/' replace />;
   }

   // If logged in successfully, show children
   if (isSuccess) {
      return children;
   }

   return <Navigate to='/' replace />;
}

export default Protected;
