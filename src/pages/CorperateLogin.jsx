import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import HomeBackground from "../assets/Homepage.png";
import { URL } from "../url"; // Assume config.js stores all your constants

const CorporateLogin = () => {
  const { id: tenantId } = useParams();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // For registration
  const [lastName, setLastName] = useState(""); // For registration
  const [phone, setPhone] = useState(""); // For registration
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
      const { data, status } = await axios.post(`${URL}/api/tenants/login`, {
        email,
        password,
      });
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

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${URL}/api/users/new`, {
        email,
        password,
        firstName,
        lastName,
        phone,
        tenantId,
      });
      if (res.status === 200) {
        // Similar to handleLogin but with registration logic
        toast.success("Registration successful. Please login.");
        setIsRegistering(false);
      }

    } catch (err) {
      setError(err.response.data);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div
    //   className="min-h-screen bg-no-repeat bg-cover bg-center"
    //   style={{ backgroundImage: `url(${HomeBackground})` }}
    // >
    <div>
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
          className="text-green-500 px-2 md:w-[400px] w-full py-2 mt-3 rounded border border-green-300"
          placeholder="Enter Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="text-green-500 px-2 md:w-[400px] w-full  py-2 mt-3 rounded border border-green-300"
          placeholder="Enter Company Password"
        />
        {isRegistering && (
          <>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="text-green-500 px-2 md:w-[400px] w-full  py-2 mt-3 rounded border border-green-300"
              placeholder="First Name"
            />
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="text-green-500 px-2 md:w-[400px] w-full  py-2 mt-3 rounded border border-green-300"
              placeholder="Last Name"
            />
            <input
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="text-green-500 px-2 md:w-[400px] w-full  py-2 mt-3 rounded border border-green-300"
              placeholder="Phone Number"
            />
          </>
        )}
        <button
          onClick={isRegistering ? handleRegister : handleLogin}
          disabled={isLoading}
          className="bg-green-500 text-white text-lg px-40 py-2 mt-6 rounded disabled:bg-green-300"
        >
          {isLoading ? "Processing..." : isRegistering ? "Register" : "Login"}
        </button>
        {isRegistering ? (
          <div
            onClick={() => setIsRegistering(false)}
            className="cursor-pointer text-black-500 hover:text-black mt-3 p-1"
          >
            Already have an account ? <span className="text-green-400 font-semibold">Login</span>
          </div>
        ) : (
          <div
            onClick={() => setIsRegistering(true)}
            className="cursor-pointer text-black-500 hover:text-black mt-3  p-1"
          >
            Don't have an Account ? <span className="text-green-400 font-semibold">Sign Up</span>
          </div>
        )}
        {error && (
          <p className="text-red-500 px-2 py-2 rounded text-xl mt-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default CorporateLogin;
