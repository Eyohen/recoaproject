import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { toast } from "react-toastify";

const EditSubmarket = () => {
  const submarketId = useParams().id;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true); // State for loading screen
  const [updateDisabled, setUpdateDisabled] = useState(false); // State to disable update button

  const fetchSubmarkets = async () => {
    try {
      const res = await axios.get(URL + "/api/submarkets/" + submarketId);
      setName(res.data.name);
      setDescription(res.data.desc);
      setStatus(res.data.status);
      setLocation(res.data.location);
      setImageUrl(res.data.photo);
      setLoading(false); // Hide loading screen after data is fetched
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch submarket");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateDisabled(true); // Disable update button
    try {
      let uploadedImageUrl = imageUrl;
      if (file) {
        uploadedImageUrl = await handleFileUpload();
      }
      await updateSubmarket(uploadedImageUrl);
      navigate(-1);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update submarket");
    } finally {
      setUpdateDisabled(false); // Enable update button
    }
  };

  const updateSubmarket = async (imageUrl) => {
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
      await axios.put(URL + "/api/submarkets/" + submarketId, submarket, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Submarket updated successfully");
    } catch (error) {
        console.error(error);
       return error;
    }
  };

  const handleFileUpload = async () => {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("img", filename);
    data.append("file", file);

    try {
      const url = await axios.post(URL + "/api/upload", data);
      return url.data[0];
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload image");
    }
  };

  useEffect(() => {
    fetchSubmarkets();
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
            Update a Submarket
          </h1>
          <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Submarket Photo"
                className="mx-auto mb-4"
                style={{ maxHeight: "200px" }}
              />
            )}
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter Submarket Name"
              className="px-4 py-2 border outline-none text-gray-400"
            />
            <input
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              type="text"
              placeholder="Enter status"
              className="px-4 py-2 border outline-none text-gray-400"
            />
            <input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              type="text"
              placeholder="Enter location"
              className="px-4 py-2 border outline-none text-gray-400"
            />
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="px-4"
            />
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={15}
              cols={30}
              className="px-4 py-2 border outline-none"
              placeholder="Enter post description"
            />
            <button
              onClick={handleUpdate}
              disabled={updateDisabled} // Disable button when clicked
              className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
            >
              {updateDisabled ? "Updating..." : "Update Submarket"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditSubmarket;
