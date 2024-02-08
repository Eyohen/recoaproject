import LOGO from "../assets/logo.png";

const Featuredcard = ({ submarket }) => {
  return (
    // <Link to={'/recoa'}>
    <div className="relative mt-6">
      {/* <div class="absolute top-6 flex w-full">
    <p className='text-white absolute font-medium text-md ml-20'>Now Pre-leasing</p>
  </div> */}
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
      <div className="absolute top-6 flex w-full">
        <p className="text-white absolute font-medium text-md ml-20">
          {submarket.status}
        </p>
      </div>
      <div className="absolute top-36 flex w-full">
        <p className="text-white absolute font-medium text-2xl ml-2">
          {submarket.name}
        </p>
      </div>
    </div>
    // </Link>
  );
};

export default Featuredcard;
