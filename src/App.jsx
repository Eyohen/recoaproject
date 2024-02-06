
import {Route, Routes} from 'react-router-dom'
// import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
// import PostDetails from './pages/PostDetails'
// import CreatePost from './pages/CreatePost'
// import EditPost from './pages/EditPost'
// import Profile from './pages/Profile'
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
import SubmarketsCreated from './pages/SubmarketsCreated'
import EditCommunity from './pages/EditCommunity'
import EditSubmarket from './pages/EditSubmarket'
import CreateTenant from './pages/CreateTenant'
import TenantsCreated from './pages/TenantsCreated'
import CorperatePage from './pages/CorperatePage'
import CorperateLogin from './pages/CorperateLogin'
import Reserve from './pages/Reserve'
import CreateUnitType from './pages/CreateUnitType'
import UnitTypesCreated from './pages/UnitTypesCreated'
import InsideCommunity from './pages/InsideCommunity'



const App = () => {


  
  return (
      <UserContextProvider>
      <Routes>
      {/* <Route exact path="/home" element={<Home/>}/> */}
      <Route exact path="/" element={<FrontPage/>}/>
      <Route exact path="/recoa/:id" element={<RecoaSquare/>}/>
      <Route exact path="/test" element={<Test/>}/>
      <Route exact path="/dashboard" element={<AdminDashboard/>}/>
      <Route exact path="/adminpage" element={<AdminPage/>}/>
      <Route exact path="/createtenant" element={<CreateTenant/>}/>
      <Route exact path="/createcommunity" element={<CreateCommunity/>}/>
      <Route exact path="/createsubmarket" element={<CreateSubmarket/>}/>
      <Route exact path="/admin" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/findcommunity/:id" element={<FindCommunity/>}/>
      <Route exact path="/clientlogin" element={<ClientLogin/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/communities" element={<Communities/>}/>
      <Route exact path="/communitiescreated" element={<CommunitiesCreated/>}/>
      <Route exact path="/submarketscreated" element={<SubmarketsCreated/>}/>
      <Route exact path="/unittypescreated" element={<UnitTypesCreated/>}/>
      <Route exact path="/editsubmarket/:id" element={<EditSubmarket/>}/>
      <Route exact path="/editcommunity/:id" element={<EditCommunity/>}/>
      <Route exact path="/tenantscreated" element={<TenantsCreated/>}/>
      <Route exact path="/corperatepage" element={<CorperatePage/>}/>
      <Route exact path="/corperatelogin/:id" element={<CorperateLogin/>}/>
      <Route exact path="/insidecommunity/:id" element={<InsideCommunity />}/>
      <Route exact path="/createunittype" element={<CreateUnitType/>}/>
      <Route exact path="/reserve" element={<Reserve/>}/>
      {/* <Route exact path="/hireorgig" element={<HirerOrGigWorker/>}/>
     
     
      <Route exact path="/write/:id" element={<CreatePost/>}/>
      <Route exact path="/posts/post/:id" element={<PostDetails/>}/>
      <Route exact path="/edit/:id" element={<EditPost/>}/>
      <Route exact path="/myblogs/:id" element={<MyBlogs/>}/>
      <Route exact path="/profile/:id" element={<Profile/>}/> */}
      </Routes>
    
      </UserContextProvider>
  )
}

export default App