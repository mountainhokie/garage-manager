import React, { useState } from "react"
import Accordion from "../components/Accordion";
import InspectionItem from './InspectionItem'


export default function InspectionList(inspItem) {
	const [expanded, setExpanded] = useState(false);
	let inspectionItems = inspItem.item.items[0].split(',');

	return (
		<div className="inspection-section">
			<Accordion.Trigger
				onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
				expanded={expanded}
				showLabel={inspItem.item.area}
				hideLabel={inspItem.item.area}
			/>
			<Accordion expanded={expanded}>
				{ inspectionItems.length ? (
					inspectionItems.map((item, idx) => (
						<InspectionItem key={idx} item={item}  />
					))
				) : (
					<p className="emptyText">
						No Inspection Items Found Found
					</p>
				)}
		  	</Accordion>
		</div>
	)
}