/* eslint-disable react/prop-types */
import LOGO from "../assets/logo.png";

const SubCards = ({ submarket }) => {
      const nameStyle = {
        background: "rgba(0, 0, 0, 0.5)", // Semi-transparent black for better readability
        color: "white",
        padding: "5px 10px",
        borderRadius: "15px", // Rounded edges for the background
        position: "absolute",
        bottom: "10px", // Position towards the bottom of the image
        left: "50%",
        transform: "translateX(-50%)", // Center align the text block
        maxWidth: "calc(100% - 20px)", // Ensure it doesn't overflow the card
        textAlign: "center", // Center-align the text
        fontSize: "1rem", // Adjust based on your design needs
        fontWeight: "bold",
        textShadow: "1px 1px 2px rgba(0,0,0,0.8)", // Optional: text shadow for better legibility
      };
  return (
    <div className="relative mt-6">
      {submarket.photo ? (
        <img
          src={submarket.photo}
          alt=""
          className="w-[250px] h-[200px] object-cover rounded-2xl brightness-75"
        />
      ) : (
        <img
          src={LOGO}
          alt=""
          className="w-[250px] h-[200px] object-cover rounded-3xl brightness-75"
        />
      )}
      <div style={nameStyle}>{submarket.name}</div>
    </div>
  );
};

export default SubCards;
