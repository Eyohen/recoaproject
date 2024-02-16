/* eslint-disable react/prop-types */
import LOGO from "../assets/logo.png";

const SubCards = ({ submarket }) => {
  return (
    <div className="relative mt-6">
      {submarket.photo ? (
        <img
          src={submarket.photo}
          alt=""
          className="w-[250px] h-[200px] object-cover rounded-3xl brightness-75"
        />
      ) : (
        <img
          src={LOGO}
          alt=""
          className="w-[250px] h-[200px] object-cover rounded-3xl brightness-75"
        />
      )}
      <div className="absolute top-24 flex w-full">
        <p className="text-white absolute font-medium text-xl ml-6">
          {submarket.name}
        </p>
      </div>
    </div>
  );
};

export default SubCards;
