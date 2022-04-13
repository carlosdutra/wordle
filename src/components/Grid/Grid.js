import React, { useContext } from "react";

import "./Grid.less";

import Cell from "components/Cell";

import AppContext from "contexts/AppContext";

const Grid = () => {
	const { grid } = useContext(AppContext);

	return (
		<div className="wordle--grid">
			{grid.map((row, rowIndex) => (
				<div className="wordle--grid-row" key={rowIndex}>
					{row.map((cell, cellIndex) => (
						<Cell
							cell={cell}
							row={rowIndex}
							key={rowIndex + "-" + cellIndex}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default Grid;
