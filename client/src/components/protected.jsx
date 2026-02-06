import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCheckLoggedIn } from "../services/login";
import userStore from "../hooks/useStore";

// eslint-disable-next-line react/prop-types
function Protected({ children }) {
   const { data, isError, isSuccess } = useCheckLoggedIn();
   const { setUser, isAuthenticated } = userStore();

   // Set user data to zustand store when data is available
   useEffect(() => {
      if (isSuccess && data?.user) {
         setUser(data.user);
         console.log(isAuthenticated);
      }
   }, [data, isSuccess, setUser]);

   if (!localStorage.getItem("token") || isError) {
      return <Navigate to='/' replace />;
   }
   return children;
}

export default Protected;
