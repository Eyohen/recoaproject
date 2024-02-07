import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { SlArrowLeft } from "react-icons/sl";
import { toast } from "react-toastify";


const EditUnitType = () => {
  const unittypeId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unitNo, setUnitNo] = useState("");
  const [numAvailable, setNumAvailable] = useState("");
  const [size, setSize] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");

  const fetchunittypes = async () => {
    try {
        console.log('thisis it',unittypeId);
      const res = await axios.get(URL + "/api/unittypes/" + unittypeId);
      setName(res.data.name);
      setDescription(res.data.desc);
        setPrice(res.data.price);
      setSize(res.data.size);
      setBedroom(res.data.bedroom);
        setBathroom(res.data.bathroom);
        setUnitNo(res.data.unitNo);
        setNumAvailable(res.data.numAvailable);

        toast.success("Unittype fetched successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.data );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const unittype = {
      name,
      desc: description,
      bedroom,
        price,
      size,
        bathroom,
        numAvailable,
        unitNo

    };

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found");
      }
      await axios.put(URL + "/api/unittypes/" + unittypeId, unittype, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate(-1);
      toast.success("Unittype updated successfully");
    } catch (err) {
      console.log(err);
        toast.error(err.data);
    }
  };

  useEffect(() => {
    fetchunittypes();
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
          Update a unittype
        </h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter unittype Name"
            className="px-4 py-2 border outline-none text-gray-400"
          />
          <input
            onChange={(e) => setSize(e.target.value)}
            value={size}
            type="text"
            placeholder="Enter size"
            className="px-4 py-2 border outline-none text-gray-400"
          />

            <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                // set type to float or number
                type="text"
                placeholder="Enter price"
                className="px-4 py-2 border outline-none text-gray-400"
            />
            <input
                onChange={(e) => setUnitNo(e.target.value)}
                value={unitNo}
                // set type to float or number
                type="text"
                placeholder="Enter unitNo"
                className="px-4 py-2 border outline-none text-gray-400"
            />
            <input
                onChange={(e) => setNumAvailable(e.target.value)}
                value={numAvailable}
                // set type to float or number
                type="text"
                placeholder="Enter numAvailable"
                className="px-4 py-2 border outline-none text-gray-400"
            />
          <input
            onChange={(e) => setBedroom(e.target.value)}
            value={bedroom}
            type="text"
            placeholder="Enter bedroom"
            className="px-4 py-2 border outline-none text-gray-400"
          />
          <input
            onChange={(e) => setBathroom(e.target.value)}
            value={bathroom}
            type="text"
            placeholder="Enter bathroom"
            className="px-4 py-2 border outline-none text-gray-400"
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
            Update unittype
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUnitType;
