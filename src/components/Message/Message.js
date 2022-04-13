import React, { useState, useEffect, useContext } from "react";

import "./Message.less";

import AppContext from "contexts/AppContext";

const Message = ({ message }) => {
	const { setMessage } = useContext(AppContext);

	const [show, setShow] = useState(true);

	// On componentDidMount set the timer
	useEffect(() => {
		const timeId = setTimeout(() => {
			// After 3 seconds set the show value to false
			setShow(false);
			setMessage("");
		}, 2500);

		return () => {
			clearTimeout(timeId);
		};
	}, []);

	// If show is false the component will return null and stop here
	if (!show) {
		return null;
	}

	// If show is true this will be returned
	return (
		<div className="wordle--message">
			<div className="wordle--message-text">{message}</div>
		</div>
	);
};

export default Message;
