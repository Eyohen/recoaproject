import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBox from "./SideBox";
import axios from "axios";
import { URL } from "../url";

const FindSide = () => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      // const res = await axios.get(URL+"/api/communities/")
      const res = await axios.get(URL + "/api/submarkets/");
      setItems(res.data);
      console.log(res.data);
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
                <Link to={`/recoa/${item._id}`} key={item._id}>
                    <SideBox item={item} key={item._id} />
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
