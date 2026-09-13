import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import GlobalLoader from "./components/ui/GlobalLoader";
import { useEffect } from "react";
import { useGetSiteData } from "./services/data.service";
import userStore from "./hooks/useStore";

function App() {
   const { data, isSuccess } = useGetSiteData();
   const setSiteData = userStore((state) => state.setSiteData);

   useEffect(() => {
      if (isSuccess && data) {
         setSiteData(data);
      }
   }, [isSuccess, data, setSiteData]);

   return (
      <BrowserRouter>
         <GlobalLoader />
         <AppRouter />
      </BrowserRouter>
   );
}

export default App;
