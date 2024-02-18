/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";
import { HiPlusSmall } from "react-icons/hi2";
import { HiMinusSmall } from "react-icons/hi2";

const Floorcard = ({ unittype }) => {
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(1);

  const toggleModal = () => {
    setModal(!modal);
  };

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  return (
    // Floorcard component
    <div className="relative mt-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 min-w-[200px] sm:min-w-[250px] md:min-w-[300px] shrink-0">
      <img
        src={
          unittype.photo || "https://www.svgrepo.com/show/340721/no-image.svg"
        }
        alt=""
        className="w-full h-[250px] object-cover rounded-3xl"
      />

      <div className="absolute inset-x-0 top-6 flex justify-center space-x-2">
        <p className="text-white font-medium text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
          {unittype?.type}
        </p>
        <p className="text-white font-medium text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
          {unittype?.bathroom} Bath
        </p>
        <p className="text-white font-medium text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
          {unittype?.size} sq.m
        </p>
      </div>

      <div className="absolute inset-x-0 top-16 flex flex-col items-center space-y-2">
        <p className="text-white font-medium text-sm">{unittype?.name}</p>
        <p className="text-white font-medium text-lg">
          <span className="text-xl">{unittype?.floorsAvailable}</span>{" "}
          available
        </p>
      </div>

      <div className="absolute inset-x-0 top-32 flex justify-center">
        <button className="bg-white text-green-700 font-medium text-lg rounded-full px-4 py-2">
          starting at ${unittype.price}/annum
        </button>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content rounded-xl">
            <p className="text-center text-2xl text-green-700">unittype A</p>
            <p className="text-center mt-3">
              {unittype.floorsAvailable - count} floors Remaining
            </p>
            <p className="text-center mt-3">
              Amount: {unittype.price * count}
            </p>
            <div className="flex space-x-4 items-center justify-center mt-3">
              <button
                onClick={decrease}
                className="bg-green-700 rounded-full px-2"
              >
                <HiMinusSmall />
              </button>
              <p>{count}</p>
              <button
                onClick={increase}
                className="bg-green-700 rounded-full px-2"
              >
                <HiPlusSmall />
              </button>
            </div>
            {/* <div className='items-center justify-center '> */}
            <button
              className="bg-green-700 px-2 rounded-full mx-32 mt-6"
              onClick={toggleModal}
            >
              Submit
            </button>
            {/* </div> */}
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Floorcard;
