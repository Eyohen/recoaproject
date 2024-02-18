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
      ) : noResults ? (
        <p className="text-center">No results found.</p>
      ) : (
        <div
          className={`flex ${
            subMarkets.length ? "justify-start" : "justify-center"
          } flex-nowrap overflow-x-auto py-2 -mx-2`}
        >
          {subMarkets.map((submarket) => (
            <Link
              to={`/findcommunity/${submarket.name}/${submarket.location}`}
              key={submarket._id}
              className="px-2 first:ml-auto last:mr-auto"
            >
              <SubCards submarket={submarket} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseSub;
