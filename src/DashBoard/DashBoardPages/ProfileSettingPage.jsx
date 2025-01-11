import React, { useState } from "react";
import ProfileForm from "../components/Profile-setting-components/ProfileForm";
import { CameraOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ChangePasswordForm from "../components/Profile-setting-components/ChangePasswordForm ";

function ProfileSettingPage() {
  const [activeTab, setActiveTab] = useState("profile"); // Track active tab
  const [profile, setProfile] = useState({
    firstName: "Mojahid",
    surname: "Islam",
    profession: "Software Engineer",
    dateOfBirth: "1995-01-15",
    educationLevel: "Bachelor's Degree",
    email: "MojahidIslam@example.com",
    phone: "+8801737705511",
    country: "Bangladesh",
    city: "Dhaka",
  });

  return (
    <div>
      {/* Header Section */}
      <div className="text-[#083a50] pt-4 px-4">
        <div className=" flex flex-col items-center gap-8">
          {/* Profile Picture */}
          <div className="relative border-4 rounded-full border-[#083a50] w-28 h-28 lg:w-32 lg:h-32">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-white"
            />
            <div className="absolute bottom-2 right-2 bg-[#00b0f2] text-[#083a50] rounded-full p-1 cursor-pointer">
              <CameraOutlined />
            </div>
          </div>

          {/* Name and Buttons */}
          <div className="flex-grow text-center text-[#083a50]">
            <h1 className="text-3xl font-bold">
              {profile.firstName} {profile.surname}
            </h1>

            <div className="flex gap-4 mt-4">
              {/* Edit Profile Button */}
              <Button
                onClick={() => setActiveTab("profile")}
                className={`${
                  activeTab === "profile"
                    ? "bg-[#00b0f2] text-white"
                    : "bg-transparent text-[#083a50]"
                } rounded-md`}
              >
                Edit Profile
              </Button>

              {/* Change Password Button */}
              <Button
                onClick={() => setActiveTab("changePassword")}
                className={`${
                  activeTab === "changePassword"
                    ? "bg-[#00b0f2] text-white"
                    : "bg-transparent text-[#083a50]"
                } rounded-md`}
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Rendering */}
      <div className="max-w-screen-2xl mx-auto py-2 px-4">
        {activeTab === "profile" && <ProfileForm />}
        {activeTab === "changePassword" && <ChangePasswordForm />}
      </div>
    </div>
  );
}

export default ProfileSettingPage;
