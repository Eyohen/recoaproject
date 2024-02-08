import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { SlPencil, SlArrowLeft, SlTrash } from "react-icons/sl";

const ReservationsCreated = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const res = await axios.get(URL + "/api/reservations", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
      await axios.delete(URL + `/api/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation._id !== reservationId
        )
      );
    } catch (error) {
      console.error("Failed to delete reservation:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-evenly border h-12 bg-white">
        <p>AdminNav</p>
        <p>AdminNav</p>
      </div>

      <div
        onClick={() => navigate(-1)}
        className="flex items-center space-x-3 pt-6 px-12"
      >
        <SlArrowLeft />
        <h1 className="font-bold md:text-2xl text-xl ">Back</h1>
      </div>

      <div className="max-w-[1100px] bg-white mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
          <h1 className="font-bold text-xl mt-10 text-center">Reservations</h1>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 font-light ">
                  ID
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                  key={reservation._id}
                >
                  <td className="px-6 py-2">{reservation._id.slice(0, 6)}</td>
                  <td className="px-6 py-2">{reservation.unitType}</td>
                  <td className="px-6 py-2">{reservation.tenant}</td>
                  <td className="px-6 py-2">{reservation.count}</td>
                  <td className="px-6 py-2">
                    <Link to={`/admin/reservation/edit/${reservation._id}`}>
                      <SlPencil className="mt-3" />
                    </Link>
                    <SlTrash
                      className="ml-2 text-red-800 cursor-pointer"
                      onClick={() => handleDelete(reservation._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationsCreated;
