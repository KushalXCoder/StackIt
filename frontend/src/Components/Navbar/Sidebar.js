"use client";

import React from 'react';
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({setOpen}) => {
  return (
    <div className='h-screen w-screen border-l-2 backdrop-blur-lg absolute top-0 right-0 flex justify-end'>
        <aside className='sidebar h-full w-55 bg-green-300 font-poppins flex flex-col items-end px-5 py-5'>
            <RxCross2 size={20} onClick={() => setOpen(false)}/>
            <div className='register-buttons-mobile flex flex-col gap-5 w-full px-1 mt-8'>
                <button className='signup font-poppins border bg-white px-4 py-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                    Signup
                </button>
                <button className='login font-poppins border bg-white px-4 py-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                    Login
                </button>
            </div>
        </aside>
    </div>
  )
}

export default Sidebar