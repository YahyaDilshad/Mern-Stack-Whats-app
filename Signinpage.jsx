import React, { useState }  from 'react'
import useAuthStore from "../store/useauthstore.js";
import { MessageSquare } from 'lucide-react';
import {Link} from 'react-router-dom';
const Signinpage = () => {
const { authuser ,login,  updateprofile, isupdatingprofile} = useAuthStore();

  const [Formdata, setFormdata] = useState({
  profilepic: "",
  email: "",
  password: "",
  });
  
  const [password, setPassword] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
   const formvalidate = () => {
  if (!Formdata.email.trim()) {toast.error("email is required");return false;}
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(Formdata.email)) {toast.error("email is invalid");return false;}
  if (!Formdata.password.trim()) {toast.error("password is required");return false;}
  if (Formdata.password.length < 6) {toast.error("password must be at least 6 characters long"); return false;}
  
  return true;
};
  
const handleLogin = (e) => {
  e.preventDefault();
  const formdata = 
  { email: Formdata.email,
    password: Formdata.password };
    login(formdata);
};
  
  return (
    <div className='flex items-center justify-center h-screen '>
    <div className='logincontainer p-5 flex flex-col rounded-xl items-center w-[30%] bg-[#141b22a8] '>
      <MessageSquare className='text-purple-500  mt-9 mb-2 h-12 w-12 p-3 rounded-md bg-gray-800' />
        <h2 className='text-2xl my-2 '>Welcome back</h2>
        <p className='text-gray-500 mb-4'>Please Sign Your Account.</p>
      
      {/* Profile avatar */}
   {/* <div className='profileImage relative'>
      <img src={selectedImage ? selectedImage : authuser?.profilepic || 'https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg'} 
      alt="Profile picture"
      className='mb-4 w-24 h-24 border-1 rounded-full' />
      <label 
      htmlFor="Upload Image"
      className={`
      mb-2 absolute bottom-0 right-0 p-2 rounded-full hover:scale-105 transition-all ease-in cursor-pointer bg-gray-700 
      ${isupdatingprofile ? 'text-gray-300' : ''}`}>
      <Camera />
      <input 
      type="file"
      id="Upload Image"
      className='hidden'
      onChange={handleImageUpload}
      accept="image/*"
      disabled={isupdatingprofile}
       />
</label>
      </div> */}
       <form >
       <input 
        value={Formdata.email} 
         type="email"
         placeholder="Email"
         className='my-6 w-full outline-none   p-2 border border-gray-500 rounded' 
         onChange={(e) => setFormdata({ ...Formdata, email: e.target.value })}
         />

        <input 
        value={Formdata.password} 
        type="password" 
        placeholder="Password" 
        className='mb-4 w-full outline-none  p-2 border border-gray-500 rounded' 
        onChange={(e) => setFormdata({ ...Formdata, password: e.target.value })}
        />
        <button onClick={handleLogin} type="submit" className='cursor-pointer bg-purple-500 w-full text-white p-2 rounded'>Login</button>
       </form>
       <p className='text-gray-500 mt-5'>Don't have an account? <Link to="/signup" className='text-purple-500'>Sign up</Link></p>
       <p className="text-gray-500 text-sm mt-40">By Sign in, you agree to our 
          <a href="/terms" className="text-purple-500 hover:underline"> Terms & Conditions</a> 
        and 
          <a href="/privacy" className="text-purple-500 hover:underline"> Privacy Policy</a>.
       </p>

    </div>
    </div>
  )
}

export default Signinpage