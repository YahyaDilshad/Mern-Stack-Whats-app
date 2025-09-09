import React from 'react'
import Navbar from './Navbar.jsx';
import Searchbar from './Searchbar.jsx';
const Chat = () => {
  return (
    <div className='chat relative left-[4%] border-r-1 border-gray-600 w-[35%] h-screen'>
    <Navbar />
    <Searchbar className='absolute left-12.5 right-0 z-10' />
    </div>
  )
}

export default Chat