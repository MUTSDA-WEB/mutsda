import { Navigate } from "react-router-dom";
import { useCheckLoggedIn } from "../services/login";

function Protected({ children }) {
   const { data, isError, isSuccess } = useCheckLoggedIn();
   if (!localStorage.getItem("token") || isError) {
      return <Navigate to='/' replace />;
   }
   console.log(data, isSuccess);
   return children;
}

export default Protected;
