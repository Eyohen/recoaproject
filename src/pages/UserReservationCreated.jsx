import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import {SlTrash, SlEye } from "react-icons/sl";

const UserReservationsCreated = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchReservations = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const res = await axios.get(URL + "/api/reservations/user/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('thehere',res.data);
      setReservations(res.data);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (reservationId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      await axios.delete(URL + `/api/reservations/user/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.reservation._id !== reservationId
        )
      );
    } catch (error) {
      console.error("Failed to delete reservation:", error);
    }
  };
  const openModal = (reservation) => {
    setSelectedReservation(reservation);
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
          Corperate Tenant User Reservations
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
                  Unit Type
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Tenant
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Count
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
              {reservations.map((reservation) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                  key={reservation._id}
                >
                  <td className="px-6 py-2">
                    {reservation.reservation._id.slice(0, 6)}
                  </td>
                  <td className="px-6 py-2">
                    {reservation.user ? reservation.user.email : null}
                  </td>
                  <td className="px-6 py-2">
                    {reservation.reservation.unitType.name}
                  </td>
                  <td className="px-6 py-2">
                    {reservation.reservation.tenant
                      ? reservation.reservation.tenant.tenant
                      : null}
                  </td>
                  <td className="px-6 py-2">{reservation.count}</td>
                  <td className="px-6 py-2">
                    <SlTrash
                      className="ml-2 text-red-800 cursor-pointer"
                      onClick={() => handleDelete(reservation._id)}
                    />
                  </td>
                  <td
                    className="px-6 py-2"
                    key={reservation._id}
                    onClick={() => openModal(reservation)} // Add onClick handler
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
            <h2 className="text-xl font-bold mb-4">Reservation Details</h2>
            <div
              key={selectedReservation._id}
              className="border-b border-gray-300 mb-4 pb-4"
            >
              <div className="flex justify-between mb-2">
                <p className="font-bold">ID:</p>
                <p>{selectedReservation._id}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Unit Type:</p>
                <p>{selectedReservation.reservation.unitType.name}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Unit Price:</p>
                <p>${selectedReservation.reservation.unitType.price}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Count:</p>
                <p>{selectedReservation.count}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Reserve Value:</p>
                <p>
                  $
                  {selectedReservation.reservation.unitType.price *
                    selectedReservation.count}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Tenant:</p>
                <p>{selectedReservation.reservation.tenant.tenant}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Tenant Email:</p>
                <p>{selectedReservation.reservation.tenant.email}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">User:</p>
                <p>
                  {selectedReservation.user.firstName}{" "}
                  {selectedReservation.user.lastName}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">User Email:</p>
                <p>{selectedReservation.user.email}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-bold">Created At:</p>
                <p>
                  {new Date(selectedReservation.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Updated At:</p>
                <p>
                  {new Date(selectedReservation.updatedAt).toLocaleString()}
                </p>
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

export default UserReservationsCreated;
