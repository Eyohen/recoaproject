import React, { useContext, useEffect, useState } from "react";
import VI from "../assets/VictoriaIsland.png";
import FloorPlans from "../components/FloorPlans";
import axios from "axios";
import { URL, IF } from "../url";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";

const RecoaSquare = () => {
  const submarketId = useParams().id;
  const [subMarket, setSubMarket] = useState({});

  const fetchSubMarket = async () => {
    try {
      const res = await axios.get(URL + "/api/submarkets/" + submarketId);
      console.log(res.data);
      setSubMarket(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubMarket();
  }, [submarketId]);

  return (
    <div>
      <p className="text-4xl font-medium mt-8 text-center text-green-700">
        Welcome to {subMarket.name}
      </p>
      <img
        src={subMarket.photo}
        alt=""
        className="rounded-xl w-[600px] h-[400px] mx-auto mt-16"
      />
      <p className="text-3xl text-green-800 mt-8 text-center">
        Select Your FLoor Plans Below{" "}
      </p>
      {/* <div className='flex justify-evenly max-w-6xl mx-auto mt-9 items-center'>
            <p>Loreem Ipsum has been the industry's standard <br/> dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen <br /> book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <img src={VI} alt='' className='rounded-xl w-[600px] h-[300px] '/>
        </div> */}

      <div className=" justify-evenly max-w-6xl mx-auto mt-9 items-center mb-12">
        <p className="text-center">{subMarket.description}</p>
      </div>
      <FloorPlans />
    </div>
  );
};

export default RecoaSquare;
