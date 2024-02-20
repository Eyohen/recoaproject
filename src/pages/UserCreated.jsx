import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import {SlTrash, SlEye } from "react-icons/sl";

const UserCreated = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const res = await axios.get(URL + "/api/users/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('thehere',res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      await axios.delete(URL + `/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user._id !== userId
        )
      );
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-evenly border h-12 bg-white">
        <p>AdminNav</p>
        <p>AdminNav</p>
      </div>

      <div className="max-w-[1100px] bg-white mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
          <h1 className="font-bold text-xl mt-10 text-center">
            Tenant User Users
          </h1>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 font-light ">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  name
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Tenant
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  delete
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  view details
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                  key={user._id}
                >
                  <td className="px-6 py-2">{user._id.slice(0, 6)}</td>
                  <td className="px-6 py-2">{user.email}</td>
                  <td className="px-6 py-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-2">{user.role}</td>
                  <td className="px-6 py-2">
                    {user.tenant ? user.tenant.tenant : "-"}
                  </td>
                  <td className="px-6 py-2">
                    <SlTrash
                      className="ml-2 text-red-800 cursor-pointer"
                      onClick={() => handleDelete(user._id)}
                    />
                  </td>
                  <td
                    className="px-6 py-2"
                    key={user._id}
                    onClick={() => openModal(user)} // Add onClick handler
                  >
                    <SlEye className="ml-2 text-green-800 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-md overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div
              key={selectedUser._id}
              className="border-b border-gray-300 mb-4 pb-4"
            >
              {/* Existing details display */}
              <div className="flex justify-between mb-2">
                <p className="font-bold">ID:</p>
                <p>{selectedUser._id}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Email:</p>
                <p>{selectedUser.email}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Name:</p>
                <p>
                  {selectedUser.firstName} {selectedUser.lastName}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Role:</p>
                <p>{selectedUser.role}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Tenant:</p>
                <p>{selectedUser.tenant ? selectedUser.tenant.tenant : "-"}</p>
              </div>

              {/* New details for waitlist and reservations count */}
              <div className="flex justify-between mb-2">
                <p className="font-bold">Waitlist Count:</p>
                <p>{selectedUser.waitlists.length}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Reservations Count:</p>
                {/* Calculate unique reservations count */}
                <p>{[...new Set(selectedUser.reservations)].length}</p>
              </div>

              <div className="flex justify-between mb-2">
                <p className="font-bold">Created At:</p>
                <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Updated At:</p>
                <p>{new Date(selectedUser.updatedAt).toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCreated;
