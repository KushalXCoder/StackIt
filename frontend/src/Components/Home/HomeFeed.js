import React from 'react';
import Question from './Question';

const HomeFeed = () => {
  return (
    <div className='home-feed flex flex-col gap-5 mt-10'>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
    </div>
  )
}

export default HomeFeed