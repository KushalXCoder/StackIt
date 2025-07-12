"use client";

import React, { useEffect, useState } from 'react';
import Question from './Question';

const HomeFeed = () => {
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    const fetchQuestions = async() => {
      const res = await fetch("http://localhost:9000/guest/getQuestions");
      const data = await res.json();
      console.log(data);
    }
    fetchQuestions();
  });

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