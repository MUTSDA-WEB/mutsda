import { Navigate } from "react-router-dom";
import { useCheckLoggedIn } from "../services/login";

function Protected({ children }) {
   const { data, isError, isSuccess } = useCheckLoggedIn();
   if (!localStorage.getItem("token") || isError) {
      return <Navigate to='/' replace />;
   }
   return children;
}

export default Protected;
