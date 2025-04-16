import { useContext, useState } from "react";
import "./FormLayout.css";
import ContractContext from "./ContractContext";
import contractDetail from "./ContractDetail";

const RegisterVoter = () => {
	const [voterInfo, setVoterInfo] = useState({ name: "", addr: "" });
	const [voteContract, _] = useContext(ContractContext);

	const handleVoterRegister = async () => {
		const sendrAddr = contractDetail.contractSenderAddr;

		await voteContract.methods
			.registerVoter(voterInfo.addr.trim(), voterInfo.name.trim())
			.send({ from: sendrAddr, gas: "1000000", gasPrice: 1000000000 });
	};

	return (
		<>
			<div className="form-title">
				<h1 style={{ textDecoration: "underline" }}>Register Voter</h1>
			</div>
			<div className="form-body">
				Name:
				<input
					id="name"
					name="name"
					type="text"
					placeholder="john smith"
					value={voterInfo.name}
					onChange={(e) =>
						setVoterInfo((voterInfo) => ({
							...voterInfo,
							name: e.target.value.toLowerCase(),
						}))
					}
				/>
				<br />
				<label htmlFor="addr"></label>
				Account Address:
				<input
					id="addr"
					name="addr"
					type="text"
					placeholder="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
					value={voterInfo.addr}
					onChange={(e) =>
						setVoterInfo((voterInfo) => ({
							...voterInfo,
							addr: e.target.value,
						}))
					}
				/>
				<br />
				<div className="submit-form-control">
					<input type="submit" value="Register" onClick={handleVoterRegister} />
				</div>
			</div>
		</>
	);
};

export default RegisterVoter;
