import { NavLink } from "react-router-dom";
const RegisterLists = () => {
	return (
		<>
			<h1>Register Links</h1>
			<ul>
				<li>
					For Voter: <NavLink to="voter">/register/voter</NavLink>
				</li>
				<li>
					For candidates: <NavLink to="candidate">/register/candidate</NavLink>
				</li>
				<li>
					For VoteEvent: <NavLink to="vote">/register/vote</NavLink>
				</li>
				<li>
					For Party: <NavLink to="party">/register/party</NavLink>
				</li>
			</ul>
		</>
	);
};

export default RegisterLists;
