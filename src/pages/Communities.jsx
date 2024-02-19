/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { URL } from "../url";

const fetchAPI = async (endpoint) => {
  try {
    const response = await axios.get(`${URL}${endpoint}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const CommunityCard = ({ community }) => {
  const isNowPreleasing = community.status === "Now pre-leasing";

  return (
    <div className="border-2 border-emerald-400 p-6 rounded-lg shadow mx-auto max-w-4xl">
      <img
        src={community.photo}
        alt={community.name}
        className="w-full h-auto mt-4 rounded-md"
      />
      <p className="text-emerald-800 text-3xl text-center mt-8">
        {community.name}
      </p>
      <p className="text-center mt-4 px-4 md:px-16">{community.desc}</p>
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
        {isNowPreleasing && (
          <Link to={`/community/${community._id}`}>
            <button className="mt-6 bg-blue-800 text-white px-4 py-2 rounded-md">
              Reserve Now
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [header, setHeader] = useState("");
  const location = useLocation();
  useEffect(() => {
    const currentUserStr = localStorage.getItem("currentUser");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
    const searchParams = new URLSearchParams(location.search);
    const subId = searchParams.get("subId");
    const headerParam = searchParams.get("header") || "";
    if (headerParam) {
      setHeader(headerParam || "");
    } else if (currentUser.role === "tenant" && currentUser.tenantInfo) {
      const headertag =
        currentUser.tenantInfo.company + " Reserved Communities";
      setHeader(headertag);
    }

    let endpoint = "/api/communities/";
    if (subId) {
      endpoint += `?submarketId=${subId}`;
    }
    if (currentUser && currentUser.role === "tenant" && currentUser.tenant) {
      (async () =>
        setCommunities(
          await fetchAPI(`/api/communities/tenant/${currentUser.tenant}`)
        ))();
    } else {
      (async () => setCommunities(await fetchAPI(endpoint)))();
    }
  }, [location.search]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-y-6 mt-6 mx-auto max-w-4xlw">
        {header && (
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center my-4 px-4">
            Welcome to {header}
          </h2>
        )}
        {communities.map((community) => (
          <>
            <CommunityCard community={community} header={header} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Communities;
