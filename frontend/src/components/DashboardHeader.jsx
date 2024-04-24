import React, { useEffect, useState } from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { backend_url, server } from '../server'
import axios from 'axios'

const DashboardHeader = () => {

    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);


    useEffect(() => {
        const sendRequest = async () => {
        await axios
            .get(`${server}/user/getuser`, {
            withCredentials:true,
            })
            .then((res) => {
            setAvatar(`${backend_url}${res.data.user?.avatar}`);
            console.log(`${backend_url}${res.data.user?.avatar}`)
            })
            .catch((err) => {
                console.log(err);
            });
        };
        sendRequest();
        
      }, []);

      console.log(avatar);

  return (
         <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <h1 className='font-bold text-[25px]'>ValtSec</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
            <img
              src={avatar}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader