import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="h-12 items-center">
      <div className="flex justify-between p-2 px-6">
        <Link to={"/"}>
          {" "}
          <p className="text-green-700 font-bold text-3xl">Recoa</p>
        </Link>
        <div className="flex space-x-6">
          <Link to="/about">
            <p className="hidden md:block text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5 ">
              About us
            </p>
          </Link>
          {/* <Link to={user?'/findapartment':"/clientlogin" }><p className='text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5'>Find your Apartment</p></Link> */}
          <Link to={"/findcommunity"}>
            <p className="hidden md:block text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5 ">
              Find your Apartment
            </p>
          </Link>
          <Link to="/communities">
            <p className="hidden md:block text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5">
              Communities
            </p>
          </Link>
          <Link to="/corperatepage">
            <p className="hidden md:block text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5">
              Corperate tenants
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
