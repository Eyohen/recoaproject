import Sidebar from "../components/Sidebar";
import InnerReservation from '../components/InnerReservation';

const CreateReservation = () => {
  return (
    <div className="flex">
      <Sidebar />
      <InnerReservation />
    </div>
  );
};

export default CreateReservation;
