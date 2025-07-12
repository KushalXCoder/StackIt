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
    <div className="w-full px-4 sm:px-8 md:px-20">
      <div className="flex flex-wrap gap-4 justify-between items-center font-poppins mt-8 bg-gray-200 p-5 rounded-lg">
        
        {/* Ask a question button */}
        <Link
          href="/add-question"
          className="border px-4 py-2 rounded hover:bg-green-200 text-sm bg-white text-center w-full sm:w-auto md:w-1/5"
        >
          Ask a question
        </Link>

        {/* Filters and search */}
        <div className="flex flex-wrap justify-end items-center gap-4 w-full sm:w-auto md:w-3/4">

          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="border px-4 py-2 rounded flex items-center justify-between text-sm w-full sm:w-auto"
            >
              {selected}
              <span className={`ml-2 ${showDropdown ? `rotate-180` : ``} transition-transform`}>
                <MdArrowDownward size={16} />
              </span>
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full sm:w-48 border rounded bg-white text-sm shadow-md z-10">
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

          {/* Search Bar */}
          <div className="w-full sm:w-auto">
            <form className="flex items-center border rounded-md px-3 bg-white w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by tags"
                className="py-2 text-sm w-full outline-none"
              />
              <button type="submit" className="ml-2 text-gray-600">
                <IoSearch size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Home feed */}
      <HomeFeed />
    </div>
  );
};

export default HomePage;
