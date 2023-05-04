import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

const Accordion = ({ children, expanded }) => {
	const controls = useAnimation();

	const variants = {
		expanded: { opacity: 1, height: "auto" },
		collapsed: { opacity: 0, height: 0 }
	};

	useEffect(() => {
		if (expanded) {
			controls.start("expanded");
		} else {
			controls.start("collapsed");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [expanded]);

	return (
		<motion.div
			initial="collapsed"
			className="z-0 overflow-hidden collapse-content"
			animate={controls}
			transition={{ duration: 0.3 }}
			variants={variants}
		>
			{children}
		</motion.div>
		);
};


const Trigger = ({ expanded, onClick, showLabel, hideLabel }) => {

	return (
		<button
			onClick={onClick}
			className="btn-collapse-trigger"
		>
			{expanded ? <FontAwesomeIcon icon={faCaretDown} /> ?? <FontAwesomeIcon icon={faCaretRight} /> : <FontAwesomeIcon icon={faCaretRight} />}
			{expanded ? hideLabel ?? showLabel : showLabel}
		</button>
		);
};

Accordion.Trigger = Trigger;

export default Accordion