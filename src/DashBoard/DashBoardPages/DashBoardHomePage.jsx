import React from 'react'
import GrowthChart from '../components/chart/GrowthChart'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import donateIcon from '../../assets/donateIcon.svg'
import storyIcon from '../../assets/storyIcon.svg'
import userIcon from '../../assets/userIcon.svg'
import blogIcon from '../../assets/blogIcon.svg'
import whyIcon from '../../assets/why.svg'
import ShortDonation from '../components/ShortDonation'

function page() {

  const data = [
    {
      title: 'Total Users',
      icon: userIcon,
      number: 144061
    },
    {
      title: 'Total Users',
      icon: blogIcon,
      number: 144061
    },
    {
      title: 'Total Clients Story',
      icon: storyIcon,
      number: 144061
    },
    {
      title: 'Total WHY Finds',
      icon: whyIcon,
      number: 144061
    },
    {
      title: 'Total Earning',
      icon: donateIcon,
      number: "$ 144061"
    }
  ]
  return (
    <div className='flex items-center flex-col justify-center gap-12'>
      <div className='flex items-center justify-center gap-12'>
        {
          data.map((card, idx) => (
            <div key={idx} className='flex flex-col p-12 border-2  rounded-md shadow-md bg-[#f0f8ff] items-center gap-4  h-48'>
              <h1>{card.title}</h1>
              <img src={card.icon} alt={card.title} />
              <p><strong>{card.number}</strong></p>
            </div>
          ))
        }


      </div>

      <GrowthChart></GrowthChart>
      <div className='flex items-center justify-between w-full p-2 rounded-md bg-[#d6f4ff]'>
        <h1>Transition history</h1>
        <Link to={'/dashboard/donation-manage'}><Button onClick={() => navigateDonation()}>See All History</Button></Link>
      </div>
      <ShortDonation></ShortDonation>
    </div>
  )
}

export default page