import GrowthChart from "../components/chart/GrowthChart";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
import storyIcon from "../../assets/storyIcon.svg";
import userIcon from "../../assets/userIcon.svg";
import blogIcon from "../../assets/blogIcon.svg";
import whyIcon from "../../assets/why.svg";
import ShortDonation from "../components/ShortDonation";
import { useGetNormalUserQuery } from "../../redux/services/userApis";
import {
  useGetAllMetaDataQuery,
  useGetOverViewsQuery,
} from "../../redux/services/metaApis";

function DashBoardHomePage() {
  const { data: userData, isLoading } = useGetNormalUserQuery({});
  const { data: overViewData, isLoading: overViewDataLoading } =
    useGetOverViewsQuery({ year: "2025" });
  const { data: metaData, isLoading: isMetaDataLoading } =
    useGetAllMetaDataQuery();

  if (overViewDataLoading || isMetaDataLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spin size="small" />
      </div>
    );
  }
  console.log(overViewData);

  const { totalUser, totalStory, totalWhy, totalBlog } = metaData.data;

  const data = [
    {
      title: "Total Users",
      icon: userIcon,
      number: totalUser,
    },
    {
      title: "Total Blogs",
      icon: blogIcon,
      number: totalBlog,
    },
    {
      title: "Total Clients Story",
      icon: storyIcon,
      number: totalStory,
    },
    {
      title: "Total WHY Finds",
      icon: whyIcon,
      number: totalWhy,
    },
    // {
    //   title: "Total Earning",
    //   icon: donateIcon,
    //   number: "$ 144061",
    // },
  ];
  return (
    <div className="flex items-center flex-col justify-center gap-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
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

export default DashBoardHomePage;
