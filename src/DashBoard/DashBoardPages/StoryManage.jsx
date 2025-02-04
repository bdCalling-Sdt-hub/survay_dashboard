import React from "react";
import StoryTable from "../components/StoryTable";
import { Button } from "antd";
import { PiFileCsvFill } from "react-icons/pi";

function StoryManage() {
  return (
    <div>
      <div>
        <div className="flex pt-4 items-center mb-12 justify-between w-full p-2 rounded-md bg-[#d6f4ff]">
          <h1 className="font-bold text-xl">Manage User story</h1>
          {/* <Button className="bg-[#003366] hover:bg-[#003366]/70 text-white flex items-center gap-1">
            <PiFileCsvFill />
            Export to CSV
          </Button> */}
        </div>
      </div>
      <StoryTable />
    </div>
  );
}

export default StoryManage;
