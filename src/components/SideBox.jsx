/* eslint-disable react/prop-types */
import LOGO from "../assets/logo.png";

const SideBox = ({ item, isCurrent }) => {
  const count = item.communities.length;
  const tagStyle =
    count === 0
      ? "text-orange-600 text-xs relative top-[-0.5em] left-1"
      : "text-green-500 text-xs relative top-[-0.5em] left-1";

  // Format the last active date as DD MM YYYY
   const formatDate = (date) => {
     const d = new Date(date);
     const day = d.getDate(); 
     const monthNames = [
       "Jan",
       "Feb",
       "Mar",
       "Apr",
       "May",
       "Jun",
       "Jul",
       "Aug",
       "Sep",
       "Oct",
       "Nov",
       "Dec",
     ];
     const month = monthNames[d.getMonth()];
     const year = d.getFullYear();
     return `${day} ${month} ${year}`; 
   };

    const containerClass = `flex flex-col space-y-4 bg-green-100 rounded-2xl p-1 relative ${
      isCurrent ? "border border-green-500" : "mb-4"
    }`;
  return (
    <>
      <div className={containerClass}>
        <div className="flex space-x-4 items-center">
          <img
            src={item.photo ? item.photo : LOGO}
            alt=""
            className="w-[35%] h-32 object-cover rounded-xl"
          />
          <div>
            <p className="text-green-800 font-bold text-xl text-left">
              {item.name}
              {isCurrent && <span className={tagStyle}>⬤</span>}
            </p>
            <p className="text-green-800 font-light text-lg text-left">
              {item.location}
            </p>
            <p className="text-green-800 text-sm font-medium text-left">
              {count} communities
            </p>
            <p className="text-green-800 text-sm font-medium text-left">
              currently {count === 0 ? "inactive" : item.status}
            </p>
            <p className="text-green-800 text-sm font-medium text-left">
              last active {formatDate(item?.updatedAt)}
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
