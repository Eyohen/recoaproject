import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InnerUnityType = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [unitNo, setUnitNo] = useState("");
  const [size, setSize] = useState("");
  const [numAvailable, setNumAvailable] = useState("");
  const [desc, setDesc] = useState("");
  const [community, setCommunity] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [file, setFile] = useState(null);
  const [created, setCreated] = useState(false);
  const [createDisabled, setCreateDisabled] = useState(false); // State to disable create button

const fetchCommunity = async () => {
  try {
    const res = await axios.get(URL + "/api/communities/");
    console.log("data", res.data);
    // Check if res.data is an array before setting it to state
    if (Array.isArray(res.data)) {
      setCommunity(res.data);
    } else {
      // Handle case where res.data is not an array
      console.error("Expected an array for community, received:", res.data);
      setCommunity([]); // Set to empty array or handle appropriately
    }
  } catch (err) {
    console.log(err);
    setCommunity([]); // Ensure community is reset in case of error
  }
};


  useEffect(() => {
    fetchCommunity();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateDisabled(true); // Disable create button
    try {
      let uploadedImageUrl = "";
      if (file) {
        uploadedImageUrl = await handleFileUpload();
      }
      await createUnitType(uploadedImageUrl);
      toast.success("Unit Type created successfully");

      navigate("/admin/unit/view");
      // Reset form fields
      setName("");
      setPrice("");
      setBedroom("");
      setBathroom("");
      setUnitNo("");
      setSize("");
      setNumAvailable("");
      setCommunity("");
      setFile(null);
      setDesc("");
      setCreated(true);
    } catch (err) {
      console.log(err);
      toast.error("Failed to create Unit Type");
    } finally {
      setCreateDisabled(false); // Enable create button
    }
  };

  const createUnitType = async (imageUrl) => {
    const unitType = {
      name,
      price,
      bedroom,
      bathroom,
      unitNo,
      size,
      numAvailable,
      desc,
      community: selectedCommunity,
      photo: imageUrl,
    };

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      await axios.post(URL + "/api/unittypes/create", unitType, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Unit Type created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Unit Type");
    }
  };

  const handleFileUpload = async () => {
    const data = new FormData();
    data.append("file", file);

    try {
      const uploadRes = await axios.post(URL + "/api/upload", data);
      return uploadRes.data.filePath; // Assuming the API returns the file path of the uploaded image
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="w-full bg-gray-200">
      <div className="flex justify-evenly border h-12 bg-white">
        <p>Administration</p>
        <p>Administration</p>
      </div>

      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl text-green-800 text-center">
          Add a Unit Type
        </h1>
        <Link to="/admin/unit/view">
          <p className="text-green-600">See Unit Types Created</p>
        </Link>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          {/* Name Selection */}
          <select
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 outline-none border border-gray-400 rounded-lg"
          >
            <option value="">Select Name:</option>
            <option value="S-1">S-1</option>
            <option value="A-1">A-1</option>
            <option value="A-2">A-2</option>
            <option value="B-1">B-1</option>
            <option value="B-2">B-2</option>
            <option value="C-1">C-1</option>
          </select>

          {/* Price Input */}
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter Price"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />

          {/* Bedroom Selection */}
          <select
            value={bedroom}
            onChange={(e) => setBedroom(e.target.value)}
            className="px-4 py-2 outline-none border border-gray-400 rounded-lg"
          >
            <option value="">Number of Bedrooms:</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          {/* Bathroom Selection */}
          <select
            value={bathroom}
            onChange={(e) => setBathroom(e.target.value)}
            className="px-4 py-2 outline-none border border-gray-400 rounded-lg"
          >
            <option value="">Number of Bathrooms:</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>          
            </select>

          {/* Unit Number Input */}
          <input
            onChange={(e) => setUnitNo(e.target.value)}
            value={unitNo}
            type="text"
            placeholder="Enter Unit Number"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />

          {/* Size Input */}
          <input
            onChange={(e) => setSize(e.target.value)}
            value={size}
            type="text"
            placeholder="Enter Size"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />

          {/* Community Selection */}
          <select
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="px-4 py-2 outline-none border border-gray-400 rounded-lg"
          >
            <option value="">Select Community:</option>
            {community.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* Number Available Input */}
          <input
            onChange={(e) => setNumAvailable(e.target.value)}
            value={numAvailable}
            type="text"
            placeholder="Enter Number Available"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />

          {/* Description Input */}
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows="4"
            placeholder="Enter Description"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />

          {/* File Upload Input */}
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4 py-2"
          />

          <button
            onClick={handleCreate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Create Unit Type
          </button>
          {created && (
            <h3 className="text-green-500 text-sm text-center mt-4">
              {createDisabled
                ? "Creating..."
                : "Unit Type created successfully!"}
            </h3>
          )}
          {/* handleUserUpdate */}
        </form>
      </div>
    </div>
  );
};

export default InnerUnityType;
