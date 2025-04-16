import { useState, useContext } from "react";
import ContractContext from "./ContractContext";
import contractDetail from "./ContractDetail";

const RegisterVoteEvent = () => {
	const [voteEvent, setVoteEvent] = useState({
		startDate: Date.now(),
		duration: 10 * 1000 * 60 * 60,
	});
	const [voteContract, _] = useContext(ContractContext);

	const handleVoteEventRegister = async () => {
		const sendrAddr = contractDetail.contractSenderAddr;
		const { startDate, duration } = voteEvent;
		console.log(new Date(startDate).getTime());
		const res = await voteContract.methods
			.createVoteEvnt(startDate, duration)
			.send({ from: sendrAddr, gas: "1000000", gasPrice: 1000000000 });

		console.log("Vote Event Register:", res);
	};

	return (
		<>
			<div className="form-title">
				<h1 style={{ textDecoration: "underline" }}>Register Vote Event</h1>
			</div>
			<div className="form-body">
				Voting Start Date:
				<input
					id="start-date"
					name="start-date"
					type="date"
					placeholder="Date"
					value={new Date(voteEvent.startDate).toISOString().split("T")[0]}
					onChange={(e) =>
						setVoteEvent((voteEvnt) => ({
							...voteEvnt,
							startDate: new Date(e.target.value).getTime(),
						}))
					}
				/>
				<br />
				Voting Duration (in Hours):
				<input
					id="duration"
					name="duration"
					type="number"
					placeholder="in Hours"
					value={voteEvent.duration / (1000 * 60 * 60)}
					onChange={(e) =>
						setVoteEvent((voteEvnt) => ({
							...voteEvnt,
							duration: +e.target.value * (1000 * 60 * 60),
						}))
					}
				/>
				<br />
				<div className="submit-form-control">
					<input
						type="submit"
						value="Register"
						onClick={handleVoteEventRegister}
					/>
				</div>
			</div>
		</>
	);
};

export default RegisterVoteEvent;
