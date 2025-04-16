import { useContext, useEffect, useState } from "react";
import contractDetail from "./ContractDetail";
import ContractContext from "./ContractContext";
import { bigintToNum } from "./util";

const RegisterCandidate = () => {
	const [partyList, setPartyList] = useState([]);
	const [voteEvents, setVoteEvents] = useState([]);

	const [candInfo, setCandInfo] = useState({
		voterId: 0,
		voteEvntId: 0,
		partyId: 0,
	});
	const [voteContract, setVoteContract] = useContext(ContractContext);

	const handleCandidateRegister = async () => {
		const sendrAddr = contractDetail.contractSenderAddr;
		const { voterId, voteEvntId, partyId } = candInfo;

		const res = await voteContract.methods
			.registerCandidate(+voterId, +voteEvntId, +partyId)
			.send({ from: sendrAddr, gas: "1000000", gasPrice: 1000000000 });
	};

	const getPartyList = async () => {
		if (voteContract) {
			const res = await voteContract.methods.getPartyLists().call();
			console.log(res);
			return bigintToNum(res);
		}
		return [];
	};
	const getVoteEvents = async () => {
		if (voteContract) {
			const res = await voteContract.methods.getVoteEvents().call();
			console.log(res);
			return bigintToNum(res);
		}
		return [];
	};

	useEffect(() => {
		if (!voteContract) return;
		getVoteEvents().then((d) => {
			const fd = bigintToNum(d).filter(
				(e) => e.startDate <= Date.now(),
				// e.startDate <= Date.now() && e.startDate + e.duration >= Date.now(),
			);
			console.log("ioer");
			setVoteEvents(bigintToNum(fd));
		});
		getPartyList().then((d) => setPartyList(d));
	}, [voteContract]);

	return (
		<>
			<div className="form-title">
				<h1 style={{ textDecoration: "underline" }}>Register Candidate</h1>
			</div>
			<div className="form-body">
				Voter Id:
				<input
					id="voter-id"
					name="voter-id"
					type="number"
					placeholder="123"
					value={candInfo.voterId}
					onChange={(e) =>
						setCandInfo((cndInfo) => ({
							...cndInfo,
							voterId: +e.target.value,
						}))
					}
				/>
				<br />
				<label
					style={{
						textAlign: "center",
						width: "100%",
						display: "inline-block",
						verticalAlign: "middle",
					}}>
					Vote Event Name:
					<select
						name="vote-event-id"
						id="vote-event-id"
						autoFocus
						required
						onChange={(e) => {
							setCandInfo((info) => ({
								...info,
								voteEvntId: +e.target.value,
							}));
						}}
						value={candInfo.voteEvntId}
						style={{ width: "fit-content" }}>
						<option value="0" key={0} disabled>
							Select Vote Event
						</option>
						{voteEvents.length !== 0 &&
							voteEvents.map((d) => {
								return (
									<option key={d.id} value={d.id}>
										{d.name}
									</option>
								);
							})}
					</select>
				</label>
				<br />
				Vote Event Id:
				<input
					id="vote-event-id"
					name="vote-event-id"
					type="number"
					placeholder="123"
					value={candInfo.voteEvntId}
					disabled
					onChange={(e) =>
						setCandInfo((cndInfo) => ({
							...cndInfo,
							voteEvntId: +e.target.value,
						}))
					}
				/>
				<br />
				<label
					style={{
						textAlign: "center",
						width: "100%",
						display: "inline-block",
						verticalAlign: "middle",
					}}>
					Party Name :
					<select
						name="vote-event-id"
						id="vote-event-id"
						autoFocus
						required
						onChange={(e) =>
							setCandInfo((info) => ({ ...info, partyId: +e.target.value }))
						}
						value={candInfo.partyId}
						style={{ width: "fit-content" }}>
						<option value="0" key={0} disabled>
							Select Party
						</option>

						{partyList.length !== 0 &&
							partyList.map((d) => {
								return (
									<option value={d.id} key={d.id}>
										{d.name.toUpperCase()}
									</option>
								);
							})}
					</select>
				</label>
				<br />
				Party Id:
				<input
					id="paryt-id"
					name="party-id"
					type="number"
					placeholder="123"
					value={+candInfo.partyId}
					disabled
				/>
				<br />
				<div className="submit-form-control">
					<input
						type="submit"
						value="Register"
						onClick={handleCandidateRegister}
					/>
				</div>
			</div>
		</>
	);
};

export default RegisterCandidate;
