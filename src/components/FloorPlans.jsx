import { useEffect, useState } from "react";
import axios from "axios";
import Floorcard from "./Floorcard";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader"; // Make sure to uncomment this
import { URL } from "../url";

const FloorPlans = () => {
  const { search } = useLocation();
  const submarketId = useParams().id;
  const [communities, setCommunities] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/communities${search}`);
      console.log("floorplandata", res.data);
      const filteredCommunities = res.data.filter(
        (community) => community.submarket._id === submarketId
      );
      setCommunities(filteredCommunities);

      setNoResults(filteredCommunities.length === 0);
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
    <div className="bg-green-800 p-6 rounded-3xl max-w-6xl mx-auto mt-10">
      <p className="text-white text-3xl text-center mt-3 font-medium">
        Floor Plans
      </p>

      {loader ? (
        <Loader /> // Display Loader component when data is being fetched
      ) : noResults ? (
        <p className="text-white text-center">No floor plans found.</p> // Display message when no results are found
      ) : (
        <div className="flex space-x-3 md:flex-row flex-col justify-center items-center overflow-x-scroll">
          {communities.map((community) => (
            <Floorcard key={community._id} community={community} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FloorPlans;
