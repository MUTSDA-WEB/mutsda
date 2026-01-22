import { BrowserRouter } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import AppRouter from "./router";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
