import toast from 'react-hot-toast'
import create from 'zustand' 
import axiosinstance from '../lib/axios'
import { Users } from 'lucide-react'


export const authchatmessage = create((set)=>({
    users : [] ,
    messages : [],
    SeletedUser : null,
    ismessageloading : false,
    isUserloading : false,
getUsers: async ()=>{
    set({isUserloading: true})
    try {
      const res = await axiosinstance.get('/users')
        set({users : res.data})
    } catch (error) {
     toast.error(error.response.data.messages)    
    }finally{
        set({isUserloading : false})
    }
},
getmessages:async (userId)=>{
    set({ismessageloading : true})
    try {
       const res = await axiosinstance.get(`mesages/${userId}`) 
       set({messages : res.data})
    } catch (error) {
    toast.error(error.response.data.messages)
    }finally{
    set({ismessageloading :false})
        
    }
}

}))

