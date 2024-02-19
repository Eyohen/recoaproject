/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBox from "./SideBox";
import axios from "axios";
import { URL } from "../url";
import { toast } from "react-toastify";

const FindSide = ({ location, name }) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      // const res = await axios.get(URL+"/api/communities/")
      const res = await axios.get(URL + "/api/submarkets/");
      console.log(res.data);
      const sortedItems = res.data.sort((a, b) => {
        // Check if each item matches the location and name props
        const matchA = a.location === location && a.name === name ? 1 : 0;
        const matchB = b.location === location && b.name === name ? 1 : 0;

        // Items that match the location and name props should come first
        return matchB - matchA;
      });
      setItems(sortedItems);
    } catch (err) {
      console.log(err);
      // setLoader(true)
    }
  };

  useEffect(() => {
    getItems();
  }, []);

   const showToast = () => {
     toast.info("This submarket has no active community", {
       position: "top-right",
       autoClose: 1500,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
     });
   };

  return (
    <div className="border h-screen w-[26%] p-3">
      <div className="text-center mt-6 space-y-3">
        {items.map((item) =>
          item.communities.length > 0 ? (
            <Link
              to={`/communities?header=${item.name} submarket&subId=${item._id}`}
              key={item._id}
            >
              <SideBox
                item={item}
                isCurrent={item.location === location && item.name === name}
              />
            </Link>
          ) : (
            <div
              onClick={showToast}
              key={item._id}
              style={{ cursor: "pointer" }}
            >
              <SideBox
                item={item}
                isCurrent={item.location === location && item.name === name}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FindSide;
