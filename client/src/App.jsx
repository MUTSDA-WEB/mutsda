import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import GlobalLoader from "./components/ui/GlobalLoader";

function App() {
   return (
      <BrowserRouter>
         <GlobalLoader />
         <AppRouter />
      </BrowserRouter>
   );
}

export default App;
