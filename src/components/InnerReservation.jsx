import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InnerReservation = () => {
  const navigate = useNavigate();

  const [unitTypes, setUnitTypes] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [selectedUnitType, setSelectedUnitType] = useState("");
  const [selectedTenant, setSelectedTenant] = useState("");
  const [count, setCount] = useState("");
  const [created, setCreated] = useState(false);
  const [createDisabled, setCreateDisabled] = useState(false);

  useEffect(() => {
    fetchUnitTypes();
    fetchTenants();
  }, []);

  const fetchUnitTypes = async () => {
    try {
      const res = await axios.get(URL + "/api/unitTypes");
            console.log(res.data);
      setUnitTypes(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch unit types");
    }
  };

  const fetchTenants = async () => {
    try {
      const res = await axios.get(URL + "/api/tenants");
      console.log(res.data);
      setTenants(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch tenants");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateDisabled(true); // Disable create button
    try {
      await createReservation();
      toast.success("Reservation created successfully");
      navigate("/admin/reservation/view");
      setCreated(true);
      setSelectedUnitType("");
      setSelectedTenant("");
      setCount("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create reservation");
    } finally {
      setCreateDisabled(false); // Enable create button
    }
  };

  const createReservation = async () => {
    const reservationData = {
      unitType: selectedUnitType,
      tenant: selectedTenant,
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
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <select
            value={selectedUnitType}
            onChange={(e) => setSelectedUnitType(e.target.value)}
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          >
            <option value="">Select Unit Type</option>
            {unitTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name} - {type.numAvailable} available
              </option>
            ))}
          </select>
          <select
            value={selectedTenant}
            onChange={(e) => setSelectedTenant(e.target.value)}
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          >
            <option value="">Select Tenant</option>
            {tenants.map((tenant) => (
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
