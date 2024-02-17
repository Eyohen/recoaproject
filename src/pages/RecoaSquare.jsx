import { useEffect, useState } from "react";
import FloorPlans from "../components/FloorPlans";
import axios from "axios";
import { URL } from "../url";
import { useParams } from "react-router-dom";

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

      <div className=" justify-evenly max-w-6xl mx-auto mt-9 items-center mb-12">
        <p className="text-center">{subMarket.description}</p>
      </div>
      <FloorPlans />
    </div>
  );
};

export default RecoaSquare;
