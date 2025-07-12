"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { MdArrowDownward } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import HomeFeed from '@/Components/Home/HomeFeed';

const HomePage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState("Newest Unanswered");
  const options = ["Newest Unanswered", "Most Voted", "Unanswered", "Oldest"];

  return (
    <div className="w-full px-20">
      <div className="flex gap-4 justify-between items-center font-poppins mt-8 bg-gray-200 p-5 rounded-lg">
        {/* Add a question */}
        <Link
          href="/add-question"
          className="border px-4 py-2 rounded hover:bg-green-200 text-sm w-[15%] text-center bg-white"
        >
          Ask a question
        </Link>
        <div className='other-options flex justify-end items-center gap-5 w-[60%] *:bg-white'>
            {/* Filter Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="border px-4 py-2 rounded flex items-center justify-between text-sm"
                >
                    {selected}
                    <span className={`ml-2 ${showDropdown ? `rotate-180` : ``} transition-transform`}>
                        <MdArrowDownward size={16}/>
                    </span>
                </button>

                {showDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-full border rounded bg-white text-sm shadow-md z-10">
                    {options.map((option) => (
                        <div
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            setSelected(option);
                            setShowDropdown(false);
                        }}
                        >
                        {option}
                        </div>
                    ))}
                    </div>
                )}
            </div>
            {/* Search Questions by Tags */}
            <div className='search border rounded-md px-4'>
                <form className='flex items-center'>
                    <input type='text' placeholder='Search by tags' className='py-2 text-[14px] w-100 outline-0'></input>
                    <button type='submit'>
                        <IoSearch size={20}/>
                    </button>
                </form>
            </div>
        </div>
      </div>
      <HomeFeed/>
    </div>
  );
};

export default HomePage;