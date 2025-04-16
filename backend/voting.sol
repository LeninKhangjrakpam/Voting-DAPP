// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.7.6;

pragma abicoder v2;

contract DVote {
    struct Voter {
        uint voterId;
        address addr;
        string name;
        address registerBy;
    }

    struct Candidate {
        uint id;
        uint voterId;
        address addr;
        uint partyId;
    }

    struct VoteEvent {
        uint id;
        uint startDate;
        uint duration;
        address createdBy;
        address[] candidateAddr;
    }

    struct Party {
        uint id;
        string name;
    }

    mapping(uint => Voter) public VoterMap;
    mapping(uint => Party) public PartyMap;
    mapping(uint => VoteEvent) public VoteEventMap;

    mapping(uint => Candidate[]) public CandidateMap;   // VoteEvent => Candidate[]
    mapping(uint => mapping(uint => uint[])) public EvntCndVtr; // VoteEvent => (CandidateId => VoterId[])

    uint voterCount =  0;
    uint voteEventCount  = 0;
    uint partyCount = 0;

    address[] adminAddrs;

    constructor() {
        adminAddrs.push(msg.sender);
    }

    function isAdmin(address addr) public view returns(bool) {
        for(uint i= 0; i < adminAddrs.length; i++) {
            if (adminAddrs[i] == addr) {
                return true;
            }
        }
        return false;
    }

    function addAdmin(address addr) public {
        require(isAdmin(msg.sender), "admin can be add by admin user only");
        adminAddrs.push(addr);
    }

    function registerVoter(address addr, string memory name) public {
        require(isAdmin(msg.sender), "voter can be add only by admin");

        Voter memory v = Voter({
            voterId: voterCount + 1,
            addr: addr,
            name: name,
            registerBy: msg.sender
        });
        
        VoterMap[voterCount + 1] = v;
        voterCount++;
        
    }

    function isVoterExist(uint voterId) private view returns (bool) {
        return VoterMap[voterId].voterId != 0;
    }
    function isVoteEvntExist(uint voteEventId) private view returns (bool) {
        return VoteEventMap[voteEventId].id != 0;
    }
    function isPartyExist(uint partyId) private view returns (bool) {
        return PartyMap[partyId].id != 0;
    }

    function createParty(string memory partyName) public {
        for(uint i = 0; i < partyCount; i++) {
            if (keccak256(bytes(PartyMap[i + 1].name)) == keccak256(bytes(partyName))) {
                revert("new party cannot be created with same name as existing party name");
            }
        }
        Party memory p = Party({
            id: partyCount + 1,
            name: partyName
        });

        PartyMap[partyCount + 1] = p;
        partyCount++;
    }

    function createVoteEvnt(uint startDate, uint duration) public  {
        require(isAdmin(msg.sender), "admin can only create vote event");

        address[] memory cd;

        VoteEvent memory ve = VoteEvent({
            id: voteEventCount + 1,
            startDate: startDate,
            duration: duration,
            candidateAddr: cd,
            createdBy: msg.sender
        });

        VoteEventMap[voteEventCount + 1] = ve;
        voteEventCount++;
    }

    function isCandidateExist(uint voterId, uint voteEvntId) public view returns(bool) {
        for(uint i = 0; i < CandidateMap[voteEvntId].length; i++) {
            if (CandidateMap[voteEvntId][i].voterId == voterId) {
                return true;
            }
        }
        return false;
    }

    function registerCandidate(uint voterId, uint voteEvntId, uint partyId) public  {
        require(isVoterExist(voterId) == true, "Voter doesn't exist");
        require(isVoteEvntExist(voteEvntId) == true, "candidate cannot register for non-existing vote evnt");
        require(VoteEventMap[voteEvntId].startDate  > block.timestamp, "candidate cannotregister voting already started");
        require(isPartyExist(partyId) == true, "candidate cannot registrer for non existing party");
        require(isCandidateExist(voterId, voteEvntId) == false ,"candidate has already register for this vote event");

        address addr = VoterMap[voterId].addr;
        uint candCount = VoteEventMap[voteEvntId].candidateAddr.length;

        Candidate memory cd = Candidate({
            id: candCount + 1,
            voterId: voterId,
            addr: addr,
            partyId: partyId
        });

        VoteEventMap[voteEvntId].candidateAddr.push(addr);
        CandidateMap[voteEvntId].push(cd);
        // EvntCndVtr[voteEvntId] = new mapping(uint => uint[]);
        EvntCndVtr[voteEvntId][voterId] = new uint[](0);
    }

    function isCndExist(uint voteEvntId, uint cndId) public view returns(bool) {
        for(uint i = 0; i < CandidateMap[voteEvntId].length; i++) {
            if (CandidateMap[voteEvntId][i].id == cndId) {
                return true;
            }
        }
        return false;
    }

    // If a voter already voted, removed it from poll, otherwise do nothing
    function voterRemove(uint voterId, uint voteEvnt) public {
        for (uint i = 0; i < CandidateMap[voteEvnt].length; i++) {
            uint cdId = CandidateMap[voteEvnt][i].voterId;
            uint len = EvntCndVtr[voteEvnt][cdId].length;
            for(uint j = 0; j < len; j++) {
                if (EvntCndVtr[voteEvnt][cdId][j] == voterId) {
                    // remove elm from array
                    EvntCndVtr[voteEvnt][cdId][j] = EvntCndVtr[voteEvnt][cdId][len- 1];
                    EvntCndVtr[voteEvnt][cdId].pop();
                    return;
                }
            }
        }
    }

    function getCndVId(uint cndId, uint voteEvnt) public view returns(uint) {
        Candidate[] memory c = CandidateMap[voteEvnt];
        for(uint i = 0; i < c.length; i++) {
            if (c[i].id == cndId) {
                return c[i].voterId;
            }
        }
        return 0;
    }

    function poll(uint voterId, uint cndId, uint voteEvntId) public  {
        require(isVoterExist(voterId) == true, "Voter doesn't exist");
        require(isVoteEvntExist(voteEvntId) == true, "votercannot vote for non existing vote event");
        require(isCndExist(voteEvntId, cndId) == true, "candidate doesnt exist in given voteEvent");
        // Check Vote isnt over yet
        require(VoteEventMap[voteEvntId].startDate + VoteEventMap[voteEvntId].duration  > block.timestamp, "voter cannot vote after vote event end");
        // Check voter already voted
        voterRemove(voterId, voteEvntId);
        // Poll Vote
        uint cdVId = getCndVId(cndId, voteEvntId);
        require(cdVId != 0, "candidate voterid cannot be 0");

        EvntCndVtr[voteEvntId][cdVId].push(voterId);

    }

    function getVoterCount(uint cndId, uint voteEvntId) public view returns (uint) {
        // Return voter count for a give cndId
        require(isVoteEvntExist(voteEvntId) == true, "votercannot vote for non existing vote event");
        require(isCndExist(voteEvntId, cndId) == true, "candidate doesnt exist in given voteEvent");

        return EvntCndVtr[voteEvntId][cndId].length;
    }

    struct VoteInfo {
        uint cndId;
        uint voteCount;
    }
    function getVoteInfo(uint voteEvntId) public view returns(VoteInfo[] memory){
        // Check voteEvnt exist
        require(isVoteEvntExist(voteEvntId) == true, "voteEvnt Id doesnt exist");

        uint len = CandidateMap[voteEvntId].length;
        VoteInfo[] memory vi = new VoteInfo[](len);
        for(uint i = 0; i < len; i++) {
            // Loop through all candidates
            uint cndId = CandidateMap[voteEvntId][i].id;
            uint voteCount = EvntCndVtr[voteEvntId][cndId].length;
            vi[i] = VoteInfo({
                cndId: cndId,
                voteCount: voteCount
            });
            
        }
        return vi;
    }   
}

