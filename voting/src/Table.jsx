import { humanizer } from "./util";

const Table = ({ headings, tbody }) => {
	if (tbody.length === 0)
		return (
			<div style={{ textAlign: "center", fontSize: "1.4rem" }}>No Data</div>
		);
	return (
		<div
			style={{
				margin: "1rem 0",
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
				<thead>
					<tr>
						{headings.map((d, indx) => (
							<td
								key={indx}
								style={{ padding: "1rem", border: "1px solid grey" }}>
								{humanizer(d)}
							</td>
						))}
					</tr>
				</thead>
				<tbody>
					{tbody.map((d, indx) => (
						<tr key={indx}>
							{headings.map((k) => {
								if (k === "endDate") {
									return (
										<td
											key={k}
											style={{ padding: "1rem", border: "1px solid grey" }}>
											{new Date(d["startDate"] + d["duration"])
												.toISOString()
												.split("T")
												.join("\n")}
										</td>
									);
								} else if (k === "startDate") {
									return (
										<td
											key={k}
											style={{ padding: "1rem", border: "1px solid grey" }}>
											{new Date(d[k]).toISOString().split("T").join("\n")}
										</td>
									);
								} else if (k === "duration") {
									return (
										<td
											style={{ padding: "1rem", border: "1px solid grey" }}
											key={k}>
											{Math.round((d[k] / (1000 * 60 * 60)) * 1000000) /
												1000000}{" "}
											Hr
										</td>
									);
								} else
									return (
										<td
											style={{ padding: "1rem", border: "1px solid grey" }}
											key={k}>
											{d[k]}
										</td>
									);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
