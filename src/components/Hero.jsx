import React, { useState, useEffect } from "react";
import Home from "../assets/Homepage.png";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [selectedSubMarket, setSelectedSubMarket] = useState([]);
  const [subMarket, setSubMarket] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (event) => {
    setSelectedSubMarket(event.target.value);
  };

  //getting user details
  const fetchSubMarket = async () => {
    try {
      //  const res=await axios.get(URL+"/api/users/"+user._id)
      const res = await axios.get(URL + "/api/submarkets/" + search);
      setSubMarket(res.data);

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubMarket();
  }, [search]);

  const handleItemSearch = (item) => {
    navigate(`/findcommunity/${item}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Home})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "500px",
      }}
    >
      <div className="justify-center items-center flex flex-col">
        <p className="text-white font-bold text-2xl md:text-4xl text-center justify-center mt-16">
          Find Your New Home
        </p>

        <div className="flex gap-x-2 items-center">
          <select
            value={selectedSubMarket}
            onChange={(e) => handleItemSearch(e.target.value)}
            className="sm:w-[500px] md:w-[530px] h-9 rounded-lg mt-3 text-green-600"
          >
            <option value="">Select SubMarket:</option>
            {subMarket.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          {/* <button onClick={handleSearch} className='text-white border-2 py-1 px-2 rounded-full mt-3'>Search</button> */}
        </div>
        <p className="text-white text-md md:text-lg text-center justify-center mt-2">
          FIND RENTAL APARTMENT HOMES IN THE BUSINESS DISTRICTS OF LAGOS
        </p>
      </div>
    </div>
  );
};

export default Hero;
