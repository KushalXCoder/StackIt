import React from 'react';

const Question = () => {
  const tags = ['React', 'TailwindCSS', 'Coding', 'New'];
  return (
    <div className='question-container w-full flex justify-between items-start font-poppins px-5 py-5 hover:bg-gray-100 group'>
        <div className='question-box flex flex-col w-[94%]'>
            <h1 className='question-title font-bold text-xl'>How to install and use tailwind inside my next-js project ?</h1>
            <div className='question-bottom flex mt-3 gap-5'>
                <div className='left flex flex-col w-[15%] border-r'>
                    <div className='tags flex flex-wrap'>
                        {tags.map((tag,index) => (
                            <div key={index} className='my-1 me-2 border rounded-full px-5 bg-green-100 group-hover:bg-green-200 transition-colors'>
                                <p>{tag}</p>
                            </div>
                        ))}
                    </div>
                    <h1 className='user mt-3 px-1'>Posted by - Kushal Rathod</h1>
                </div>
                <div className='right flex flex-col justify-between items-start py-1 w-[75%]'>
                    <p className='question-content'>
                        Late nights, glowing screens, and coffee-stained code — the life of a developer. Each bug is a puzzle, each fix a tiny victory in the war of logic. In the chaos of brackets and loops, we find a strange kind of poetry.
                    </p>
                    <button className='rounded border px-4 bg-black text-white py-1'>
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