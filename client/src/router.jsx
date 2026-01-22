import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Library from "./pages/Library";
import Leadership from "./pages/Leadership";
import MusicMinistry from "./pages/MusicMinistry";
import CPPage from "./pages/CP";
import SabbathSchool from "./pages/SabbathSchool";
import BibleStudy from "./pages/BibleStudy";
import Welfare from "./pages/Welfare";
import Donate from "./pages/Donate";
import Contact from "./pages/ConatctUs";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutUs" element={<About />} />
      <Route path="/library" element={<Library />} />
      <Route path="/leaders" element={<Leadership />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/contactUs" element={<Contact />} />
      {/* This is where all the ministries routes go */}
      <Route path="/ministries">
        <Route path="music" element={<MusicMinistry />} />
        <Route path="cp" element={<CPPage />} />
        <Route path="biblestudy" element={<BibleStudy />} />
        <Route path="welfare" element={<Welfare />} />
        <Route path="sabbathschool" element={<SabbathSchool />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;
