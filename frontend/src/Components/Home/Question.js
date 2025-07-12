"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Question = ({ data }) => {
  const tags = ['React', 'TailwindCSS', 'Coding', 'New'];
  const router = useRouter();
  const handleClick = () => {
    router.push(`/questions/${data._id}`);
  }
  return (
    <div className='question-container w-full flex justify-between items-start font-poppins px-5 py-5 hover:bg-gray-100 group'>
        <div className='question-box flex flex-col w-[94%]'>
            <h1 className='question-title font-bold text-xl'>{data.title}</h1>
            <div className='question-bottom flex mt-3 gap-5'>
                <div className='left flex flex-col w-[15%] border-r'>
                    <div className='tags flex flex-wrap'>
                        {data.tags.map((tag,index) => (
                            <div key={index} className='my-1 me-2 border rounded-full px-5 bg-green-100 group-hover:bg-green-200 transition-colors'>
                                <p>{tag}</p>
                            </div>
                        ))}
                    </div>
                    <h1 className='user mt-3 px-1'>Posted by - Kushal Rathod</h1>
                </div>
                <div className='right flex flex-col justify-between items-start py-1 w-[75%]'>
                    <p className='question-content'>
                        {data.content}
                    </p>
                    <button className='rounded border px-4 bg-black text-white py-1' onClick={handleClick}>
                        Answer
                    </button>
                </div>
            </div>
        </div>
        <div className='question-details w-[8%] text-center flex flex-col gap-2'>
            <p className='answers border px-3 py-1 rounded-lg bg-black text-white'>5 ans</p>
            <p className='time border px-3 py-1 rounded-lg bg-black text-white'>5 hours ago</p>
        </div>
    </div>
  )
}

export default Question