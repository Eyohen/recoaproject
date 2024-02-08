import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { toast } from "react-toastify";

const EditReservation = () => {
  const reservationId = useParams().id;
  const navigate = useNavigate();
  const [unitType, setUnitType] = useState("");
  const [tenant, setTenant] = useState("");
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(true); // State for loading screen
  const [updateDisabled, setUpdateDisabled] = useState(false); // State to disable update button

  const fetchReservation = async () => {
    try {
      const res = await axios.get(URL + "/api/reservations/" + reservationId);
      setUnitType(res.data.unitType);
      setTenant(res.data.tenant);
      setCount(res.data.count);
      setLoading(false); // Hide loading screen after data is fetched
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch reservation");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateDisabled(true); // Disable update button
    try {
      await updateReservation();
      toast.success("Reservation updated successfully");
      navigate(-1);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update reservation");
    } finally {
      setUpdateDisabled(false); // Enable update button
    }
  };

  const updateReservation = async () => {
    const reservation = {
      unitType,
      tenant,
      count,
    };

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      await axios.put(URL + "/api/reservations/" + reservationId, reservation, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Reservation updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update reservation");
    }
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  return (
    <div>
      {loading ? ( // Display loading screen if data is being fetched
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="px-6 md:px-[200px] mt-8">
          <div
            onClick={() => navigate(-1)}
            className="flex items-center space-x-3"
          >
            <SlArrowLeft />
            <h1 className="font-bold md:text-2xl text-xl ">Back</h1>
          </div>
          <h1 className="font-bold md:text-2xl text-xl text-center ">
            Update Reservation
          </h1>
          <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
            <input
              onChange={(e) => setUnitType(e.target.value)}
              value={unitType}
              type="text"
              placeholder="Enter Unit Type"
              className="px-4 py-2 border outline-none text-gray-400"
            />
            <input
              onChange={(e) => setTenant(e.target.value)}
              value={tenant}
              type="text"
              placeholder="Enter Tenant"
              className="px-4 py-2 border outline-none text-gray-400"
            />
            <input
              onChange={(e) => setCount(e.target.value)}
              value={count}
              type="number"
              placeholder="Enter Count"
              className="px-4 py-2 border outline-none text-gray-400"
            />
            <button
              onClick={handleUpdate}
              disabled={updateDisabled} // Disable button when clicked
              className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
            >
              {updateDisabled ? "Updating..." : "Update Reservation"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditReservation;
