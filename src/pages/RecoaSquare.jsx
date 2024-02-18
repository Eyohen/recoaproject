import { useEffect, useState } from "react";
import FloorPlans from "../components/FloorPlans";
import axios from "axios";
import { URL } from "../url";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";

const RecoaSquare = () => {
  const communityId = useParams().id;
  const [community, setCommunity] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCommunity = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${URL}/api/communities/${communityId}`);
      console.log("data", res.data);
      setCommunity(res.data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, [communityId]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  // Check if the community is now pre-leasing
  const isNowPreleasing = community.status === "Now pre-leasing";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold mt-8 text-center text-green-700">
        Welcome to {community.name}
      </h1>
      <img
        src={community.photo}
        alt={community.name}
        className="rounded-xl w-full max-w-4xl h-auto mx-auto mt-8"
      />
      <div className="mt-8 px-4 py-6 max-w-4xl mx-auto bg-green-50 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-green-800">
              Community Details
            </h2>
            <p className="mt-2 text-lg text-green-700">
              Status: {community.status} {community.openingDate}
            </p>
          </div>
          <div className="text-right">
            <p className="text-md text-gray-600">
              Location: {community.submarket.location}
            </p>
          </div>
        </div>
        <p className="mt-4 text-gray-600">{community.desc}</p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-green-700">
            Submarket Information
          </h3>
          <p className="text-md text-gray-600">
            Name: {community.submarket.name}
          </p>
          <p className="mt-2 text-gray-600">
            {community.submarket.description}
          </p>
        </div>
        {!isNowPreleasing && (
          <Link to={`/waitlist/${community._id}`}>
            <button className="mt-6 bg-green-800 text-white px-4 py-2 rounded-md">
              Join Waitlist
            </button>
          </Link>
        )}
      </div>

      <div className={`mt-8 ${isNowPreleasing ? "" : "blur-sm"}`}>
        <h2 className="text-3xl text-green-800 text-center">
          {isNowPreleasing
            ? "Select Your Floor Plans Below"
            : "Floor Plans (Coming Soon)"}
        </h2>
        {Object.keys(community).length > 0 && (
          <FloorPlans community={community} />
        )}
      </div>
      {!isNowPreleasing && (
        <p className="text-center mt-4 text-lg">
          Floor plans will be available for selection soon. Join our waitlist to
          be the first to know!
        </p>
      )}
    </div>
  );
};

export default RecoaSquare;
