import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { SlArrowLeft } from "react-icons/sl";

const EditCommunity = () => {
  const CommunityId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // State to hold the image URL

  const fetchCommunity = async () => {
    try {
      console.log("thisis it", CommunityId);
      const res = await axios.get(URL + "/api/communities/" + CommunityId);
      console.log(res);
      setName(res.data.name);
      setDescription(res.data.desc);
      setFile(res.data.photo);
      setStatus(res.data.status);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
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
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("img", filename);
    data.append("file", file);

    try {
      const url = await axios.post(URL + "/api/upload", data);
      setImageUrl(url.data[0]); // Set the image URL in the state
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, []); // Empty dependency array to execute only once when component mounts

  return (
    <div>
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
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Community Name"
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
            onChange={handleFileUpload} // Handle file upload when file input changes
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
            Update Community
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCommunity;
