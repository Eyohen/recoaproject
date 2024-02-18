/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Floorcard from "./Floorcard";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader"; // Make sure to uncomment this

const FloorPlans = ({ community }) => {
  const { search } = useLocation();
  const [unittype, setUnittype] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const filteredUnittype = community.unitTypes;
      console.log("filteredUnittype", filteredUnittype);
      setUnittype(filteredUnittype);

      setNoResults(filteredUnittype.length === 0);
    } catch (err) {
      console.log(err);
      setNoResults(true); // Consider setting noResults to true in case of error
    } finally {
      setLoader(false); // Ensure loader is turned off both on success and failure
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    // FloorPlans component
    <div className="bg-green-800 p-6 rounded-3xl max-w-6xl mx-auto mt-10 overflow-hidden">
      <p className="text-white text-3xl text-center mt-3 font-medium">
        Floor Plans
      </p>

      {loader ? (
        <Loader />
      ) : noResults ? (
        <p className="text-white text-center">No floor plans found.</p>
      ) : (
        <div className="flex overflow-x-auto space-x-4 py-4">
          {unittype.map((unittype) => (
            <Floorcard key={unittype._id} unittype={unittype} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FloorPlans;
