import { useState } from "react";
import { URL } from "../url";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const InnerSubmarket = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [created, setCreated] = useState(false);
  const [createDisabled, setCreateDisabled] = useState(false); // State to disable create button

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateDisabled(true); // Disable create button
    try {
      let uploadedImageUrl = imageUrl;
      if (file) {
        uploadedImageUrl = await handleFileUpload();
      }
      await createSubmarket(uploadedImageUrl);
      toast.success("Submarket created successfully");

      navigate("/admin/submarket/view");
      setName("");
      setDescription("");
      setStatus("");
      setLocation("");
      setFile(null);
      setCreated(true);
      setStatus("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create submarket");
    } finally {
      setCreateDisabled(false); // Enable create button
    }
  };

  const createSubmarket = async (imageUrl) => {
    const submarket = {
      name,
      description,
      location,
      status,
      photo: imageUrl,
    };

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      await axios.post(URL + "/api/submarkets/create", submarket, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Submarket created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create submarket");
    }
  };

  const handleFileUpload = async () => {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("img", filename);
    data.append("file", file);

    try {
      const url = await axios.post(URL + "/api/upload", data);
      setImageUrl(url.data[0]);
      return url.data[0];
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
          Add a Submarket
        </h1>
        <Link to="/admin/submarket/view">
          <p className="text-green-600">See Submarkets Created</p>
        </Link>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Submarket Name"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />
          <input
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            type="text"
            placeholder="Enter Submarket Status"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />
          <input
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            type="text"
            placeholder="Enter Submarket Location"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />

          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            multiple
            className="px-4"
          />

          <p>Write a description about the submarket</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
            placeholder="Give a description of the submarket"
          />
          {/* <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button> */}
          <button
            onClick={handleCreate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Create Submarket
          </button>
          {created && (
            <h3 className="text-green-500 text-sm text-center mt-4">
              {createDisabled
                ? "Creating..."
                : "Submarket created successfully!"}
            </h3>
          )}
          {/* handleUserCreate */}
        </form>
      </div>
    </div>
  );
};

export default InnerSubmarket;
