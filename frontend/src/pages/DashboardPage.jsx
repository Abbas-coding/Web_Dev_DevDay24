import React from 'react'
import DashboardHeader from '../components/DashboardHeader'
import SideBar from '../components/SideBar'
import DashboardMain from '../components/DashboardMain'

const DashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <SideBar active={1} />
          </div>
          <DashboardMain />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
