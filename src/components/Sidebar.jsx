import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const isActive = (link) => {
    return link === activeLink ? "bg-green-400 text-white" : "";
  };

  return (
    <div className="border h-screen w-[16%] flex flex-col justify-top items-center mt-8">
      <Link to="/admin/dashboard">
        <p className="text-green-800 text-2xl font-bold py-2">Admin</p>
      </Link>
      <div className="text-left mt-6 space-y-6">
        <p className={`px-4 py-2 rounded-lg ${isActive("/admin/dashboard")}`}>
          <Link to={"/admin/dashboard"}>Dashboard</Link>
        </p>
        <p className={`px-4 py-2 rounded-lg ${isActive("/admin/tenant")}`}>
          <Link to={"/admin/tenant"}>Corperate Tenant</Link>
        </p>
        <p className={`px-4 py-2 rounded-lg ${isActive("/admin/user/view")}`}>
          <Link to={"/admin/user/view"}>Users</Link>
        </p>
        <p className={`px-4 py-2 rounded-lg ${isActive("/admin/unit")}`}>
          <Link to={"/admin/unit"}>Units</Link>
        </p>
        <p className={`px-4 py-2 rounded-lg ${isActive("/admin/community")}`}>
          <Link to={"/admin/community"}>Community</Link>
        </p>
        <p className={`px-4 py-2 rounded-lg ${isActive("/admin/submarket")}`}>
          <Link to={"/admin/submarket"}>Submarket</Link>
        </p>
        <p className={`px-4 py-2 rounded-lg ${isActive("/admin/reservation")}`}>
          <Link to={"/admin/reservation"}>Reservations</Link>
        </p>
        <p className={`px-4 py-2 rounded-lg ${isActive("/admin/reservation/user")}`}>
          <Link to={"/admin/reservation/user"}>User Reservations</Link>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
