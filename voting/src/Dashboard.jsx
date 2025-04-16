import { useContext, useEffect, useState } from "react";
import ContractContext from "./ContractContext";

const Dashboard = () => {
	const [evntId, setEvntId] = useState(0);
	const [voteEvents, setVoteEvents] = useState([]);
	const [res, setRes] = useState(null);
	const [voteContract, _] = useContext(ContractContext);

	const handleSubmit = async () => {
		const res = await voteContract.methods.getVoteInfo(+evntId).call();
		setRes(bigintToNum(res));
	};

	const getVoteEvents = async () => {
		if (voteContract) {
			const res = await voteContract.methods.getVoteEvents().call();
			console.log(res);
			return res;
		}
		return [];
	};

	const bigintToNum = (d) =>
		d.map((e) => {
			Object.keys(e).forEach((key) => {
				e[key] = typeof e[key] === "bigint" ? Number(e[key]) : e[key];
			});
			return e;
		});

	useEffect(() => {
		// setVoteEvents(await getVoteEvents());
		getVoteEvents().then((d) => {
			setVoteEvents(bigintToNum(d));
		});
	}, [voteContract]);

	return (
		<div style={{ padding: "1vw", textAlign: "center" }}>
			<h2>
				Poll Standing
				{evntId !== 0 &&
					` for ${voteEvents.filter((d) => d.id === evntId)[0].name}`}
			</h2>
			<div
				className="form-body"
				style={{
					maxWidth: "100%",
				}}>
				<label>
					Vote Event ID:
					<select
						name="vote-event-id"
						id="vote-event-id"
						autoFocus
						required
						onChange={(e) => setEvntId(+e.target.value)}
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
				<input
					type="submit"
					value="Search"
					style={{
						padding: "0.5rem",
						display: "inline-block",
						top: "-0.2rem",
					}}
					disabled={evntId !== 0 ? false : true}
					onClick={handleSubmit}
				/>
			</div>
			<Table values={res} />
		</div>
	);
};

const Table = ({ values }) => {
	const tElm =
		values && values.length !== 0 ? (
			<div
				style={{
					width: "100%",
					overflowX: "auto",
					position: "relative",
				}}>
				<div
					style={{
						position: "relative",
						width: "fit-content",
						margin: "auto",
					}}>
					<table
						style={{
							border: "1px solid grey",
							borderCollapse: "collapse",
							fontSize: "1.4rem",
							margin: "1rem",
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
										padding: "0.8rem",
									}}>
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
								<th
									style={{
										border: "1px solid black",
										backgroundColor: "grey",
										color: "black",
										padding: "1rem",
									}}>
									Voter Count
								</th>
							</tr>
							{values.map((d, indx) => (
								<tr key={indx}>
									<td style={{ border: "1px solid grey", padding: "1rem" }}>
										{d.cndId}
									</td>
									<td style={{ border: "1px solid grey", padding: "1rem" }}>
										{d.name.toUpperCase()}
									</td>
									<td style={{ border: "1px solid grey", padding: "1rem" }}>
										{d.partyName.toUpperCase()}
									</td>
									<td
										style={{
											border: "1px solid grey",
											padding: "1rem",
											textAlign: "right",
										}}>
										{d.voteCount}
									</td>
								</tr>
							))}
							<tr>
								<td
									colSpan={3}
									style={{ border: "1px solid grey", padding: "1rem" }}>
									Total Voter Count
								</td>
								<td
									colSpan={1}
									style={{
										border: "1px solid grey",
										padding: "1rem",
										textAlign: "right",
									}}>
									{values.reduce((a, b) => a + b.voteCount, 0)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
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

export default Dashboard;
