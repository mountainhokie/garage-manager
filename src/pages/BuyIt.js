import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function BuyIt() {
	const formRef = useRef();
	const defaultObj = {
		carPrice: 0,
		kbbTrade: 0,
		invest: 0,
		kbbPrivate: 0,
		fees: 0,
		checkMe: false
	}
	const [state, setState] = useState(defaultObj);
	const [kbbProfit, setKbbProfit] = useState(0);
	const [actProfit, setActProfit] = useState(0);
	const [buyCarText, setBuyCarText] = useState('');
	const [buyCarHighlight, setBuyCarHighlight] = useState('');
	const fees = 5+20+15+30.75;    	// fees = trip+inspection+title+reg = 70.75

	const handleChange = e => {
		console.log("handleChange:", e.target.name, e.target.value);
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setState({
			...state,
			[e.target.name]: value
		})
	};

	useEffect(() => {
		let goodBuy = 0;
		const kbbProfit = state.kbbPrivate - state.kbbTrade - fees - state.invest;
		setKbbProfit(kbbProfit);
		const actProfit = state.kbbPrivate - state.carPrice - fees - state.invest;
		setActProfit(actProfit);

		if (state.carPrice < state.kbbTrade) 
			goodBuy++;

		if (actProfit > 500)
			goodBuy++;

		if (kbbProfit > 500)
			goodBuy++;

		let buyCarHighlight = '';
		let buyCarText = '';

		switch(goodBuy) {
			case 0:
				buyCarHighlight = 'red';
				buyCarText = 'Pass!';
				break;
			case 1:
				buyCarHighlight = 'yellow';
				buyCarText = 'Pass';
				break;
			case 2:
				buyCarHighlight = 'green';
				buyCarText = 'Good';
				break;
			case 3:
				buyCarHighlight = 'bright-green';
				buyCarText = 'Buy it!!!'; 
				break;
			default:
				break;
		}

		setBuyCarText(buyCarText);
		setBuyCarHighlight(buyCarHighlight);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);


	return (
		<div>
			<h1 className="title is-1 buy-title">Should I Buy It?</h1>

			<ul className="should-list">
				<li><span className="profit-type">KBB:</span> ${kbbProfit}</li>
				<li><span className="profit-type">Actual:</span> ${actProfit}</li>
				<li><span className="profit-type">Buy it:</span> <span className={buyCarHighlight}>{buyCarText}</span></li>
			</ul>

			<Form ref={formRef} className="buyForm">
				<Form.Group className="mb-3" as={Row}>
					<Form.Label htmlFor="carPriceInput" column sm={2}>Car Price</Form.Label>
					<Col sm={10}>
						<Form.Control id="carPriceInput" placeholder="Car Price" name="carPrice"  onBlur={handleChange} />
					</Col>
				</Form.Group>    
				<Form.Group className="mb-3" as={Row}>
					<Form.Label htmlFor="kbbTradeInput" column sm={2}>KBB Trade In</Form.Label>
					<Col sm={10}>
						<Form.Control id="kbbTradeInput" placeholder="$1000" name="kbbTrade" onBlur={handleChange} />
					</Col>           
				</Form.Group>   
				<Form.Group className="mb-3" as={Row}>
					<Form.Label htmlFor="investInput" column sm={2}>Expected Investment</Form.Label>
					<Col sm={10}>
						<Form.Control id="investInput" placeholder="$500" name="invest" onBlur={handleChange} />
					</Col>
				</Form.Group>   
				<Form.Group className="mb-3" as={Row}>
					<Form.Label htmlFor="kbbPrivateInputInput" column sm={2}>KBB Private Party/Sell Price</Form.Label>
					<Col sm={10}>
						<Form.Control id="kbbPrivateInput" placeholder="$2000" name="kbbPrivate" onBlur={handleChange} />
					</Col>
				</Form.Group>   
			</Form>

			<ul className="small buy-notes">
				<li>Fees include Title, Registraion, Va State Inspection, and Trip Permit</li>
				<li>KBB Profit = KBB Private - KBB Trade - Fees - Investment</li>
				<li>Actual Profit = Sell Price - Car Price - Fees - Investment</li>
			</ul>
		</div>

		);
}

export default BuyIt;
