import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { toast } from "react-toastify";

const EditCommunity = () => {
  const CommunityId = useParams().id;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // State to hold the image URL
  const [loading, setLoading] = useState(true); // State for loading screen
  const [updateDisabled, setUpdateDisabled] = useState(false); // State to disable update button

    const statuses = [
      {
        _id: 12,
        status: "Now pre-leasing",
      },
      {
        _id: 13,
        status: "Join waitlisting",
      },
      {
        _id: 14,
        status: "Coming Soon",
      },
      {
        _id: 15,
        status: "Opening in",
      },
    ];

  const fetchCommunity = async () => {
    try {
      console.log("thisis it", CommunityId);
      const res = await axios.get(URL + "/api/communities/" + CommunityId);
      console.log(res);
      setName(res.data.name);
      setDescription(res.data.desc);
      setImageUrl(res.data.photo);
      setStatus(res.data.status);
      setLoading(false); // Hide loading screen after data is fetched
    } catch (err) {
      console.log(err);
      toast.error('failed to fetch community');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateDisabled(true); // Disable update button
    try {
      if (file) {
        // If there is a file, upload it first
        const uploadedImageUrl = await handleFileUpload();
        // Then update the submarket with the uploaded image URL
        await updateSubmarket(uploadedImageUrl);
      } else {
        // If no file, update the submarket directly
        await updateSubmarket(imageUrl);
      }
        toast.success("Community updated successfully");
      navigate(-1);
    } catch (err) {
      console.log(err);
        toast.error('failed to update community');
    } finally {
      setUpdateDisabled(false); // Enable update button
    }
  };

    const handleStatus = (e) => {
      setStatus(e.target.value);
    };

  const updateSubmarket = async (imageUrl) => {
    const Community = {
      name,
      description,
      location,
      status,
      photo: imageUrl, // Append the image URL to the community payload
    };

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
        return; // Stop execution if access token is not found
      }
      await axios.put(URL + "/api/communities/" + CommunityId, Community, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Community updated successfully");
      //   navigate(-1);
    } catch (err) {
      console.log(err);
      toast.error('failed to update community');
    }
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("img", filename);
    data.append("file", file);

    try {
      const url = await axios.post(URL + "/api/upload", data);
      return url.data[0]; // Return the uploaded image URL
    } catch (err) {
      console.log(err);
      toast.error('failed to upload image');    
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, []); // Empty dependency array to execute only once when component mounts

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
            Update a Community
          </h1>
          <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Community Photo"
                className="mx-auto mb-4"
                style={{ maxHeight: "200px" }}
              />
            )}
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter Community Name"
              className="px-4 py-2 border outline-none text-gray-400"
            />

            <select value={status} onChange={handleStatus} className="">
              <option value="">Select Status:</option>
              {statuses.map((item) => (
                <option key={item._id} value={item.status}>
                  {item.status}
                </option>
              ))}
            </select>

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
              className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
            >
              {updateDisabled ? "Updating..." : "Update Community"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCommunity;
