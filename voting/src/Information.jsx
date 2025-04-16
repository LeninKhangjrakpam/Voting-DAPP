import { useContext, useEffect, useState } from "react";
import ContractContext from "./ContractContext";
import contractDetail from "./ContractDetail";

import "./Information.css";
import { bigintToNum } from "./util";
import Table from "./Table";

const Information = () => {
	const [voteContract, _] = useContext(ContractContext);

	const [blckT, setBlckT] = useState(0);
	const [voteEventLists, setVoteEventLists] = useState([]);

	useEffect(() => {
		if (!voteContract) return;
		getCurrentBlckTStm(voteContract).then((d) => setBlckT(Number(d)));
		getVoteEvents(voteContract).then((d) => setVoteEventLists(d));
		// Todo: change this to useref instead of using useState
		setInterval(() => {
			setBlckT((t) => t + 1000);
		}, 1000);
	}, [voteContract]);
	return (
		<>
			<h2 style={{ textAlign: "center" }}>
				Current Block Timestamp:{" "}
				{!blckT ? "loading" : `${blckT} (${new Date(blckT).toUTCString(0)})`}
			</h2>
			<div className="info-container">
				<section>
					<h2 className="section-heading">Active Vote Events</h2>
					<div className="overflow-container">
						{voteEventLists.length !== 0 && (
							<Table
								headings={["id", "name", "startDate", "endDate", "duration"]}
								tbody={voteEventLists.filter(
									(d) => d.startDate + d.duration >= blckT,
								)}
							/>
						)}
					</div>
				</section>
				<section>
					<h2 className="section-heading">InActive Vote Events</h2>
					<div className="overflow-container">
						{voteEventLists.length !== 0 && (
							<Table
								headings={["id", "name", "startDate", "endDate", "duration"]}
								tbody={voteEventLists.filter(
									(d) => d.startDate + d.duration < blckT,
								)}
							/>
						)}
					</div>
				</section>
			</div>
		</>
	);
};

export default Information;

const getCurrentBlckTStm = async (contract) => {
	return await contract.methods.getBlockTimestmp().call();
};

const getVoteEvents = async (contract) => {
	if (contract) {
		const res = await contract.methods.getVoteEvents().call();
		return bigintToNum(res);
	}
	return [];
};
