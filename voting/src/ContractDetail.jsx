const contractDetail = {
	name: "voting",
	ganacheEndPoint: "http://localhost:8545",
	contractAddr: "0x5bc26cFfa58CE98020016aFE556155e42E4F4a3b",
	contractSenderAddr: "0xC37f312EBd15BCEEC3E0d031d9CB4E19590De5C0",
	contractABI: [
		{
			inputs: [
				{
					internalType: "address",
					name: "addr",
					type: "address",
				},
			],
			name: "addAdmin",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "string",
					name: "partyName",
					type: "string",
				},
			],
			name: "createParty",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "string",
					name: "eventName",
					type: "string",
				},
				{
					internalType: "uint256",
					name: "startDate",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "duration",
					type: "uint256",
				},
			],
			name: "createVoteEvnt",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "init",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "voterId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "cndId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "voteEvntId",
					type: "uint256",
				},
			],
			name: "poll",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "voterId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "voteEvntId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "partyId",
					type: "uint256",
				},
			],
			name: "registerCandidate",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "addr",
					type: "address",
				},
				{
					internalType: "string",
					name: "name",
					type: "string",
				},
			],
			name: "registerVoter",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			stateMutability: "nonpayable",
			type: "constructor",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "string",
					name: "retStr",
					type: "string",
				},
			],
			name: "ReturnedValue",
			type: "event",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "voterId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "voteEvnt",
					type: "uint256",
				},
			],
			name: "voterRemove",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "CandidateMap",
			outputs: [
				{
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "voterId",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "addr",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "partyId",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "EvntCndVtr",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getBlockTimestmp",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "voteEvntId",
					type: "uint256",
				},
			],
			name: "getCandidateInfo",
			outputs: [
				{
					components: [
						{
							internalType: "uint256",
							name: "candId",
							type: "uint256",
						},
						{
							internalType: "uint256",
							name: "voterId",
							type: "uint256",
						},
						{
							internalType: "string",
							name: "name",
							type: "string",
						},
						{
							internalType: "address",
							name: "addr",
							type: "address",
						},
						{
							internalType: "uint256",
							name: "partyId",
							type: "uint256",
						},
						{
							internalType: "string",
							name: "partyName",
							type: "string",
						},
					],
					internalType: "struct DVote.CandidateInfo[]",
					name: "",
					type: "tuple[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "cndId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "voteEvnt",
					type: "uint256",
				},
			],
			name: "getCndVId",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getPartyLists",
			outputs: [
				{
					components: [
						{
							internalType: "uint256",
							name: "id",
							type: "uint256",
						},
						{
							internalType: "string",
							name: "name",
							type: "string",
						},
					],
					internalType: "struct DVote.Party[]",
					name: "",
					type: "tuple[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getVoteEvents",
			outputs: [
				{
					components: [
						{
							internalType: "uint256",
							name: "id",
							type: "uint256",
						},
						{
							internalType: "string",
							name: "name",
							type: "string",
						},
						{
							internalType: "uint256",
							name: "startDate",
							type: "uint256",
						},
						{
							internalType: "uint256",
							name: "duration",
							type: "uint256",
						},
					],
					internalType: "struct DVote.VoteE[]",
					name: "",
					type: "tuple[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "voteEvntId",
					type: "uint256",
				},
			],
			name: "getVoteEvntInfo",
			outputs: [
				{
					components: [
						{
							internalType: "uint256",
							name: "id",
							type: "uint256",
						},
						{
							internalType: "string",
							name: "name",
							type: "string",
						},
						{
							internalType: "uint256",
							name: "startDate",
							type: "uint256",
						},
						{
							internalType: "uint256",
							name: "duration",
							type: "uint256",
						},
						{
							internalType: "address",
							name: "createdBy",
							type: "address",
						},
						{
							internalType: "address[]",
							name: "candidateAddr",
							type: "address[]",
						},
					],
					internalType: "struct DVote.VoteEvent",
					name: "",
					type: "tuple",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "voteEvntId",
					type: "uint256",
				},
			],
			name: "getVoteInfo",
			outputs: [
				{
					components: [
						{
							internalType: "uint256",
							name: "cndId",
							type: "uint256",
						},
						{
							internalType: "uint256",
							name: "voteCount",
							type: "uint256",
						},
						{
							internalType: "string",
							name: "name",
							type: "string",
						},
						{
							internalType: "uint256",
							name: "partyId",
							type: "uint256",
						},
						{
							internalType: "string",
							name: "partyName",
							type: "string",
						},
					],
					internalType: "struct DVote.VoteInfo[]",
					name: "",
					type: "tuple[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "cndId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "voteEvntId",
					type: "uint256",
				},
			],
			name: "getVoterCount",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "addr",
					type: "address",
				},
			],
			name: "isAdmin",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "voterId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "voteEvntId",
					type: "uint256",
				},
			],
			name: "isCandidateExist",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "voteEvntId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "cndId",
					type: "uint256",
				},
			],
			name: "isCndExist",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "PartyMap",
			outputs: [
				{
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
				{
					internalType: "string",
					name: "name",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "VoteEventMap",
			outputs: [
				{
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
				{
					internalType: "string",
					name: "name",
					type: "string",
				},
				{
					internalType: "uint256",
					name: "startDate",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "duration",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "createdBy",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "VoterMap",
			outputs: [
				{
					internalType: "uint256",
					name: "voterId",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "addr",
					type: "address",
				},
				{
					internalType: "string",
					name: "name",
					type: "string",
				},
				{
					internalType: "address",
					name: "registerBy",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
	],
};

export default contractDetail;
