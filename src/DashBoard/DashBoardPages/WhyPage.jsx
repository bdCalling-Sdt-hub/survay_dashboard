import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { PiFileCsvFill } from 'react-icons/pi'
import WhyTable from '../components/WhyTable'


function WhyPage() {
    return (
        <div>
            <div>
                <div className='flex items-center my-12 justify-between w-full p-2 rounded-md bg-[#d6f4ff]'>
                    <h1 className='font-bold text-xl'>Transition history</h1>
                    <Link to={'/dashboard/donation-manage'}>
                        <Button className='bg-[#003366] hover:bg-[#003366]/70 text-white flex items-center gap-1'> <PiFileCsvFill />Export to CSV</Button>
                    </Link>
                </div>
            </div>
            <WhyTable />
        </div>
    )
}

export default WhyPage