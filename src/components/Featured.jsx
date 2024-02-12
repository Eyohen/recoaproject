import { useEffect, useState } from "react";
import Featuredcard from "./Featuredcard";
import { URL } from "../url";
import axios from "axios";
import { Link } from "react-router-dom";
// import { UserContext } from "../context/UserContext"

const Featured = () => {
  const [subMarkets, setSubMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchSubMarkets = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(URL + "/api/communities/");
      console.log("mt submarkt", res.data);
      setSubMarkets(res.data);
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
    fetchSubMarkets();
  }, []);

  return (
    <div className="bg-green-800 p-6 rounded-3xl max-w-6xl mx-auto mt-10">
      <p className="text-white text-3xl text-center mt-3 font-medium ">
        Featured Properties
      </p>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex space-x-3 md:flex-row flex-col justify-center items-center overflow-x-scroll">
          {noResults ? (
            <p className="text-center">No results found.</p>
          ) : (
            subMarkets.map((submarket) => (
              <>
                <Link to={`/recoa/${submarket._id}`}>
                  <Featuredcard submarket={submarket} key={submarket._id} />
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
