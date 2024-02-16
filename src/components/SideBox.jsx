/* eslint-disable react/prop-types */
import LOGO from "../assets/logo.png";

const SideBox = ({ item, isCurrent }) => {
  return (
    <>
      <div
        className={`flex flex-col space-y-4 bg-green-100 rounded-2xl p-1 relative ${
          isCurrent ? "border border-green-500" : ""
        }`}
      >
        <div className="flex space-x-4 items-center">
          <img
            src={item.photo ? item.photo : LOGO}
            alt=""
            className="w-[35%] h-32 object-cover rounded-xl"
          />
          <div>
            <p className="text-green-800 font-bold text-xl text-left">
              {item.name}
              {isCurrent && (
                <span className="text-green-500 text-xs relative top-[-0.5em] left-1">
                  ⬤
                </span>
              )}
            </p>
            <p className="text-green-800 font-light text-lg text-left">
              {item.location}
            </p>
            <p className="text-green-800 text-sm font-medium text-left">
              {item.floorsAvailable} Units
            </p>
            <p className="text-green-800 text-sm font-medium text-left">
              starting from ${item.price}
            </p>
            <p className="text-green-800 text-sm font-medium text-left">
              {new Date(item?.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {isCurrent && (
        <>
          <div className="border-t border-green-500 my-2 mt-6 "></div>
          <p className="text-green-800 font-bold text-lg text-center">
            Other Communities
          </p>
          <div className="border-t border-green-500 my-2 mb-4 "></div>
        </>
      )}
    </>
  );
};

export default SideBox;
