import React, { useContext } from "react";
import Key from "components/Key";

import "./Keyboard.less";

import AppContext from "contexts/AppContext";

import data from "data/data";

const Keyboard = () => {
	// Context
	const {
		wordle,
		grid,
		setGrid,
		curIndex,
		setCurIndex,
		gameOver,
		setGameOver,
		setMessage,
		findDiscoveredLetters,
	} = useContext(AppContext);

	// Keys
	const keys1 = ["W", "E", "R", "T", "Y", "U", "I", "O", "P"];
	const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
	const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

	const handleKeyClick = (e) => {
		const key = e.target.value;
		const gridCopy = grid;

		switch (key) {
			case "ENTER":
				// Check if user hasn't reached last row yet
				if (curIndex.r < grid.length) {
					// Check if user has entered all letters
					if (curIndex.l === grid[curIndex.r].length - 1) {
						// Consult dictionary
						const isInList = data.find(function (str) {
							return (
								str.toLowerCase() ===
								grid[curIndex.r].join("").toLowerCase()
							);
						});

						if (isInList) {
							// Check if user has found answer
							if (grid[curIndex.r].join("") === wordle.join("")) {
								findDiscoveredLetters();
								setGameOver(true);
							} else {
								findDiscoveredLetters();
								setCurIndex({ r: curIndex.r + 1, l: -1 });
							}
						} else {
							setMessage("Not in word list");
						}
					} else {
						setMessage("Not enough letters");
					}
				}
				break;
			case "DEL":
				// Check if game is not over yet and if there are letters to delete
				if (!gameOver && curIndex.l >= 0) {
					setCurIndex({ r: curIndex.r, l: curIndex.l - 1 });
					gridCopy[curIndex.r][curIndex.l] = "";
					setGrid(gridCopy);
				}
				break;
			default:
				// Check if user has still spots left to fill
				if (curIndex.l < grid[curIndex.r].length - 1) {
					setCurIndex({ r: curIndex.r, l: curIndex.l + 1 });
					gridCopy[curIndex.r][curIndex.l + 1] = key;
					setGrid(gridCopy);
				}
		}
	};

	return (
		<div className="wordle--keyboard">
			<div className="wordle--keyboard-row">
				{keys1.map((key) => (
					<Key handleKeyClick={handleKeyClick} key={key} value={key}>
						{key}
					</Key>
				))}
			</div>
			<div className="wordle--keyboard-row">
				{keys2.map((key) => (
					<Key handleKeyClick={handleKeyClick} key={key} value={key}>
						{key}
					</Key>
				))}
			</div>
			<div className="wordle--keyboard-row">
				<Key handleKeyClick={handleKeyClick} value="ENTER">
					ENTER
				</Key>
				{keys3.map((key) => (
					<Key handleKeyClick={handleKeyClick} key={key} value={key}>
						{key}
					</Key>
				))}
				<Key handleKeyClick={handleKeyClick} value="DEL">
					DEL
				</Key>
			</div>
		</div>
	);
};

export default Keyboard;
