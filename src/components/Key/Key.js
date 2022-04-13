import React, { useState, useContext, useEffect } from "react";

import AppContext from "contexts/AppContext";

import "./Key.less";

const Key = ({ value, handleKeyClick, children }) => {
	const { discovedLetters } = useContext(AppContext);

	const [status, setStatus] = useState("");

	useEffect(() => {
		discovedLetters.map((key) => {
			if (key.letter === value) {
				setStatus(key.status);
			}
		});
	});

	return (
		<button
			onClick={handleKeyClick}
			className={`wordle--keyboard-row-key ${status}`}
			value={value}
		>
			{children}
		</button>
	);
};

export default Key;
