
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
import CreateApartment from './pages/CreateApartment'
import FindApartment from './pages/FindApartment'
import ClientLogin from './pages/ClientLogin'
import CreateEstate from './pages/CreateEstate'
import About from './pages/About'
import Communities from './pages/Communities'
import ApartmentsCreated from './pages/ApartmentsCreated'
import EstatesCreated from './pages/EstatesCreated'
import EditApartment from './pages/EditApartment'
import EditEstate from './pages/EditEstate'



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
      <Route exact path="/createapart" element={<CreateApartment/>}/>
      <Route exact path="/createestate" element={<CreateEstate/>}/>
      <Route exact path="/admin" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/findapartment" element={<FindApartment/>}/>
      <Route exact path="/clientlogin" element={<ClientLogin/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/communities" element={<Communities/>}/>
      <Route exact path="/apartmentscreated" element={<ApartmentsCreated/>}/>
      <Route exact path="/estatescreated" element={<EstatesCreated/>}/>
      <Route exact path="/editestate/:id" element={<EditEstate/>}/>
      <Route exact path="/editapartment/:id" element={<EditApartment/>}/>
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