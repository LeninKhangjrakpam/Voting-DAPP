import { useEffect, useState, useContext } from "react";
import ContractContext from "./ContractContext";
import contractDetail from "./ContractDetail";
import Modal from "./Modal";
import { bigintToNum } from "./util";

const Poll = () => {
	const [pollInfo, setPollInfo] = useState({
		voterId: 0,
		cndId: 0,
		voteEvntId: 0,
	});
	const [evntId, setEvntId] = useState(0);
	const [voteEvents, setVoteEvents] = useState([]);
	const [candidates, setCandidates] = useState([]);
	const [modalViz, setModalViz] = useState(false);

	const [ballotActive, setBallotActive] = useState(true);
	const [ballotRes, setBallotRes] = useState("");
	const [ballotTransactionInfo, setBallotTransactionInfo] = useState({
		blockNumber: 0,
		blockHash: "",
		gasUsed: 0,
		transactionHash: "",
		to: "",
	});

	const [voteContract, _] = useContext(ContractContext);

	const getVoteEvents = async () => {
		if (voteContract) {
			const res = await voteContract.methods.getVoteEvents().call();
			return bigintToNum(res);
		}
		return [];
	};

	const getCandidates = async (_evntId) => {
		if (voteContract && _evntId !== 0) {
			const res = await voteContract.methods.getCandidateInfo(_evntId).call();
			return bigintToNum(res);
		}
		return [];
	};

	// const bigintToNum = (d) =>
	// 	d.map((e) => {
	// 		Object.keys(e).forEach((key) => {
	// 			e[key] = typeof e[key] === "bigint" ? Number(e[key]) : e[key];
	// 		});
	// 		return e;
	// 	});

	const handlePoll = async () => {
		const sendrAddr = contractDetail.contractSenderAddr;
		// high school crush to elder sister, i wont be able to imagine what u must have gone through to make that transition
		const { voterId, cndId, voteEvntId } = pollInfo;

		// if (pollInfo.voterId !== 0 &&
		// 	pollInfo.cndId !== 0 &&
		// 	pollInfo.voteEvntId !== 0 &&
		// 	ballotRes === "" &&
		// 	ballotActive === true
		// ) {
		// 	voteContract.methods
		// 		.poll(voterId, cndId, voteEvntId)
		// 		.send({ from: sendrAddr, gas: "1000000", gasPrice: 1000000000 })
		// 		.on("transactionHash", function (hash) {
		// 			console.log("Transaction hash:", hash);
		// 		})
		// 		.on("receipt", function (receipt) {
		// 			console.log("Transaction receipt:", receipt);
		// 		})
		// 		.on("error", function (error) {
		// 			console.error("Transaction error:", error);
		// 		})
		// 		.then(function (receipt) {
		// 			// Transaction successful
		// 			console.log("Transaction successful", receipt);
		// 			console.log(voteContract.events.ReturnedValue());
		// 			console.log(voteContract.events.ReturnedValue().returnValues);

		// 			voteContract.events
		// 				.ReturnedValue()
		// 				.on("data", function (event) {
		// 					// Handle emitted event
		// 					console.log(event);
		// 					console.log("Returned value:", event.returnValues);
		// 				})
		// 				.on("error", console.error);
		// 		});
		// }
		if (
			pollInfo.voterId !== 0 &&
			pollInfo.cndId !== 0 &&
			pollInfo.voteEvntId !== 0 &&
			ballotRes === "" &&
			ballotActive === true
		) {
			const res = await voteContract.methods
				.poll(voterId, cndId, voteEvntId)
				.send({ from: sendrAddr, gas: "1000000", gasPrice: 1000000000 });

			// Once Ballot Submited, cannot be resubmitted again
			setBallotActive(false);
			setBallotRes(res.events.ReturnedValue.returnValues[0]);
			setBallotTransactionInfo({
				blockNumber: Number(res.blockNumber),
				blockHash: res.blockHash,
				gasUsed: Number(res.gasUsed),
				transactionHash: res.transactionHash,
				to: res.to,
			});
			console.log("Transaction Response: ", res);
		}
	};

	const handleModal = () => {
		setModalViz(true);
	};
	useEffect(() => {
		getVoteEvents().then((d) => {
			const fd = bigintToNum(d).filter(
				(e) => e.startDate <= Date.now(),
				// e.startDate <= Date.now() && e.startDate + e.duration >= Date.now(),
			);
			setVoteEvents(bigintToNum(fd));
		});
	}, [voteContract]);

	return (
		<>
			{modalViz && (
				<Modal
					msg={ballotRes}
					handler={{
						closeBtnHandler: () => {
							setModalViz((viz) => !viz);
							setBallotActive(true);
							setBallotRes("");
							setBallotTransactionInfo((d) =>
								Object.keys(d).reduce((a, b) => {
									a[b] = typeof d[b] === Number ? 0 : "";
									return a;
								}, {}),
							);
						},
					}}
					contents={{
						title: "Ballot",
						body: (
							<div className="form-body">
								Vote Event:
								<input
									type="text"
									value={
										voteEvents.length !== 0 && pollInfo.voteEvntId !== 0
											? voteEvents.filter(
													(e) => e.id === pollInfo.voteEvntId,
											  )[0].name
											: "invalid"
									}
									disabled
								/>
								<br />
								Voter ID:
								<input type="number" value={pollInfo.voterId} disabled />
								<br />
								Candidate Name:
								<input
									type="text"
									value={
										candidates.length !== 0 && pollInfo.cndId !== 0
											? candidates
													.filter((e) => e.candId === pollInfo.cndId)[0]
													.name.toUpperCase()
											: "invalid"
									}
									disabled
								/>
								<br />
								Party Name:
								<input
									type="text"
									value={
										candidates.length !== 0 && pollInfo.partyId !== 0
											? candidates
													.filter((e) => e.candId === pollInfo.cndId)[0]
													.partyName.toUpperCase()
											: "invalid"
									}
									disabled
								/>
								<br />
								<div className="submit-form-control" style={{ margin: "1rem" }}>
									<input
										type="submit"
										value="Confirm"
										onClick={handlePoll}
										disabled={
											pollInfo.cndId &&
											pollInfo.voterId &&
											pollInfo.voteEvntId &&
											ballotActive
												? false
												: true
										}
									/>
								</div>
								<br />
								<hr />
								Ballot Fingerprint: {Date.now()} <br />
								{ballotRes !== "" && (
									<>
										Ballot Transaction Info: <br />
										<div style={{ Width: "100%", overflowX: "auto" }}>
											<pre>
												{Object.keys(ballotTransactionInfo).map((k, indx) => {
													return (
														<div key={indx}>
															{k} : {ballotTransactionInfo[k]}
															<br />
														</div>
													);
												})}
											</pre>
										</div>
									</>
								)}
							</div>
						),
					}}
				/>
			)}

			<div style={{ padding: "1rem", filter: modalViz ? "blur(16px)" : "" }}>
				<div className="form-title">
					<h1 style={{ textDecoration: "underline" }}>Poll</h1>
				</div>
				<div className="form-body">
					<label
						style={{
							textAlign: "center",
							width: "100%",
							display: "inline-block",
						}}>
						Vote Event:
						<select
							name="vote-event-id"
							id="vote-event-id"
							autoFocus
							required
							onChange={(e) => {
								setEvntId(+e.target.value);
								setPollInfo((poll) => ({
									...poll,
									cndId: 0,
									voteEvntId: +e.target.value,
								}));
								getCandidates(+e.target.value).then((d) => setCandidates(d));
							}}
							value={+evntId}
							style={{ width: "fit-content" }}>
							<option value="0" key={0} disabled>
								Select Vote Event
							</option>
							{voteEvents.map((d) => {
								return (
									<option key={d.id} value={d.id}>
										{d.name}
									</option>
								);
							})}
						</select>
					</label>
					<br />
					{evntId !== 0 && candidates.length !== 0 && (
						<Table
							values={candidates}
							pollInfo={pollInfo}
							setPollInfo={setPollInfo}
						/>
					)}
					<label>
						Candidate Name:
						<select
							name="candidate-id"
							id="candidate-id"
							required
							onChange={(e) => {
								setPollInfo((poll) => ({
									...poll,
									cndId: +e.target.value,
								}));
							}}
							value={+pollInfo.cndId}
							style={{ width: "fit-content" }}>
							<option value="0" key={0} disabled>
								Select Candidate
							</option>

							{candidates.map((d) => (
								<option key={d.candId} value={d.candId}>
									{d.name.toUpperCase()}
								</option>
							))}
						</select>
					</label>
					<br />
					Candidate Name:
					<input
						disabled={true}
						id="cand-id"
						name="cand-id"
						type="number"
						placeholder="0"
						value={+pollInfo.cndId}
						onChange={(e) =>
							setPollInfo((poll) => ({
								...poll,
								cndId: +e.target.value,
							}))
						}
					/>
					<br />
					Voter ID:
					<input
						id="voter-id"
						name="voter-id"
						type="number"
						placeholder="0"
						value={+pollInfo.voterId}
						onChange={(e) =>
							setPollInfo((poll) => ({
								...poll,
								voterId: +e.target.value,
							}))
						}
					/>
					<br />
					<div className="submit-form-control">
						<input
							type="submit"
							value="Vote"
							onClick={handleModal}
							disabled={
								pollInfo.cndId && pollInfo.voterId && pollInfo.voteEvntId
									? false
									: true
							}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

const Table = ({ values, pollInfo, setPollInfo }) => {
	const tElm =
		values && values.length !== 0 ? (
			<div
				style={{
					margin: "1rem 0",
					border: "1px solid green",
					position: "relative",
					width: "100%",
					overflowX: "auto",
				}}>
				<table
					className="hoverable"
					style={{
						border: "1px solid grey",
						borderCollapse: "collapse",
						fontSize: "1.4rem",
						margin: "auto",
					}}>
					<tbody>
						<tr>
							<th
								style={{
									border: "1px solid black",
									backgroundColor: "grey",
									color: "black",
								}}>
								Candidate Id
							</th>
							<th
								style={{
									border: "1px solid black",
									backgroundColor: "grey",
									color: "black",
									padding: "1rem",
								}}>
								{/* cndId":1,"voteCount":0,"name":"tim","partyId":1,"partyName" */}
								Candidate Name
							</th>
							<th
								style={{
									border: "1px solid black",
									backgroundColor: "grey",
									color: "black",
									padding: "1rem",
								}}>
								Party Name
							</th>
						</tr>
						{values.map((d, indx) => (
							<tr
								style={{
									backgroundColor:
										d.candId === pollInfo.cndId ? "salmon" : "inherit",
								}}
								key={indx}
								onMouseDown={() => {
									setPollInfo((poll) => ({ ...poll, cndId: d.candId }));
								}}>
								<td style={{ border: "1px solid grey", padding: "1rem" }}>
									{d.candId}
								</td>
								<td style={{ border: "1px solid grey", padding: "1rem" }}>
									{d.name.toUpperCase()}
								</td>
								<td style={{ border: "1px solid grey", padding: "1rem" }}>
									{d.partyName.toUpperCase()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		) : (
			""
		);

	return (
		<>
			{values && values.length !== 0
				? tElm
				: "No data found for the selected vote event"}
		</>
	);
};

export default Poll;
