import { useContext, useState } from "react";
import "./FormLayout.css";
import ContractContext from "./ContractContext";
import contractDetail from "./ContractDetail";

const RegisterParty = () => {
	const [partyName, setPartyName] = useState("");
	const [voteContract, _] = useContext(ContractContext);

	const handlePartyRegister = async () => {
		const sendrAddr = contractDetail.contractSenderAddr;

		await voteContract.methods
			.createParty(partyName)
			.send({ from: sendrAddr, gas: "1000000", gasPrice: 1000000000 });
	};

	return (
		<>
			<div className="form-title">
				<h1 style={{ textDecoration: "underline" }}>Register Party</h1>
			</div>
			<div className="form-body">
				Name:
				<input
					id="name"
					name="name"
					type="text"
					placeholder="Democrat"
					value={partyName}
					onChange={(e) => setPartyName(e.target.value.toLowerCase())}
				/>
				<br />
				<div className="submit-form-control">
					<input type="submit" value="Register" onClick={handlePartyRegister} />
				</div>
			</div>
		</>
	);
};

export default RegisterParty;
