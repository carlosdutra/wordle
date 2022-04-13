import React, { useState, useContext, useEffect } from "react";

import AppContext from "contexts/AppContext";

import "./Key.less";

const Key = ({ value, handleKeyClick, children, bigKey }) => {
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
			data-status={status}
			className={`wordle--keyboard-row-key${bigKey ? " bigkey" : ""}`}
			value={value}
		>
			{children}
		</button>
	);
};

export default Key;
