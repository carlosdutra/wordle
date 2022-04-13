import React, { useState, useEffect } from "react";
import "./App.css";

import Message from "components/Message";
import Grid from "components/Grid";
import Keyboard from "components/Keyboard";

import AppContext from "contexts/AppContext";

import data from "data/data";

function App() {
	const numOfRows = 6;
	const numOfLetters = 5;

	const [wordle, setWordle] = useState("");
	const [grid, setGrid] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [message, setMessage] = useState("");
	const [revealAnswer, setRevealAnswer] = useState(false);
	const [discovedLetters, setDiscoveredLetters] = useState([]);

	const [curIndex, setCurIndex] = useState({ r: 0, l: -1 });

	useEffect(() => {
		setWordle(
			data[Math.floor(Math.random() * data.length)].toUpperCase().split("")
		);

		const gridStarter = new Array(numOfRows).fill("");
		for (var row = 0; row < numOfRows; row++) {
			gridStarter[row] = new Array(numOfLetters).fill("");
		}
		setGrid(gridStarter);
	}, []);

	const findDiscoveredLetters = () => {
		const discoveredLettersCopy = discovedLetters;

		grid[curIndex.r].map((letter, index) => {
			if (letter === wordle[index]) {
				if (
					!discoveredLettersCopy.some((e) => e.letter === letter) ||
					discoveredLettersCopy.some((e) => e.status !== "green")
				) {
					discoveredLettersCopy.push({ letter: letter, status: "green" });
					setDiscoveredLetters(discoveredLettersCopy);
				}
			} else if (letter !== wordle[index] && wordle.includes(letter)) {
				if (!discoveredLettersCopy.some((e) => e.letter === letter)) {
					discoveredLettersCopy.push({ letter: letter, status: "yellow" });
					setDiscoveredLetters(discoveredLettersCopy);
				}
			} else if (letter !== wordle[index] && !wordle.includes(letter)) {
				if (!discoveredLettersCopy.some((e) => e.letter === letter)) {
					discoveredLettersCopy.push({ letter: letter, status: "gray" });
					setDiscoveredLetters(discoveredLettersCopy);
				}
			} else {
				if (!discoveredLettersCopy.some((e) => e.letter === letter)) {
					discoveredLettersCopy.push({ letter: letter, status: "" });
					setDiscoveredLetters(discoveredLettersCopy);
				}
			}
		});
	};

	return (
		<div className="App">
			<div className="App-container">
				<AppContext.Provider
					value={{
						wordle,
						grid,
						setGrid,
						curIndex,
						setCurIndex,
						gameOver,
						setGameOver,
						message,
						setMessage,
						discovedLetters,
						findDiscoveredLetters,
						revealAnswer,
						setRevealAnswer,
					}}
				>
					{revealAnswer && <Message message={wordle} persistent={true} />}
					{message && <Message message={message} />}
					<Grid />
					<Keyboard />
				</AppContext.Provider>
			</div>
		</div>
	);
}

export default App;
