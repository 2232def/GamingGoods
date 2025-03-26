import React from 'react'
import Header from './Header'
import Leftsidebar from './Leftsidebar'

function News_letter() {
  return (
    <div className='bg-red-200 h-full w-full p-1 space-y-2 overflow-hidden'>
          <Header/>
          <Leftsidebar/>
    </div>
  )
}

export default News_letter