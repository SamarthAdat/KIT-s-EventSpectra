import {  Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import AboutUsPage from './Pages/AboutUsPage'
import ContactUsPage from './Pages/ContactUSPage'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import ProfilePage from './Pages/User/ProfilePage'
import ClubList from './Pages/Clubs/ClubList'
import AccessDenied from './Pages/AccessDenied'
import ClubDescription from './Pages/Clubs/ClubDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateClub from './Pages/Clubs/CreateClub'
import EditProfile from './Pages/User/EditProfile'
import EventDescription from './Pages/Events/EventDescription'
import EventList from './Pages/Events/EventList'
import AddEvent from './Pages/Events/AddEvent'
import ChangePassword from './Pages/User/ChangePassword'
import StudentCompanyRegister from './Pages/StudentCompanyRegister'
import CompanyList from './Pages/Companies/CompanyList'
import CompanyDescription from './Pages/Companies/CompanyDescription'
import StudentList from './Pages/StudentList'
import CreateCompany from './Pages/Companies/CreateCompany'
import UpdateCompany from './Pages/Companies/UpdateCompany'
import UpdateEvent from './Pages/Events/UpdateEvent'
import TPOupdate from './Pages/TPOupdate'
import RenderTPOupdates from './Pages/RenderTPOupdates'
//import Chatbot from './Pages/ChatBot/Chatbot'


function App() {
  

  return (

    // routes 
    <Routes>
        <Route path='/' element={ <HomePage/> } />
        <Route path='/about-us' element={ <AboutUsPage/> } />
        <Route path='/contact-us' element={ <ContactUsPage/> } />
        <Route path='/signup' element={ <Signup/> } />
        <Route path='/login' element={ <Signin/> } />
        <Route path='/user/profile' element={ <ProfilePage/> } />
        <Route path='/user/change-password' element={ <ChangePassword/> } />
        <Route path='/clubs' element={ <ClubList/> } />
        <Route path='/events' element={ <EventList/> } />
        <Route path='/club/description' element={ <ClubDescription/> } />
        <Route path='/club/event/description' element={ <EventDescription/> } />
        <Route path='/denied' element={ <AccessDenied/> } />
        <Route path='/master-data-sheet' element={ <StudentCompanyRegister/> } />
        <Route path='/companies' element={ <CompanyList/> } />
        <Route path='/company/description' element={ <CompanyDescription/> } />
        <Route path='/company/student-list' element={ <StudentList/> } />
        <Route path='/tpo-updates' element={ <RenderTPOupdates/> } />

        {/* admin routes */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>} >
            <Route path='club/create-club' element={ <CreateClub/>} />
            <Route path='club/add-event' element={ <AddEvent/>} />
            <Route path='club/update-event' element={<UpdateEvent/>}/>
            <Route path='/:eventId/reminder' element={<EventDescription/>}/>
            <Route path='tpo-update' element={ <TPOupdate/>} />
            
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>} >
            <Route path='/user/profile' element={ <ProfilePage/>} />
            <Route path='/user/edit-profile' element={ <EditProfile/>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
              <Route path='/companies/create-company' element={<CreateCompany/>}/>
              <Route path='/company/update-company' element={<UpdateCompany/>}/>
        </Route>


        <Route path='*' element={<NotFound/> } />
        
        
        {/* <Route path='/chatBot' element={<Chatbot/>} /> */}
    
    </Routes>



  )
}

export default App
