import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL, IF } from "../url";
import { SlPencil } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";
import { UserContext } from "../context/UserContext";

const CommunitiesCreated = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState("");
  const [items, setItems] = useState([]);
  const communityId = useParams().id;
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedSubmarket, setSelectedSubmarket] = useState(null);

  const fetchCommunities = async () => {
    const res = await axios.get(URL + "/api/communities");
    setItems(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleSubmarketClick = (submarket) => {
    setSelectedSubmarket(submarket);
    setIsModalOpen(true);
  };


  const handleSearch = () => {};

  const handleDelete = async (itemId) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        // Handle the case where the access token is not available
        console.error("Access token not found");
      }

      const res = await axios.delete(URL + "/api/communities/" + itemId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setItems((prevData) => prevData.filter((item) => item._id !== itemId));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  function SubmarketModal({ isOpen, onClose, submarket }) {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        onClick={onClose}
      >
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <h2 className="text-xl font-bold mb-4">Submarket Information</h2>
          {submarket ? (
            <div>
              <p>
                <strong>Name:</strong> {submarket.name}
              </p>
              <p>
                <strong>Description:</strong> {submarket.description}
              </p>
              <p>
                <strong>Location:</strong> {submarket.location}
              </p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>No submarket information available.</p>
          )}
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white p-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }


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
            Communities Created
          </h1>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 font-light ">
                  id
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  description
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  submarket
                </th>

                <th scope="col" className="px-6 py-3 font-light">
                  date
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  delete
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                  key={item._id}
                >
                  <td className="px-6 py-2">{item._id.slice(0, 3)}</td>

                  <td className="px-6 py-2">{item.name}</td>
                  <td className="px-6 py-2">{item.status}</td>
                  <td className="px-6 py-2">{item.desc}</td>
                  <td
                    className="px-6 py-2 cursor-pointer"
                    onClick={() => handleSubmarketClick(item.submarket)}
                  >
                    {item.submarket?.name ?? "null"}
                  </td>

                  <td className="px-6 py-2">{item.createdAt}</td>
                  <Link to={`/admin/community/edit/${item._id}`}>
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
                </tr>
              ))}
            </tbody>
          </table>
          <SubmarketModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            submarket={selectedSubmarket}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunitiesCreated;
