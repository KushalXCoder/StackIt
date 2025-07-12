import Editor from '@/Components/editor';
import React from 'react';

const page = async ({ params }) => {
  const questionsId = (await params).questionsId;
  const tags = ['React', 'TailwindCSS', 'Coding', 'New'];
  return (
    <div className='questions-page h-[calc(100vh-96px)] w-screen mt-3 px-20'>
        <h1 className='breadcrumb font-funnelDisplay text-lg max-w-50 truncate text-green-800 font-bold'>Quest &gt; {questionsId}</h1>
        <div className='question-display flex flex-col mt-5 border-b-2 pb-8'>
            <h1 className='font-funnelDisplay text-2xl font-bold'>How to connect tailwind css in my nextjs website</h1>
            <div className='tags flex gap-2 font-poppins mt-2'>
                {tags.map((tag,index) => (
                    <div key={index} className='my-1 me-2 rounded-full px-5 py-1 bg-green-100 group-hover:bg-green-200 transition-colors'>
                        <p>{tag}</p>
                    </div>
                ))}
            </div>
            <p className='question-description mt-2 font-poppins text-lg'>
                Late nights, glowing screens, and coffee-stained code — the life of a developer. Each bug is a puzzle, each fix a tiny victory in the war of logic. In the chaos of brackets and loops, we find a strange kind of poetry.
                Late nights, glowing screens, and coffee-stained code — the life of a developer. Each bug is a puzzle, each fix a tiny victory in the war of logic. In the chaos of brackets and loops, we find a strange kind of poetry.
                Late nights, glowing screens, and coffee-stained code — the life of a developer. Each bug is a puzzle, each fix a tiny victory in the war of logic. In the chaos of brackets and loops, we find a strange kind of poetry.
            </p>
        </div>
        <div className='submit-answer'>
            <h1 className='font-funnelDisplay font-bold text-xl my-5'>Submit your answer</h1>
            <Editor/>
            <button className='border w-50 rounded-lg px-5 py-2 font-poppins mt-5 bg-green-500 text-white cursor-pointer hover:bg-green-700'>Submit</button>
        </div>
        <div className='answers-display'>
            <h1 className='font-funnelDisplay font-bold text-xl mt-5'>Answers</h1>
        </div>
    </div>
  )
}

export default page