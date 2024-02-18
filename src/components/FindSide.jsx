/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBox from "./SideBox";
import axios from "axios";
import { URL } from "../url";

const FindSide = ({ location, name }) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      // const res = await axios.get(URL+"/api/communities/")
      const res = await axios.get(URL + "/api/submarkets/");
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

  return (
    <div className="border h-screen w-[26%] p-3">
      <div className="text-center mt-6 space-y-3">
        {items.map((item) => (
          <Link to={`/community/${item._id}`} key={item._id}>
            <SideBox
              item={item}
              // Determine if this item is the current one
              isCurrent={item.location === location && item.name === name}
            />{" "}
          </Link>
        ))}

        {/* <SideBox/>
         <SideBox/>
         <SideBox/> */}
      </div>
    </div>
  );
};

export default FindSide;
