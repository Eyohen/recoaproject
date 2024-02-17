/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";
import { HiPlusSmall } from "react-icons/hi2";
import { HiMinusSmall } from "react-icons/hi2";


const Floorcard = ({ community }) => {
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

      <div className='relative mt-6'>

     <img src={community.photo || "https://www.svgrepo.com/show/340721/no-image.svg"} alt='' className='w-[450px] h-[250px] object-cover rounded-3xl brightness-75'/>

        <div className="absolute top-6 flex w-full space-x-6 justify-center">
      <p className='text-white font-medium text-md '>{community?.type}</p>
      <p className='text-white font-medium text-md'>{community?.bathroom} Bath</p>
      <p className='text-white font-medium text-md'>{community?.size} sq.m</p>
    </div>
      <div className="absolute top-16 flex w-full justify-center">
        <div>
      <p className='text-white font-medium text-md '>{community?.name}</p>
      <p className='text-white font-medium text-2xl '><span className='text-3xl'>{community?.floorsAvailable}</span> available</p>
      </div>
    </div>
    <div className="absolute top-32 flex w-full justify-center">
      <button className='bg-white text-green-700 font-medium text-2xl  rounded-full px-2 items-center'>starting at ${community.price}/annum</button>
    </div>

    {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content rounded-xl">
              <p className='text-center text-2xl text-green-700'>community A</p>
              <p className='text-center mt-3'>{community.floorsAvailable - count} floors Remaining</p>
              <p  className='text-center mt-3'>Amount: {community.price * count}</p>
              <div className='flex space-x-4 items-center justify-center mt-3'>
              <button onClick={decrease} className='bg-green-700 rounded-full px-2'><HiMinusSmall /></button>
              <p>
               {count}
              </p>
              <button onClick={increase} className='bg-green-700 rounded-full px-2'><HiPlusSmall /></button>
              </div>
              {/* <div className='items-center justify-center '> */}
              <button className='bg-green-700 px-2 rounded-full mx-32 mt-6' onClick={toggleModal}>Submit</button>
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
