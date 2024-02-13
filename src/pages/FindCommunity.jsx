import FindSide from "../components/FindSide";
import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent"; // Assuming you have a component for the map

const FindCommunity = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="flex-1">
          <MapComponent location="Lagos, Nigeria" />
        </div>
        <FindSide className="w-1/4" /> {/* Adjust width as necessary */}
      </div>
    </div>
  );
};

export default FindCommunity;
