import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Importing Close Icon from React Icons
import { FaUserCircle } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for the dropdown to handle outside clicks

  useEffect(() => {
    const currentUserStr = localStorage.getItem("currentUser");
    const accessToken = localStorage.getItem("access_token");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    if (currentUser && currentUser.role === "tenant" && accessToken) {
      setIsLoggedIn(true);
      setUserDetails({
        ...currentUser,
        tenantPhoto: currentUser.tenantInfo.photo, // Add tenant's photo to userDetails
      });
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDetails(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/corperatepage");
  };

  return (
    <div className="h-12 flex items-center">
      <div className="flex justify-between p-2 px-6 w-full">
        <Link to={"/"}>
          <p className="text-green-700 font-bold text-3xl">Recoa</p>
        </Link>
        <div className="flex md:space-x-6 items-center">
        <div className='relative'>
          {isOpen ?  <IoCloseOutline onClick={() => setIsOpen((prev) => !prev)}  size={25} className="text-green-700 " /> : <IoMenuOutline onClick={() => setIsOpen((prev) => !prev)}  size={25} className="text-green-700 md:hidden" /> }
        
        {isOpen && (<div  className='rounded border border-gray-300 bg-white py-4 px-2 absolute right-[1px] top-9 w-[140px]'>
   
        <Link to="/about">
    <div className='flex justify-between items-center border-b-2 py-2'>
    <p className='text-green-700'>About Us</p>
    </div>
    </Link>

    <Link to="/findcommunity">
    <div className='flex justify-between items-center border-b-2 py-2'>
    <p className='text-green-700'>Find your Apartment</p>
    </div>
    </Link>


    <Link to="/communities">
    <div className='flex justify-between items-center border-b-2 py-2'>
    <p className='text-green-700'>Communities</p>
    </div>
    </Link>


     
        
       
   
   
   
</div>)}

</div>
          {/* Existing links */}
          <Link to="/about">
            <p className="hidden md:block text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5">
              About us
            </p>
          </Link>
          <Link to={"/findcommunity"}>
            <p className="hidden md:block text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5">
              Find your Apartment
            </p>
          </Link>
          <Link to="/communities">
            <p className="hidden md:block text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5">
              Communities
            </p>
          </Link>
          {/* Conditionally render based on login status */}
          <div className="relative" ref={dropdownRef}>
            {isLoggedIn && (
              <div
                onClick={() => setShowDetails(!showDetails)}
                className="cursor-pointer"
              >
                <img
                  src={userDetails.tenantPhoto}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />{" "}
                {/* Display tenant's photo */}
              </div>
            )}
            {showDetails && userDetails && (
              <div className="absolute right-0 mt-2 py-2 w-72 bg-white rounded-lg shadow-xl z-50 flex flex-col">
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                  <img
                    src={userDetails.tenantPhoto}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border border-gray-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = <FaUserCircle />;
                    }}
                  />
                  <AiOutlineClose
                    onClick={() => setShowDetails(false)}
                    className="cursor-pointer text-gray-400 hover:text-gray-600"
                  />
                </div>
                <div className="px-4 py-2">
                  <p className="text-lg text-gray-900 font-semibold">
                    {userDetails.firstName} {userDetails.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{userDetails.email}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {userDetails.tenantInfo.company}
                  </p>
                  <p className="text-sm text-gray-500">
                    {userDetails.tenantInfo.phone}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left w-full text-red-600 hover:bg-red-50 transition duration-150"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          {!isLoggedIn && (
            <Link to="/corperatepage">
              <p className="hidden md:block text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5">
                Corporate tenants
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
