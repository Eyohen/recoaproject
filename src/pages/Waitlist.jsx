import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Waitlist = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailReadOnly, setEmailReadOnly] = useState(false);
  const [tenants, setTenants] = useState([]); 
  const [tenantId, setTenantId] = useState(""); 
  const [isCustomTenant, setIsCustomTenant] = useState(false); 
  const [customTenantName, setCustomTenantName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id: communityId } = useParams(); // Moved from handleWaitlist for scope access

  useEffect(() => {
    // Retrieve currentUser from local storage
    const currentUserStr = localStorage.getItem("currentUser");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    // Check if currentUser exists and has a role of "tenant"
    if (currentUser && currentUser.role === "tenant") {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setEmail(currentUser.email);
      setEmailReadOnly(true); // Make email field read-only
    }
    const fetchTenants = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      try {
        const response = await axios.get(URL + "/api/tenants", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTenants(response.data);
      } catch (error) {
        console.error("Failed to fetch tenants:", error);
      }
    };

    fetchTenants();
  }, []);

  const handleWaitlist = async () => {
    try {
      const payload = {
        firstName,
        lastName,
        email,
        communityId,
        ...(isCustomTenant ? { newtenant: customTenantName } : { tenantId }),
      };

      await axios.post(URL + "/api/waitlists/new", payload);

      toast.success("Added to waitlist successfully");
      navigate("/findcommunity");
    } catch (err) {
      const message =
        err.response?.data.message ||
        "An error occurred. Please try again later.";
      setErrorMessage(message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left font-Comfortaa text-green-800">
            Join the Waitlist
          </h1>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-green-800 outline-0 rounded-lg"
            type="text"
            placeholder="Enter your first name"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-green-800 outline-0 rounded-lg"
            type="text"
            placeholder="Enter your last name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={emailReadOnly} // Control editability based on role
            className={`w-full px-4 py-2 outline-0 rounded-lg ${
              emailReadOnly
                ? "bg-gray-200 text-gray-700 border-gray-500 cursor-not-allowed"
                : "border border-green-800"
            }`} // Style changes for read-only state
            type="email"
            placeholder="Enter your email"
          />

          <select
            value={tenantId}
            onChange={(e) => {
              const value = e.target.value;
              setIsCustomTenant(value === "custom");
              if (!isCustomTenant) {
                setTenantId(value);
              }
            }}
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          >
            <option value="">Select Tenant:</option>
            {tenants.map((item) => (
              <option key={item._id} value={item._id}>
                {item.tenant}
              </option>
            ))}
            <option value="custom">Add New Organisation</option>
          </select>
          {isCustomTenant && (
            <input
              type="text"
              value={customTenantName}
              onChange={(e) => setCustomTenantName(e.target.value)}
              className="w-full px-4 py-2 border border-green-800 outline-0 rounded-lg"
              placeholder="Enter new tenant name"
            />
          )}
          {/* Button and error message */}
          <button
            onClick={handleWaitlist}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-green-800 rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Join Waitlist
          </button>
          {errorMessage && (
            <h3 className="text-red-500 text-sm">{errorMessage}</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Waitlist;
