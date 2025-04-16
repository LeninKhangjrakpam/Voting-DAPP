import Web3 from "web3";

const createContract = ({ ganacheEndPoint, contractAddr, contractABI }) => {
	const provider = new Web3.providers.HttpProvider(ganacheEndPoint);
	const web3WithGanace = new Web3(provider);

	const myContract = new web3WithGanace.eth.Contract(contractABI, contractAddr);
	return myContract;
};

export { createContract };
