import GrowthChart from '../components/chart/GrowthChart';
import { Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
import storyIcon from '../../assets/storyIcon.svg';
import userIcon from '../../assets/userIcon.svg';
import blogIcon from '../../assets/blogIcon.svg';
import whyIcon from '../../assets/why.svg';
import { useGetNormalUserQuery } from '../../redux/services/userApis';
import { useGetAllMetaDataQuery } from '../../redux/services/metaApis';
import UserTable from '../components/UserTable';

function DashBoardHomePage() {
  const { data: userData, isLoading } = useGetNormalUserQuery({});
  const { data: metaData, isLoading: isMetaDataLoading } =
    useGetAllMetaDataQuery();

  if (isMetaDataLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spin size="small" />
      </div>
    );
  }

  const data = [
    {
      title: 'Total Users',
      icon: userIcon,
      number: metaData?.data?.totalUser,
    },
    {
      title: 'Total Blogs',
      icon: blogIcon,
      number: metaData?.data?.totalBlog,
    },
    {
      title: 'Total Clients Story',
      icon: storyIcon,
      number: metaData?.data?.totalStory,
    },
    {
      title: 'Total WHY Finds',
      icon: whyIcon,
      number: metaData?.data?.totalWhy,
    },
    // {
    //   title: "Total Earning",
    //   icon: donateIcon,
    //   number: "$ 144061",
    // },
  ];
  return (
    <div className="flex  flex-col justify-center gap-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {data?.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-1 text-center  flex-col p-12  rounded-md shadow-md bg-[#f0f8ff] items-center gap-4"
          >
            <h1 className="text-xl font-semibold capitalize">{card?.title}</h1>
            <img src={card?.icon} alt={card?.title} />
            <p>
              <strong className="text-2xl">{card?.number}</strong>
            </p>
          </div>
        ))}
      </div>

      <GrowthChart userData={userData} isLoading={isLoading}></GrowthChart>
      <div className="flex items-center justify-between w-full p-2 rounded-md bg-[#d6f4ff]">
        <h1 className="mt-2">Recent User</h1>
        <Link to={'/dashboard/user-manage'}>
          <Button className="bg-[#003366]  hover:bg-[#003366]/70 text-white">
            See All User
          </Button>
        </Link>
      </div>
      {/* <ShortDonation></ShortDonation> */}
      <UserTable />
    </div>
  );
}

export default DashBoardHomePage;
