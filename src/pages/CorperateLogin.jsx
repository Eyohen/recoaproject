import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import HomeBackground from "../assets/Homepage.png";
import { URL } from "../url"; // Assume config.js stores all your constants

const CorporateLogin = () => {
  const { id: tenantId } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tenant, setTenant] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/tenants/${tenantId}`);
        setTenant(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tenant information.");
      }
    };

    fetchTenant();
  }, [tenantId]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.post(
        `${URL}/api/tenants/login`,
        { email, password }
      );
      if (status === 200) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("currentUser", JSON.stringify(data));
        navigate("/communities");
      }
    } catch (err) {
      setError("Email or password is incorrect. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${HomeBackground})` }}
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        {tenant.photo && (
          <img
            src={tenant.photo}
            alt={`${tenant.tenant} logo`}
            className="w-40 h-40 object-cover rounded-full mb-4"
          />
        )}
        <h1 className="text-5xl font-bold">{tenant.tenant}</h1>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="text-green-500 px-12 py-2 mt-3 rounded"
          placeholder="Enter Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="text-green-500 px-12 py-2 mt-6 rounded"
          placeholder="Enter Password"
        />
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="bg-green-500 text-white text-lg px-12 py-2 mt-6 rounded disabled:bg-green-300"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && (
          <p className="bg-red-500 text-white-500 px-2 py-2 rounded text-xl mt-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default CorporateLogin;
