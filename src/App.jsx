
import {Route, Routes} from 'react-router-dom'
// import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
// import PostDetails from './pages/PostDetails'
// import CreatePost from './pages/CreatePost'
// import EditPost from './pages/EditPost'
// import Profile from './pages/Profile'
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from './context/UserContext'
// import MyBlogs from './pages/MyBlogs'
import FrontPage from './pages/FrontPage'
import RecoaSquare from './pages/RecoaSquare'
import Test from './pages/Test'
import AdminDashboard from './pages/AdminDashboard'
import AdminPage from './pages/AdminPage'
// import AboutGeega from './pages/AboutGeega'
import CreateCommunity from './pages/CreateCommunity'
import FindCommunity from './pages/FindCommunity'
import ClientLogin from './pages/ClientLogin'
import CreateSubmarket from './pages/CreateSubmarket'
import About from './pages/About'
import Communities from './pages/Communities'
import CommunitiesCreated from './pages/CommunitiesCreated'
import ReservationsCreated from './pages/ReservationCreated'
import SubmarketsCreated from './pages/SubmarketsCreated'
import EditCommunity from './pages/EditCommunity'
import EditSubmarket from './pages/EditSubmarket'
import EditUnitType from './pages/EditUnitType'
import EditReservation from './pages/EditReservation'
import CreateTenant from './pages/CreateTenant'
import TenantsCreated from './pages/TenantsCreated'
import CorperatePage from './pages/CorperatePage'
import CorperateLogin from './pages/CorperateLogin'
import Reserve from './pages/Reserve'
import CreateUnitType from './pages/CreateUnitType'
import CreateReservation from './pages/CreateReservation';
import UnitTypesCreated from './pages/UnitTypesCreated'
import InsideCommunity from './pages/InsideCommunity'
import "react-toastify/dist/ReactToastify.css";



const App = () => {


  
  return (
    <UserContextProvider>
      <ToastContainer position="top-center" limit={1} />

      <Routes>
        {/* <Route exact path="/home" element={<Home/>}/> */}
        <Route exact path="/" element={<FrontPage />} />
        <Route exact path="/recoa/:id" element={<RecoaSquare />} />
        <Route exact path="/test" element={<Test />} />
        <Route exact path="/dashboard" element={<AdminDashboard />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/findcommunity/:id" element={<FindCommunity />} />
        <Route exact path="/clientlogin" element={<ClientLogin />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/communities" element={<Communities />} />
        <Route exact path="/corperatepage" element={<CorperatePage />} />
        <Route exact path="/corperatelogin/:id" element={<CorperateLogin />} />
        <Route exact path="/insidecommunity/:id" element={<InsideCommunity />} />
        <Route exact path="/reserve" element={<Reserve />} />

        {/* ADMIN PAGES */}
        <Route exact path="/admin/dashboard" element={<AdminPage />} />
        <Route exact path="/admin/login" element={<Login />} />
        <Route exact path="/admin/tenant" element={<CreateTenant />} />
        <Route exact path="/admin/submarket" element={<CreateSubmarket />} />
        <Route exact path="/admin/community" element={<CreateCommunity />} />
        <Route exact path="/admin/reservation" element={<CreateReservation />} />
        <Route exact path="/admin/unit" element={<CreateUnitType />} />
        <Route exact path="/admin/tenant/view" element={<TenantsCreated />} />
        <Route exact path="/admin/community/view" element={<CommunitiesCreated />} />
        <Route exact path="/admin/reservation/view" element={<ReservationsCreated />} />
        <Route exact path="/admin/submarket/view" element={<SubmarketsCreated />} />
        <Route exact path="/admin/unit/view" element={<UnitTypesCreated />} />
        <Route exact path="/admin/submarket/edit/:id" element={<EditSubmarket />} />
        <Route exact path="/admin/unittype/edit/:id" element={<EditUnitType />} />
        <Route exact path="/admin/reservation/edit/:id" element={<EditReservation />} />
        <Route exact path="/admin/community/edit/:id" element={<EditCommunity />} />
        {/* <Route exact path="/hireorgig" element={<HirerOrGigWorker/>}/>
     
     
      <Route exact path="/write/:id" element={<CreatePost/>}/>
      <Route exact path="/posts/post/:id" element={<PostDetails/>}/>
      <Route exact path="/edit/:id" element={<EditPost/>}/>
      <Route exact path="/myblogs/:id" element={<MyBlogs/>}/>
      <Route exact path="/profile/:id" element={<Profile/>}/> */}
      </Routes>
    </UserContextProvider>
  );
}

export default App