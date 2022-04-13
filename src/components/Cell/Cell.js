import React, { useState, useContext, useEffect } from "react";

import AppContext from "contexts/AppContext";

const Cell = ({ cell, row }) => {
	const { wordle, grid, curIndex, gameOver } = useContext(AppContext);

	const [status, setStatus] = useState("");

	useEffect(() => {
		const letter = grid[curIndex.r][curIndex.l];

		if (letter) {
			if (letter === wordle[curIndex.l]) {
				setStatus("green");
			} else if (letter !== wordle[curIndex.l] && wordle.includes(letter)) {
				setStatus("yellow");
			} else if (letter !== wordle[curIndex.l] && !wordle.includes(letter)) {
				setStatus("gray");
			} else {
				setStatus("");
			}
		}
	}, [cell]);

	return (
		<div
			className={`wordle--grid-cell${
				gameOver || row < curIndex.r ? " " + status : ""
			}`}
		>
			{cell}
		</div>
	);
};

export default Cell;
