/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import CompanyCard from "../components/CompanyCard";

const fetchAPI = async (endpoint) => {
  try {
    const response = await axios.get(`${URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};


const CommunityCard = ({ community }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    (async () => setCompanies(await fetchAPI("/api/tenants/")))();
  }, []);

  return (
    <div className="border-2 border-emerald-400 p-6 rounded-lg shadow mx-auto max-w-4xl">
      <p className="text-emerald-800 text-3xl text-center mt-8">
        {community.name}
      </p>
      <p className="text-center mt-4 px-4 md:px-16">{community.desc}</p>
      <div className="mt-9 text-center">
        <p className="text-emerald-400 border-2 border-emerald-400 px-2 py-2 rounded-md text-lg">
          Preleasing Open to Corporate Tenants
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center items-center mt-4 p-4">
          {companies.map((company) => (
            <Link
              to={`/corporatelogin/${company._id}`}
              key={company._id}
              className="hover:underline flex justify-center w-full" // Ensure the link takes full width to center content
            >
              <CompanyCard company={company} />
            </Link>
          ))}
        </div>
      </div>

      <Link to="/reserve" className="block mt-16">
        <p className="text-emerald-400 text-lg underline">Join WaitList</p>
      </Link>
    </div>
  );
};

const Communities = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    (async () => setCommunities(await fetchAPI("/api/communities/")))();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-y-6 mt-6 mx-auto max-w-4xlw">
        {communities.map((community) => (
          <Link to={`/insidecommunity/${community._id}`} key={community._id}>
            <CommunityCard community={community} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Communities;
