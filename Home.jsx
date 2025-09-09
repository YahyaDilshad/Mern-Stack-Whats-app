import React from 'react'
import useAuthStore from "../store/useauthstore.js";
import Chat from '../Components/Chat.jsx';
import NoselectedUserPage from '../Components/NoselectedUserPage';
const Home = () => {
   const {SeletedUser} = useAuthStore();

  return (
    <div className='w-full h-screen bg-[#111b21]'>
      <div className='w-full'></div>
      {SeletedUser ? <Chat /> : <NoselectedUserPage />}
    </div>
  )
}

export default Home