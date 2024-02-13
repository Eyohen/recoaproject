/* eslint-disable react/prop-types */
import LOGO from "../assets/logo.png";

const SideBox = ({ item }) => {
  return (
    <div className="flex space-x-4 items-center bg-green-100 rounded-2xl p-1">
      <img
        src={
          item.photo
            ? item.photo
            : LOGO
        }
        alt=""
        className="w-[35%] h-32 object-cover rounded-xl"
      />
      <div>
        <p className="text-green-800 font-bold text-xl text-left">
          {item.name}
        </p>
        <p className="text-green-800 font-light text-lg text-left">
          {item.location}
        </p>
        <p className="text-green-800 text-sm font-medium text-left">
          {item.floorsAvailable} Units{" "}
        </p>
        <p className="text-green-800 text-sm font-medium text-left">
          starting from ${item.price}
        </p>
        <p className="text-green-800 text-sm font-medium text-left">
          {item.name}
        </p>
        <p className="text-green-800 text-sm font-medium text-left">
          {new Date(item?.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default SideBox;
