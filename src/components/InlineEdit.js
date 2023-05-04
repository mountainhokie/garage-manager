import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import useKeypress from "../hooks/useKeyPress";
import useOnClickOutside from "../hooks/useOnClickOutside";
import DOMPurify from "dompurify";
import { ItemsContext } from "../ItemsContext";

function InlineEdit(props) {
	const {updateVehicle, updatePart } = useContext(ItemsContext);
	const [isInputActive, setIsInputActive] = useState(false);
	const [inputValue, setInputValue] = useState(props.text);
	const [inputField, setInputField] = useState(props.field);
	const [ formType ] = useState(props.form);
	const { partID, vehicleID } = useParams();
	const wrapperRef = useRef(null);
	const textRef = useRef(null);
	const inputRef = useRef(null);
	const enter = useKeypress("Enter");
	const esc = useKeypress("Escape");
	const { onSetText } = props;

    // check to see if the user clicked outside of this component
	useOnClickOutside(wrapperRef, () => {
		if (isInputActive) {
			onSetText(inputValue);
			setIsInputActive(false);
			if(formType === 'vehicle')
				updateVehicle(vehicleID,inputField,inputValue);
			else if(formType ==='part')
				updatePart(partID,inputField,inputValue);
		}
	});

	const onEnter = useCallback(() => {
		if (enter) {
			onSetText(inputValue);
			setIsInputActive(false);
			if(formType === 'vehicle')
				updateVehicle(vehicleID,inputField,inputValue);
			else if(formType ==='part')
				updatePart(partID,inputField,inputValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enter, inputValue, onSetText]);

	const onEsc = useCallback(() => {
		if (esc) {
			setInputValue(props.text);
			setIsInputActive(false);
		}
	}, [esc, props.text]);

  	// focus the cursor in the input field on edit start
	useEffect(() => {
		if (isInputActive) {
			setInputValue(props.text);
			setInputField(props.field);
			inputRef.current.focus();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isInputActive]);

	useEffect(() => {
		if (isInputActive) {
	  		// if Enter is pressed, save the text and close the editor
			onEnter();
	 		// if Escape is pressed, revert the text and close the editor
			onEsc();
		}
  	}, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

	const handleInputChange = useCallback(
		event => {
	  	// sanitize the input a little
			setInputValue(DOMPurify.sanitize(event.target.value));
		},
		[setInputValue]
	);

	const handleSpanClick = useCallback(() => {
		setIsInputActive(true)
	}, [
		setIsInputActive
	]);

	return (
		<span className="inline-text" ref={wrapperRef}>
			<span
				ref={textRef}
				onClick={handleSpanClick}
				className={`inline-text_copy inline-text_copy--${
					!isInputActive ? "active" : "hidden"
				}`}
			>
				{props.text}
			</span>
			<input
				ref={inputRef}
				// set the width to the input length multiplied by the x height
				// it's not quite right but gets it close
				style={{ minWidth: Math.ceil(inputValue.length) + "ch" }}
				value={inputValue}
				onChange={handleInputChange}
				className={`inline-text_input inline-text_input--${
					isInputActive ? "active" : "hidden"
				}`}
			/>
		</span>
	);
}

export default InlineEdit;
