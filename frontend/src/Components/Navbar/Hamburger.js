"use client";

import React, { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from './Sidebar';

const Hamburger = () => {
  const [open, setOpen] = useState(false);  

  return (
    <div className='hidden max-sm:block'>
        <RxHamburgerMenu size={22} onClick={() => setOpen(true)}/>
        {open && (
            <Sidebar setOpen={setOpen}/>
        )}
    </div>
  )
}

export default Hamburger