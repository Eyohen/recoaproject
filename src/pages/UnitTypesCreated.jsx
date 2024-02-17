import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { SlPencil } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { SlTrash, SlEye } from "react-icons/sl";

const UnitTypesCreated = () => {
  const navigate = useNavigate();
  const [unittypes, setUnittypes] = useState([]);
    const [selectedUnittype, setSelectedUnittype] = useState(null);
    const [showModal, setShowModal] = useState(false);

  const fetchUnittypes = async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      // Handle the case where the access token is not available
      console.error("Access token not found");
    }

    const res = await axios.get(URL + "/api/unittypes", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setUnittypes(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchUnittypes();
  }, []);


  const handleDelete = async (itemId) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        // Handle the case where the access token is not available
        console.error("Access token not found");
      }

      const res = await axios.delete(URL + "/api/unittypes/" + itemId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUnittypes((prevData) => prevData.filter((item) => item._id !== itemId));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

    const openModal = (unittype) => {
        console.log('this is selected',unittype);
      setSelectedUnittype(unittype);
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
    };

  return (
    <div className="w-full">
      <div className="flex justify-evenly border h-12 bg-white">
        <p>AdminNav</p>
        <p>AdminNav</p>
      </div>

      <div
        onClick={() => navigate(-1)}
        className="flex items-center space-x-3 pt-6 px-12"
      >
        <SlArrowLeft />
        <h1 className="font-bold md:text-2xl text-xl ">Back</h1>
      </div>

      <div className="max-w-[1100px] bg-white mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
          <h1 className="font-bold text-xl mt-10 text-center">
            Unit Types Created
          </h1>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 font-light ">
                  id
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  name
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  community
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  total
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  available
                </th>

                <th scope="col" className="px-6 py-3 font-light">
                  date
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  edit
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  delete
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  view details
                </th>
              </tr>
            </thead>
            <tbody>
              {unittypes.map((item) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                  key={item._id}
                >
                  <td className="px-6 py-2">{item._id.slice(0, 6)}</td>
                  <td className="px-6 py-2">{item.name}</td>
                  <td className="px-6 py-2">{item.community.name}</td>
                  <td className="px-6 py-2">{item.total}</td>
                  <td className="px-6 py-2">{item.numAvailable}</td>
                  {/* <td className="px-6 py-4">
                    {item.status == "New pre-leasing" ? (
                      <p className="bg-green-400 text-center rounded-3xl text-white">
                        {item.status}
                      </p>
                    ) : (
                      <p className="bg-red-400  rounded-full text-center text-white">
                        {item.status}
                      </p>
                    )}
                  </td> */}
                  <td className="px-6 py-2">
                    {new Date(item.createdAt).toDateString()}
                  </td>
                  <Link to={`/admin/unittype/edit/${item._id}`}>
                    <td className="px-6 py-2">
                      <SlPencil className="mt-3" />
                    </td>
                  </Link>
                  <td
                    className="px-6 py-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    <SlTrash className="text-red-800" />
                  </td>
                  <td
                    className="px-6 py-2"
                    key={unittypes._id}
                    onClick={() => openModal(item)} // Add onClick handler
                  >
                    <SlEye className="ml-2 text-green-800 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-md overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Unit Details</h2>
            <div
              key={selectedUnittype._id}
              className="border-b border-gray-300 mb-4 pb-4"
            >
              <p className="font-bold text-lg">{selectedUnittype.name}</p>
              <p className="flex justify-between mb-2">Price: ${selectedUnittype.price}</p>
              <p className="flex justify-between mb-2">Bedrooms: {selectedUnittype.bedroom}</p>
              <p className="flex justify-between mb-2">Bathrooms: {selectedUnittype.bathroom}</p>
              <p className="flex justify-between mb-2">Size: {selectedUnittype.size} sqft</p>
              <p className="flex justify-between mb-2">
                Available Units: {selectedUnittype.numAvailable} /{" "}
                {selectedUnittype.total}
              </p>
              <p className="flex justify-between mb-2">Description: {selectedUnittype.desc}</p>
              <p className="flex justify-between mb-2">Community: {selectedUnittype.community.name}</p>
              <p className="flex justify-between mb-2">Community Status: {selectedUnittype.community.status}</p>
              <img
                src={selectedUnittype.community.photo}
                alt="Community"
                className="mt-4 max-h-40 w-full object-cover"
              />
            </div>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitTypesCreated;

