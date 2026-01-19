import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Home from './pages/Home'
import About from './pages/AboutUs'
import Library from './pages/Library'
import Leadership from './pages/Leadership'
import MusicMinistry from './pages/MusicMinistry'
import CPPage from './pages/CP'
import SabbathSchool from './pages/SabbathSchool'
import BibleStudy from './pages/BibleStudy'
import Welfare from './pages/Welfare'
import Donate from './pages/Donate'
import Contact from './pages/ConatctUs'



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/aboutUs' element={<About />}/>
        <Route path='/library' element={<Library />}/>
        <Route path='/leaders' element={<Leadership />}/>
        <Route path='/donate' element={<Donate />}/>
        <Route path='/contactUs' element={<Contact/>}/>
        <Route path='/ministries/music' element ={<MusicMinistry/>}/>
        <Route path='/ministries/cp' element ={<CPPage/>}/>
        <Route path='/ministries/biblestudy' element ={<BibleStudy/>}/>
        <Route path='/ministries/welfare' element ={<Welfare/>}/>
        <Route path='/ministries/sabbathschool' element ={<SabbathSchool/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
