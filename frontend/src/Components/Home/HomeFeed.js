"use client";

import React, { useEffect, useState } from "react";
import Question from "./Question";

const HomeFeed = () => {
	const [questionsData, setQuestionsData] = useState([]);

	useEffect(() => {
		const fetchQuestions = async () => {
			const res = await fetch("http://localhost:9000/guest/questions");
			const questions = await res.json();
			setQuestionsData(questions.data);
		};
		fetchQuestions();
	}, []);

	return (
		<div className="home-feed flex flex-col gap-5 mt-10">
			{questionsData.map((question, index) => (
				<Question key={index} data={question} />
			))}
		</div>
	);
};

export default HomeFeed;
