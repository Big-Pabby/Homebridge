import React from 'react'
import { Icon } from '@iconify/react'
import SearchWithPopup from './SearchWithPopup'
import NotificationModal from './NotificationModal'
import CalendarModal from './CalenderModal'

const TopNav = () => {
  return (
    <div className='w-full'>
       {/* Top Nav */}
          <div className="flex w-full items-center bg-none justify-between px-8 py-4">
            <h1 className="text-2xl font-semibold text-[#0e0e0f]" style={{ letterSpacing: '-0.48px' }}>
              ☀️ Hello, Hephra Stan!
            </h1>
            <div className="flex max-w-[500px] w-full  justify-end items-center gap-5">
             <SearchWithPopup />
             <CalendarModal />
             <NotificationModal />
            </div>
          </div>
    </div>
  )
}

export default TopNav