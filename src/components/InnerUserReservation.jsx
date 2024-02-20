import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InnerReservation = () => {
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState("");
  const [selectedTenant, setSelectedTenant] = useState("");
  const [count, setCount] = useState("");
  const [availableCount, setAvailableCount] = useState(0); // Store available count
  const [created, setCreated] = useState(false);
  const [createDisabled, setCreateDisabled] = useState(false);

  useEffect(() => {
    fetchReservations();
    fetchUser();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get(URL + "/api/reservations");
      console.log("here", res.data);
      setReservations(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch unit types");
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(URL + "/api/user");
      console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch user");
    }
  };

  const handleReservationChange = (e) => {
    const selectedId = e.target.value;
    setSelectedReservation(selectedId);
    const selectedType = reservations.find((type) => type._id === selectedId);
    setAvailableCount(selectedType ? selectedType.numAvailable : 0);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Validate count against available count
    if (parseInt(count) > availableCount) {
      toast.error("Entered count exceeds available units");
      return; // Prevent further execution
    }

    setCreateDisabled(true); // Disable create button
    try {
      await createReservation();
      navigate("/admin/user/reservation/view");
      setCreated(true);
      setSelectedReservation("");
      setSelectedTenant("");
      setCount("");
      toast.success("Reservation created successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create reservation");
    } finally {
      setCreateDisabled(false); // Enable create button
    }
  };

  const createReservation = async () => {
    const reservationData = {
      reservationId: selectedReservation,
      tenantId: selectedTenant,
      count,
    };

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      await axios.post(URL + "/api/reservations/create", reservationData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Reservation created successfully");
      navigate("/admin/reservation/view");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create reservation");
    }
  };

  return (
    <div className="w-full bg-gray-200">
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl text-green-800 text-center">
          Create Reservation
        </h1>
        <Link to="/admin/reservation/view">
          <p className="text-green-600">See Reservations</p>
        </Link>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <select
            value={selectedReservation}
            onChange={handleReservationChange}
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          >
            <option value="">Select Unit Type</option>
            {reservations.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name} - {type.numAvailable} available -{" "}
                {type.community.name} - {type.community.status}
              </option>
            ))}
          </select>
          <select
            value={selectedTenant}
            onChange={(e) => setSelectedTenant(e.target.value)}
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          >
            <option value="">Select Tenant</option>
            {user.map((tenant) => (
              <option key={tenant._id} value={tenant._id}>
                {tenant.tenant}
              </option>
            ))}
          </select>
          <input
            onChange={(e) => setCount(e.target.value)}
            value={count}
            type="number"
            placeholder="Enter Count"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />

          <button
            onClick={handleCreate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
            disabled={createDisabled}
          >
            {createDisabled ? "Creating..." : "Create Reservation"}
          </button>
          {created && (
            <h3 className="text-green-500 text-sm text-center mt-4">
              {createDisabled
                ? "Creating..."
                : "Reservation created successfully!"}
            </h3>
          )}
        </form>
      </div>
    </div>
  );
};

export default InnerReservation;
