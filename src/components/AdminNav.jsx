import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();

  const logOut = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/admin");
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
    fetchTenants();
  }, []);

  const handleViewDetails = (tenant) => {
    // Function to handle viewing details of a tenant
    console.log("View details:", tenant);
    // Set the selected tenant and show the confirmation popup
    setSelectedTenant(tenant);
    setShowConfirmation(true);
  };

  return (
    <div className="w-full bg-gray-200">
      <div className="flex justify-evenly border h-12 bg-white p-2">
        <p>Administration</p>
        <p>{user ? "logged In" : "Not logged in"}</p>

        <button onClick={logOut} className="bg-green-400 px-4 text-white">
          LogOut
        </button>
      </div>

      <div className="flex space-x-10 justify-center mt-6">
        <div className="border px-20 py-6 shadow-xl rounded-2xl bg-white">
          <p className="text-md">Users</p>
          <p className="text-2xl font-medium">175</p>
        </div>

        <div className="border px-20 py-6 shadow-xl rounded-2xl text-center bg-white">
          <p className="text-md">Booked Apartments</p>
          <p className="text-2xl font-medium">175</p>
        </div>

        <div className="border px-20 py-6 shadow-xl rounded-2xl text-center bg-white">
          <p className="text-md">Booked Floors</p>
          <p className="text-2xl font-medium">175</p>
        </div>
      </div>


      <div className="flex space-x-10 justify-center mt-6">
        {/* Your statistics components */}
      </div>

      <div className="max-w-[1100px] bg-white mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
          <h1 className="font-bold text-xl mt-10 text-center">
            Tenants Information
          </h1>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 font-light">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Tenant
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Date Created
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200 cursor-pointer"
                  key={index}
                  onClick={() => handleViewDetails(tenant)}
                >
                  <td className="px-6 py-2">{index + 1}</td>
                  <td className="px-6 py-2">{tenant.tenant}</td>
                  <td className="px-6 py-2">{tenant.email}</td>
                  <td className="px-6 py-2">{tenant.phone}</td>
                  <td className="px-6 py-2">{tenant.createdAt}</td>
                  <td className="px-6 py-2">{tenant.company}</td>
                  <td className="px-6 py-4">
                    {tenant.status === "active" ? (
                      <p className="bg-green-400 px-1 rounded-3xl text-white">
                        {tenant.status}
                      </p>
                    ) : (
                      <p className="bg-red-400 px-1 rounded-3xl text-white">
                        {tenant.status}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      View Details
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
