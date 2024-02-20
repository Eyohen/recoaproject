import Sidebar from "../components/Sidebar";
import UserReservationsCreated from "./UserReservationCreated";

const CreateReservation = () => {
  return (
    <div className="flex">
      <Sidebar />
      <UserReservationsCreated />
    </div>
  );
};

export default CreateReservation;
