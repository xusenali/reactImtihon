import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router';

const Header = ({ cartCount , heartCount }) => {


    return (
        <div className='h-20  w-[80%] mx-auto flex gap-5 items-center justify-between '>
            <h1>CYBER</h1>
            <input type="text " placeholder='Search...' className='outline-none border p-1 w-[30%] rounded border-gray-400' />
            <ul className='flex gap-7 items-center'>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <li>About</li>
                <li>Contact Us</li>
                <li>Blog</li>
            </ul>
            <ul className='flex gap-7 items-center'>
                <Link to='/heart'>
                    <li className='relative '><CiHeart className='text-2xl' /> {heartCount > 0 && <span className='heart w-4 flex items-center justify-center text-white text-[10px] h-4 absolute top-[-5px] right-[-5px] rounded-full bg-red-700'>{heartCount}</span>} </li>

                </Link>
                <Link to='/cart'>
                    <li className='relative'><IoCartOutline className='text-2xl' /> {cartCount > 0 && <span className='heart w-4 flex items-center justify-center text-white text-[10px] h-4 absolute top-[-5px] right-[-5px] rounded-full bg-red-700'>{cartCount}</span>}</li>
                </Link>
                <CiUser className='text-2xl' />
            </ul>
        </div>
    )
}

export default Header