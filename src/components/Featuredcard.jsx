/* eslint-disable react/prop-types */
import LOGO from "../assets/logo.png";

const Featuredcard = ({ community }) => {
  // Function to transform status names and get badge colors
  const getStatusDetails = (status) => {
    const statusDetails = {
      "Join waitlisting": {
        text: "Waitlisting",
        backgroundColor: "#007bff", // Blue
      },
      "Now pre-leasing": {
        text: "Preleasing",
        backgroundColor: "#28a745", // Green
      },
      "Coming Soon": {
        text: "Coming Soon",
        backgroundColor: "#ffc107", // Yellow
      },
      "Opening in": {
        text: "Opening Soon",
        backgroundColor: "#dc3545", // Red
      },
    };

    // Return the transformed status details, or default values if not found in the map
    return (
      statusDetails[status] || { text: status, backgroundColor: "#6c757d" }
    ); // Default: grey
  };

  // Use status details to set badge styles
  const badgeStyle = (status) => ({
    backgroundColor: getStatusDetails(status).backgroundColor,
    color: "white",
    padding: "4px 8px",
    borderRadius: "15px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    position: "absolute",
    top: "10px",
    left: "20px",
    textTransform: "uppercase",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  });

  // Inline styles for the community name
  const nameStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    color: "white",
    padding: "8px 12px",
    borderRadius: "10px",
    fontSize: "1.0rem", 
    fontWeight: "bold",
    position: "absolute",
    bottom: "10px", 
    left: "20px",
    maxWidth: "90%", 
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap", 
  };

  return (
    <div className="relative mt-6">
      {community.photo ? (
        <img
          src={community.photo}
          alt=""
          className="w-[250px] h-[200px] object-cover rounded-2xl brightness-75"
        />
      ) : (
        <img
          src={LOGO}
          alt=""
          className="w-[250px] h-[200px] object-cover rounded-2xl brightness-75"
        />
      )}
      <div style={badgeStyle(community.status)}>
        {getStatusDetails(community.status).text}
      </div>
      <div style={nameStyle}>{community.name}</div>
    </div>
  );
};

export default Featuredcard;
