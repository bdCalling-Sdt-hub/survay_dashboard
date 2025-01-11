import React from 'react'
import GrowthChart from '../components/chart/GrowthChart'
import money from '../../assets/money-tag.svg'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { PiFileCsvFill } from "react-icons/pi";
import DonateTable from '../components/DonateTable'

function DonationPage() {
  return (
    <div>
      <div className='flex  items-center gap-2 justify-between'>
        <div className='p-32 rounded-md bg-[#f0f8ff] h-full flex items-center justify-center'>
          <div className='flex items-center justify-center'>
            <img src={money} alt="money" />
            <div>
              <h1>Total Earn</h1>
              <h1>$12,750</h1>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <GrowthChart></GrowthChart>
        </div>

      </div>
      <div>
        <div className='flex items-center my-12 justify-between w-full p-2 rounded-md bg-[#d6f4ff]'>
          <h1 className='font-bold text-xl'>Transition history</h1>
          <Link to={'/dashboard/donation-manage'}>
            <Button className='bg-[#003366] hover:bg-[#003366]/70 text-white flex items-center gap-1'> <PiFileCsvFill />Export to CSV</Button>
          </Link>
        </div>
      </div>
      <DonateTable/>
    </div>
  )
}

export default DonationPage