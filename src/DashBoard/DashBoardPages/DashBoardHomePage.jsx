import GrowthChart from "../components/chart/GrowthChart";
import { Button } from "antd";
import { Link } from "react-router-dom";
import storyIcon from "../../assets/storyIcon.svg";
import userIcon from "../../assets/userIcon.svg";
import blogIcon from "../../assets/blogIcon.svg";
import whyIcon from "../../assets/why.svg";
import ShortDonation from "../components/ShortDonation";
import { useGetNormalUserQuery } from "../../redux/services/userApis";


function page() {
  const { data: userData, isLoading } = useGetNormalUserQuery({});
  const data = [
    {
      title: "Total Users",
      icon: userIcon,
      number: userData?.data?.result?.length,
    },
    {
      title: "Total Blogs",
      icon: blogIcon,
      number: 144061,
    },
    {
      title: "Total Clients Story",
      icon: storyIcon,
      number: 144061,
    },
    {
      title: "Total WHY Finds",
      icon: whyIcon,
      number: 144061,
    },
    // {
    //   title: "Total Earning",
    //   icon: donateIcon,
    //   number: "$ 144061",
    // },
  ];

  return (
    <div className="flex items-center flex-col justify-center gap-12">
      <div className="flex  items-center justify-center gap-12 w-full">
        {data.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-1 text-center  flex-col p-12  rounded-md shadow-md bg-[#f0f8ff] items-center gap-4  h-48"
          >
            <h1>{card.title}</h1>
            <img src={card.icon} alt={card.title} />
            <p>
              <strong>{card.number}</strong>
            </p>
          </div>
        ))}
      </div>

      <GrowthChart userData={userData} isLoading={isLoading}></GrowthChart>
      <div className="flex items-center justify-between w-full p-2 rounded-md bg-[#d6f4ff]">
        <h1 className="mt-2">Recent User</h1>
        <Link to={"/dashboard/donation-manage"}>
          <Button className="bg-[#003366]  hover:bg-[#003366]/70 text-white">
            See All User
          </Button>
        </Link>
      </div>
      <ShortDonation></ShortDonation>
    </div>
  );
}

export default page;
