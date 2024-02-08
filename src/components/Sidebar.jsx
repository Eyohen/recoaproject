import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="border h-screen w-[16%]">
      <Link to="/admin/dashboard">
        <p className="text-green-800 text-2xl font-bold text-center py-2">
          Admin
        </p>
      </Link>

      <div className="text-center mt-6 space-y-6">
        <Link to={"/admin/dashboard"}>
          <p>Dashboard</p>
        </Link>
        <Link to={"/admin/tenant"}>
          <p className="mt-6">Tenant</p>
        </Link>
        <Link to={"/admin/unit"}>
          <p className="mt-6">Units</p>
        </Link>
        <Link to={"/admin/community"}>
          <p className="mt-6">Community</p>
        </Link>
        <Link to={"/admin/submarket"}>
          <p className="mt-6">Submarket</p>
        </Link>
        <Link to={"/admin/reservation"}>
          <p className="mt-6">Reservations</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
