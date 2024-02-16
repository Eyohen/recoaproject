import { useParams } from "react-router-dom";
import FindSide from "../components/FindSide";
import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent";

const FindCommunity = () => {
  // Extracting the name and location from the URL
  const { name, location } = useParams();

const formattedLocation = location
//   ? decodeURIComponent(location) + ", Nigeria"
  ? decodeURIComponent(location) 
  : 
  "Lagos, Nigeria";

const formattedName = name ? decodeURIComponent(name) : "Lagos";

  console.log(formattedLocation);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="flex-1 mt-6 space-y-3">
          <MapComponent location={formattedLocation} />
        </div>
        <FindSide
          className="w-1/4"
          location={formattedLocation}
          name={formattedName}
        />
      </div>
    </div>
  );
};

export default FindCommunity;
