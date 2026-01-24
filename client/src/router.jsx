import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Library from "./pages/Library";
import Leadership from "./pages/Leadership";
import Gallery from "./pages/Gallery";
import MusicMinistry from "./pages/MusicMinistry";
import CPPage from "./pages/CP";
import SabbathSchool from "./pages/SabbathSchool";
import BibleStudy from "./pages/BibleStudy";
import Welfare from "./pages/Welfare";
import Donate from "./pages/Donate";
import Contact from "./pages/ConatctUs";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Layout imports
import PublicLayout from "./layout/PublicLayout";
import DashboardLayout from "./layout/DashboardLayout";

// Dashboard page imports
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import CreateEvent from "./pages/CreateEvent";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

const AppRouter = () => {
   return (
      <Routes>
         {/* Public Routes with Header & Footer */}
         <Route element={<PublicLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/aboutUs' element={<About />} />
            <Route path='/library' element={<Library />} />
            <Route path='/leaders' element={<Leadership />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/donate' element={<Donate />} />
            <Route path='/contactUs' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            {/* Ministries routes */}
            <Route path='/ministries'>
               <Route path='music' element={<MusicMinistry />} />
               <Route path='cp' element={<CPPage />} />
               <Route path='biblestudy' element={<BibleStudy />} />
               <Route path='welfare' element={<Welfare />} />
               <Route path='sabbathschool' element={<SabbathSchool />} />
            </Route>
         </Route>

         {/* Dashboard Routes for registered users */}
         <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='create-event' element={<CreateEvent />} />
            <Route path='settings' element={<Settings />} />
            <Route path='profile' element={<Profile />} />
            <Route path='library' element={<Library />} />
            <Route path='about' element={<About />} />
            <Route path='leaders' element={<Leadership />} />
            <Route path='gallery' element={<Gallery />} />
            <Route path='contact' element={<Contact />} />
            {/* Dashboard Ministries */}
            <Route path='ministries'>
               <Route path='music' element={<MusicMinistry />} />
               <Route path='cp' element={<CPPage />} />
               <Route path='biblestudy' element={<BibleStudy />} />
               <Route path='welfare' element={<Welfare />} />
               <Route path='sabbathschool' element={<SabbathSchool />} />
            </Route>
         </Route>
      </Routes>
   );
};
export default AppRouter;
