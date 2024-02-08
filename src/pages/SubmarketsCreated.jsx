import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { SlPencil } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";

const SubmarketsCreated = () => {
  const navigate = useNavigate();
  // const [showConfirmation, setShowConfirmation] = useState("")
  const [items, setItems] = useState([]);

  const fetchSubmarkets = async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("Access token not found");
    }

    const res = await axios.get(URL + "/api/submarkets", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setItems(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchSubmarkets();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        console.error("Access token not found");
      }

      const res = await axios.delete(URL + "/api/submarkets/" + itemId, {
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
            Submarkets Created
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
                  location
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  status
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
              </tr>
            </thead>
            <tbody>
              {/* {data?.data?.participants
            .filter((user) => user.BetTribeLog !== null)
            .map((user, index) => ( */}
              {items.map((item) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                  key={item._id}
                >
                  <td className="px-6 py-2">{item._id.slice(0, 6)}</td>
                  {/* <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  
                  <img
                    className="w-11 h-11"
                    src={user?.BetTribeLog?.profileImage}
                    alt=""
                  />
                </th> */}
                  <td className="px-6 py-2">{item.name}</td>
                  <td className="px-6 py-2">{item.location}</td>

                  {/* <td class="px-6 py-2">{user.date}</td>
                <td class="px-6 py-2">{user.time}</td>
                <td class="px-6 py-2">
                   {user.type}
                    </td> */}
                  <td className="px-6 py-4">
                    {item.status == "New pre-leasing" ? (
                      <p className="bg-green-400 text-center rounded-3xl text-white">
                        {item.status}
                      </p>
                    ) : (
                      <p className="bg-red-400  rounded-full text-center text-white">
                        {item.status}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-2">
                    {new Date(item.createdAt).toDateString()}
                  </td>
                  <Link to={`/admin/submarket/edit/${item._id}`}>
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
          {/* {showConfirmation && (
        <ConfirmationPopup
          email={selectedParticipantEmail}
          onCancel={() => setShowConfirmation(false)}
          onConfirm={confirmParticipant}
        />
      )} */}
        </div>
      </div>
    </div>
  );
};

export default SubmarketsCreated;
