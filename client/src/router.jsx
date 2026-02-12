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
import Contact from "./pages/ContactUs";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

// Layout imports
import PublicLayout from "./layout/PublicLayout";
import DashboardLayout from "./layout/DashboardLayout";

// Dashboard page imports
import Dashboard from "./pages/admin/Dashboard";
import Notifications from "./pages/admin/Notifications";
import CreateEvent from "./pages/admin/CreateEvent";
import Settings from "./pages/admin/Settings";
import Profile from "./pages/admin/Profile";
import MusicAdmin from "./pages/admin/MusicAdmin";
import Protected from "./components/protected";

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
         <Route
            path='/dashboard'
            element={
               <Protected>
                  <DashboardLayout />
               </Protected>
            }
         >
            <Route index element={<Dashboard />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='create-event' element={<CreateEvent />} />
            <Route path='settings' element={<Settings />} />
            <Route path='profile' element={<Profile />} />
            <Route path='music-admin' element={<MusicAdmin />} />
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

         {/* 404 Catch-all Route */}
         <Route path='*' element={<NotFound />} />
      </Routes>
   );
};
export default AppRouter;
