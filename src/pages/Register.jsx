import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { toast } from "react-toastify";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Use a state to store the error message
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
        iam: "admin",
      });
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      setPassword(res.data.password);
        toast.success("Admin registered successfully");
      navigate("/admin/login");
    } catch (err) {
      if (err.response && err.response.status === 500) {
        // Check if the error is a 500 error
        setErrorMessage("Something went wrong");
      } else if (err.response && err.response.data) {
        // If there's a specific error message from the API
        setErrorMessage(err.response.data.message);
      } else {
        // For any other type of error
        setErrorMessage("An error occurred. Please try again later.");
      }
      console.log(err);
    } finally {
      setIsLoading(false); // Set loading back to false
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-3xl md:text-3xl font-bold">
          <Link to="/home" className="text-green-800 font-Comfortaa">
            Recoa
          </Link>
        </h1>
        <h3>
          <Link to="/admin/login">Login</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left font-Comfortaa text-green-800">
            Admin Register
          </h1>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2  border border-green-800 outline-0 rounded-lg"
            type="text"
            placeholder="Enter your first name"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2  border border-green-800 outline-0 rounded-lg"
            type="text"
            placeholder="Enter your last name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2  border border-green-800 outline-0 rounded-lg"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2  border border-green-800 outline-0 rounded-lg"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-green-800 rounded-lg hover:bg-gray-500 hover:text-black "
          >
            Register
          </button>
          {errorMessage && (
            <h3 className="text-red-500 text-sm ">{errorMessage}</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p className="text-green-800">Already have an Account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/admin/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Register;
