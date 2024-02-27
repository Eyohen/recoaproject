import { useState } from "react";
import { URL } from "../url";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InnerTenant = () => {
  const navigate = useNavigate();

  const [tenant, setTenant] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [photo, setPhoto] = useState(null);
  const [created, setCreated] = useState(false);
  const [createDisabled, setCreateDisabled] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateDisabled(true);
    try {
      let uploadedPhotoUrl = "";
      if (photo) {
        uploadedPhotoUrl = await handleFileUpload();
      }
      await createTenant(uploadedPhotoUrl);
      navigate("/admin/tenant/view");
      setTenant("");
      setEmail("");
      setPassword("");
      setPhone("");
      setCompany("");
      setPhoto(null);
      setCreated(true);
    } catch (err) {
      console.log(err);
      toast.error("Failed to create tenant");
    } finally {
      setCreateDisabled(false);
    }
  };

  const createTenant = async (photoUrl) => {
    const newTenant = {
      tenant,
      email,
      password,
      phone,
      company,
      photo: photoUrl,
    };

    try {
      await axios.post(URL + "/api/tenants/register", newTenant);
      toast.success("Tenant created successfully");
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const handleFileUpload = async () => {
    const data = new FormData();
    const filename = Date.now() + photo.name;
    data.append("img", filename);
    data.append("file", photo);

    try {
      const url = await axios.post(URL + "/api/upload", data);
      return url.data[0];
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="w-full bg-gray-200">
      <div className="flex justify-evenly border h-12 bg-white">
        <p>Administration</p>
        <p>Administration</p>
      </div>

      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl text-green-800 text-center">
          Create a Corperate Tenant
        </h1>
        <Link to="/admin/tenant/view">
          <p className="text-green-600">See Corperate Tenants Created</p>
        </Link>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={(e) => setTenant(e.target.value)}
            value={tenant}
            type="text"
            placeholder="Enter Corperate Tenant Name"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Enter Corperate Tenant Email"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Tenant Password"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="text"
            placeholder="Enter Tenant Phone"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />
          <input
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            type="text"
            placeholder="Enter Corperate Tenant Company"
            className="px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg"
          />
          <input
            onChange={(e) => setPhoto(e.target.files[0])}
            type="file"
            className="px-4"
          />
          <button
            onClick={handleCreate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
            disabled={createDisabled}
          >
            {createDisabled ? "Creating..." : "Create Corperate Tenant"}
          </button>
          {created && (
            <h3 className="text-green-500 text-sm text-center mt-4">
              Corperate Tenant created successfully!
            </h3>
          )}
        </form>
      </div>
    </div>
  );
};

export default InnerTenant;
