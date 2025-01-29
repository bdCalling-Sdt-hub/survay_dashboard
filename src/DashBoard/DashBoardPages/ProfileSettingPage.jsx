import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import ProfileEdit from "../../components/ProfilePage/ProfileEdit.jsx";
import ChangePassword from "../../components/ProfilePage/ChangePassword.jsx";
import { Spin } from "antd";
import { imageUrl } from "../../utils/server";
import { useSuperAdminProfileGetQuery } from "../../redux/services/userApis.js";

const Tabs = ["Edit Profile", "Change Password"];

const Profile = () => {
  const [tab, setTab] = useState(Tabs[0]);
  const { data, isLoading } = useSuperAdminProfileGetQuery({});
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  if (isLoading) {
    return <Spin />;
  }

  const profileImage = image
    ? URL.createObjectURL(image)
    : data?.data?.profile_image
    ? imageUrl(data.data.profile_image)
    : "/path/to/default-image.jpg";

  return (
    <>
      {/* Profile Image Section */}
      <div className="max-w-[700px] mx-auto bg-[var(--black-200)] p-4 rounded-md">
        <div className="w-full center-center">
          <div className="w-24 border-[1px] border-black h-24 rounded-full relative">
            <img
              className="w-full  h-full object-cover rounded-full"
              src={profileImage}
              alt="Profile"
            />
            {tab === "Edit Profile" && (
              <button
                onClick={() => document.getElementById("fileInput")?.click()}
                aria-label="Edit Profile Picture"
                className="absolute right-0 bottom-2"
              >
                <FaEdit
                  size={24}
                  className="bg-black text-white w-8 h-8 p-2 rounded-full"
                />
              </button>
            )}

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <p className="text-2xl text-center text- mt-2">
          {data?.data?.authId?.name || "User Name"}
        </p>
      </div>

      {/* Tabs Section */}
      <div className="w-full center-center my-3">
        {Tabs.map((item) => (
          <button
            key={item}
            style={{ width: "200px", justifyContent: "center" }}
            className={`${
              item === tab ? "sidebar-button-orange" : "sidebar-button-black"
            }`}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Content Section (ProfileEdit or ChangePassword) */}
      <div className="max-w-[700px] mx-auto bg-[var(--black-200)] p-4 rounded-md">
        {tab === "Edit Profile" ? (
          <ProfileEdit
            image={image}
            defaultImage={profileImage}
            data={data?.data}
          />
        ) : (
          <ChangePassword />
        )}
      </div>
    </>
  );
};

export default Profile;
