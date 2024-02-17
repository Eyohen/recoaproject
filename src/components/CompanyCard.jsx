/* eslint-disable react/prop-types */
const CompanyCard = ({ company }) => {
  return (
    // Adjusted the width and margin of the card for bigger size and centralized spacing
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden w-72 mx-4 my-6">
      {/* Company Photo - Adjusted the size for a bigger display */}
      <div className="w-40 h-40 rounded-full overflow-hidden mt-3 bg-gray-100">
        {company.photo ? (
          <img
            src={company.photo}
            alt={`${company.tenant} photo`}
            className="object-contain w-full h-full"
          />
        ) : (
          <span className="text-gray-500 flex justify-center items-center h-full">
            No photo available
          </span>
        )}
      </div>

      {/* Company Name - Adjustments for better spacing and presentation */}
      <div className="bg-[#50C878] text-white text-center text-md font-semibold px-6 py-3 w-4/5 mt-2 mb-5 rounded-b-lg">
        {company.tenant}
      </div>
    </div>
  );
};

export default CompanyCard;
