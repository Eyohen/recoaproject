/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import { SlEye } from "react-icons/sl";

const ConfirmationPopup = ({ tenantDetails, onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Tenant Details
                </h3>
                <div className="mt-2">
                  <div className="flex items-center justify-center">
                    <img
                      src={tenantDetails.photo}
                      alt="Tenant"
                      className="w-24 h-24 rounded-full"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    <strong>Name:</strong> {tenantDetails.tenant}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Email:</strong> {tenantDetails.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Phone:</strong> {tenantDetails.phone}
                  </p>
                  {/* Add more details as needed */}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminNav = () => {
  const { user, setUser } = useContext(UserContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null); // State to store the selected tenant
  const [tenants, setTenants] = useState([]);
  const [stats, setStats] = useState({
    submarketCount: 0,
    tenantCount: 0,
    userCount: 0,
    communityCount: 0,
    unitCount: 0,
    reservationcount: 0,
    userReservationcount: 0,
  });
  const navigate = useNavigate();
  // State for admin information
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    role: "",
    createdAt: "",
    lastActivityDate: "",
    email: "",
  });

  const logOut = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/admin/login");
  };

  useEffect(() => {
    // Fetch tenant data from the backend
    const fetchTenants = async () => {
      try {
        const response = await axios.get(`${URL}/api/tenants`);
        setTenants(response.data);
      } catch (error) {
        console.error("Failed to fetch tenants:", error);
      }
    };
    const fetchStats = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }
        const response = await axios.get(`${URL}/api/auth/admin/fetch-stats`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            });
            console.log("Stats:", response.data);
            setStats(response.data);
        } catch (error) {
            console.error("Failed to fetch tenants:", error);
        }
    };
    fetchStats();
    fetchTenants();
    // Retrieve admin information from local storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setAdminInfo({
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        role: currentUser.role,
        createdAt: currentUser.createdAt,
        lastActivityDate: currentUser.updatedAt,
        email: currentUser.email,
      });
    }
  }, []);

  const handleViewDetails = (tenant) => {
    // Function to handle viewing details of a tenant
    // Set the selected tenant and show the confirmation popup
    setSelectedTenant(tenant);
    setShowConfirmation(true);
  };

return (
  <div className="w-full bg-gray-50">
    <div className="flex justify-between items-center border-b h-16 bg-white px-6">
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-gray-800">{adminInfo.role}</span>
        <span className="text-sm text-gray-500">
          {user ? "Logged In" : "Not logged in"}
        </span>
      </div>
      <button
        onClick={logOut}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md"
      >
        Log Out
      </button>
    </div>

    <div className="flex flex-wrap justify-center gap-4 mt-8">
      <div className="flex flex-col items-center p-4">
        <p className="text-lg font-semibold text-gray-800">Email</p>
        <p className="text-md text-gray-500">{adminInfo.email}</p>
      </div>

      <div className="flex flex-col items-center p-4">
        <p className="text-lg font-semibold text-gray-800">Name</p>
        <p className="text-md text-gray-500">{adminInfo.name}</p>
      </div>

      <div className="flex flex-col items-center p-4">
        <p className="text-lg font-semibold text-gray-800">Account Created</p>
        <p className="text-md text-gray-500">
          {new Date(adminInfo.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col items-center p-4">
        <p className="text-lg font-semibold text-gray-800">Last Activity</p>
        <p className="text-md text-gray-500">
          {new Date(adminInfo.lastActivityDate).toLocaleString()}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6 justify-center mt-8 px-6">
      <div className="border p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
        <p className="text-sm font-semibold text-gray-600">Submarkets</p>
        <p className="text-3xl font-bold">{stats.submarketCount}</p>
      </div>

      <div className="border p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
        <p className="text-sm font-semibold text-gray-600">Tenants</p>
        <p className="text-3xl font-bold">{stats.tenantCount}</p>
      </div>

      <div className="border p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
        <p className="text-sm font-semibold text-gray-600">Users</p>
        <p className="text-3xl font-bold">{stats.userCount}</p>
      </div>

      <div className="border p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
        <p className="text-sm font-semibold text-gray-600">Communities</p>
        <p className="text-3xl font-bold">{stats.communityCount}</p>
      </div>

      <div className="border p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
        <p className="text-sm font-semibold text-gray-600">Units</p>
        <p className="text-3xl font-bold">{stats.unitCount}</p>
      </div>

      <div className="border p-6 shadow-md rounded-lg bg-white flex flex-col items-center">
        <p className="text-sm font-semibold text-gray-600">
          Booked Reservations
        </p>
        <p className="text-3sm font-bold">Tenant - {stats.reservationCount} </p>
        <p className="text-3sm font-bold">User - {stats.userReservationCount} </p>
      </div>
    </div>

    <div className="max-w-4xl bg-white mx-auto mt-10 shadow-lg rounded-lg">
      <h1 className="font-semibold text-xl py-5 text-center text-gray-800">
        Tenants Information
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Tenant
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Date Created
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tenants.map((tenant, index) => (
              <tr
                className="hover:bg-gray-50"
                key={index}
                onClick={() => handleViewDetails(tenant)}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{tenant.tenant}</td>
                <td className="px-6 py-4">{tenant.email}</td>
                <td className="px-6 py-4">{tenant.phone}</td>
                <td className="px-6 py-4">
                  {new Date(adminInfo.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">{tenant.company}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <SlEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showConfirmation &&
          selectedTenant && ( // Show popup only if selectedTenant exists
            <ConfirmationPopup
              tenantDetails={selectedTenant} // Pass selected tenant details
              onClose={() => setShowConfirmation(false)}
            />
          )}
      </div>
    </div>
  </div>
);

};

export default AdminNav;
