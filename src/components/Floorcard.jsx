/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { toast } from "react-toastify";

const fetchAPI = async (endpoint) => {
  try {
    const response = await axios.get(`${URL}${endpoint}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
const Floorcard = ({ unittype }) => {
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(1);
  const [reservationInfo, setReservationInfo] = useState({
    count: 0,
    numAvailable: unittype.numAvailable,
  });
  const navigate = useNavigate();

  const toggleModal = async () => {
    if (!modal) {
      const currentUserStr = localStorage.getItem("currentUser");
      const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
      if (currentUser && currentUser.role === "tenant" && currentUser.tenant) {
        const unitTypeInfo = await fetchAPI(`/api/unittypes/${unittype._id}`);
        const reservation = unitTypeInfo?.reservations.find(
          (r) => r.tenant === currentUser.tenant
        );
        if (reservation) {
          setReservationInfo({
            count: reservation.count,
            numAvailable: reservation.numAvailable,
            tenantName: currentUser.tenantInfo.tenant,
            reservationId: reservation._id,
          });
        } else {
          // No matching reservation found, use default unittype info
          setReservationInfo({
            count: 0,
            numAvailable: unittype.numAvailable,
            reservationId: null,
          });
        }
      } else {
        navigate("/corperatepage");
        return; // Prevent modal from opening if user is not a tenant
      }
    }
    setModal(!modal);
  };

  const handleSubmitReservation = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }
    if (reservationInfo.numAvailable > 0) {
      const currentUserStr = localStorage.getItem("currentUser");
      const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
      const requestBody = {
        reservationId: reservationInfo.reservationId, // Use the stored reservationId
        userId: currentUser?._id, // Assuming the user ID is stored in currentUser object
        count: count,
      };

      try {
        const response = await axios.post(
          `${URL}/api/reservations/user/create`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Reservation submitted:", response.data);
        toast.success("Reservation submitted successfully");
        // close the modal
        setModal(false);
        // Handle success (e.g., navigate to a success page, show a message)
      } catch (error) {
        console.error("Error submitting reservation:", error);
        // Handle error (e.g., show an error message)
      }
    }
  };

  const overlayClick = (e) => {
    e.stopPropagation(); // Prevent click from reaching the overlay
  };

  const increase = () => {
    if (count < reservationInfo.numAvailable) {
      setCount(count + 1);
    }
  };

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div onClick={toggleModal} className="cursor-pointer">
      <div className="relative mt-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 min-w-[200px] sm:min-w-[250px] md:min-w-[300px] shrink-0">
        <img
          src={
            unittype.photo || "https://www.svgrepo.com/show/340721/no-image.svg"
          }
          alt=""
          className="w-full h-[250px] object-cover rounded-3xl"
        />

        <div className="absolute inset-x-0 top-6 flex justify-center space-x-2">
          <p className="text-white font-medium text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
            {unittype?.type}
          </p>
          <p className="text-white font-medium text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
            {unittype?.bathroom} Bath
          </p>
          <p className="text-white font-medium text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
            {unittype?.size} sq.m
          </p>
        </div>

        <div className="absolute inset-x-0 top-16 flex flex-col items-center space-y-2">
          <p className="text-white font-medium text-sm">{unittype?.name}</p>
          <p className="text-white font-medium text-lg">
            <span className="text-xl">{unittype?.numAvailable}</span> available
          </p>
        </div>

        <div className="absolute inset-x-0 top-32 flex justify-center">
          <button className="bg-white text-green-700 font-medium text-lg rounded-full px-4 py-2">
            starting at ${unittype.price}/annum
          </button>
        </div>
      </div>
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={overlayClick}>
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmitReservation}
              className="modal-content rounded-xl p-6 bg-white shadow-lg"
              style={{
                fontFamily: '"Lucida Console", "Courier New", monospace',
                maxWidth: "800px",
                margin: "auto",
              }}
            >
              <button
                type="button"
                className="absolute top-0 right-0 mt-4 mr-4 text-2xl text-gray-600"
                onClick={toggleModal}
              >
                &times;
              </button>

              <h2 className="text-center font-bold text-xl mb-4">
                Reservation Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Unit Image */}
                <div>
                  <img
                    src={
                      unittype.photo ||
                      "https://www.svgrepo.com/show/340721/no-image.svg"
                    }
                    alt={unittype.name}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>

                {/* Unit Details in Table Format with Lines */}
                <div className="md:pl-4">
                  <table className="table-auto w-full border-collapse border border-gray-300">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4 border border-gray-300">
                          Unit:
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          {unittype.name}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 border border-gray-300">
                          Price:
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          ${unittype.price}/annum
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 border border-gray-300">
                          Size:
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          {unittype.size} sq.m
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 border border-gray-300">
                          Details:
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          {unittype.bedroom} Bed, {unittype.bathroom} Bath
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 border border-gray-300">
                          Description:
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          {unittype.desc}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 border border-gray-300">
                          Availability:
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          {reservationInfo.numAvailable} slots available
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 border border-gray-300">
                          Reservation Count:
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={decrease}
                              disabled={count <= 1}
                              className="text-lg px-3 py-1 rounded-full bg-red-500 text-white mr-2"
                            >
                              -
                            </button>
                            {count}
                            <button
                              type="button"
                              onClick={increase}
                              disabled={count >= reservationInfo.numAvailable}
                              className="text-lg px-3 py-1 rounded-full bg-green-500 text-white ml-2"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* Reservation Cost */}
                      <tr>
                        <td className="py-2 px-4 border border-gray-300">
                          Reservation Cost:
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          ${unittype.price * count}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="text-center md:text-left mt-4">
                    <button
                      type="submit"
                      disabled={reservationInfo.numAvailable === 0}
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        reservationInfo.numAvailable === 0
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-green-700 text-white hover:bg-green-800"
                      }`}
                    >
                      Submit Reservation
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Floorcard;
