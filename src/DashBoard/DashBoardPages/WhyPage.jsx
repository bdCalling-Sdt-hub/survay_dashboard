import WhyTable from "../components/WhyTable";

function WhyPage() {
  return (
    <div>
      <div className="flex items-center mb-12 pt-4 justify-between w-full p-2 rounded-md bg-[#d6f4ff]">
        <h1 className="font-bold text-xl">User Why Log</h1>
        {/* <Button className="bg-[#003366] hover:bg-[#003366]/70 text-white flex items-center gap-1">
          <PiFileCsvFill />
          Export to CSV
        </Button> */}
      </div>
      <WhyTable />
    </div>
  );
}

export default WhyPage;
