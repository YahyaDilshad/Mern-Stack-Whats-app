import React from 'react'
import { MessageSquare } from 'lucide-react'
const NoselectedUserPage = () => {
  return (
    <div className='absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] '>
      <div className='w-170 rounded-xl flex-col h-200  flex items-center justify-center'>
        <MessageSquare className='text-purple-500 mb-4 h-20 w-20 p-3 rounded-md bg-gray-700 ' />
        <h2 className='text-2xl my-2 '>Welcome To What's App</h2>
        <p className=' text-lg text-gray-400 mb-4 text-center'>Select A Conversation From  SideBar And <br />    Start Chatting </p>
        </div>
    </div>
  )
}

export default NoselectedUserPage