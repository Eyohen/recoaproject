import { useEffect, useState } from "react";
import SubCards from "./SubCards";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";

const BrowseSub = () => {
  const [subMarkets, setSubMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchSubMarkets = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(URL + "/api/submarkets/");
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
    <div className="border-green-700 border-2 p-6 rounded-3xl max-w-6xl mx-auto mt-10">
      <p className="text-green-800 text-3xl text-center mt-3">
        Browse Submarkets
      </p>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex space-x-3 md:flex-row flex-col justify-center items-center">
          {noResults ? (
            <p className="text-center">No results found.</p>
          ) : (
            subMarkets.map((submarket) => (
              <Link to={`/recoa/${submarket._id}`} key={submarket._id}>
                <SubCards submarket={submarket} />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BrowseSub;
