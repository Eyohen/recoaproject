import { useEffect, useState } from "react";
import Featuredcard from "./Featuredcard";
import { URL } from "../url";
import axios from "axios";
import { Link } from "react-router-dom";
// import { UserContext } from "../context/UserContext"

const Featured = () => {
  const [community, setCommunity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchSubCommunity = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(URL + "/api/communities/");
      console.log(res.data);
      setCommunity(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCommunity();
  }, []);

  return (
    <div className="bg-green-800 p-6 rounded-3xl max-w-6xl mx-auto mt-10">
      <p className="text-white text-3xl text-center mt-3 font-medium ">
        Featured Properties
      </p>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex space-x-3 md:flex-row flex-col justify-center items-center overflow-x-auto">
          {noResults ? (
            <p className="text-center">No results found.</p>
          ) : (
            community.map((community) => (
              <>
                <Link to={`/community/${community._id}`}>
                  <Featuredcard community={community} key={community._id} />
                </Link>
              </>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Featured;
