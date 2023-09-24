// SPDX-License-Identifier: MIT

pragma solidity 0.8.21;

import {IIdentityDatabaseManagementSystem} from "./interface/IIdentityDatabaseManagementSystem.sol";

contract VotingSystem {
    mapping(address => bytes12) private voterKey;
    mapping(bytes12 => bool) isValidKey;
    mapping(bytes12 _key => mapping(uint _electionId => bool))
        private electionValidVoters;

    mapping(uint electionId => mapping(address _candidate => uint)) candidateVotes;
    mapping(bytes12 _key => mapping(uint _electionId => bool)) private hasVoted;

    mapping(uint => Election) elections;

    uint electionId;

    enum ElectionStatus {
        nonExistent,
        running,
        inactive,
        ended
    }

    struct Election {
        string name;
        string description;
        address admin;
        address[] candidates;
        ElectionStatus status;
        bytes12[] validVoters;
    }

    struct ElectionDetails {
        address candidate;
        uint voteCounts;
    }

    IIdentityDatabaseManagementSystem iDMS;

    //a customized error check for invalid address, when adding candidates
    error InvalidAddress(uint position);

    event VoterRegistered(address _voter, uint _electionId);
    event UserVoted(address _voter, uint _electionId);

    constructor(address _idms) {
        iDMS = IIdentityDatabaseManagementSystem(_idms);
    }

    function registerVoter(bytes12 hashedKey, uint _electionId) external {
        require(iDMS.verifyKey(hashedKey, msg.sender), "Not a verified user");
        Election storage election = elections[_electionId];
        require(
            election.status == ElectionStatus.inactive,
            "Election doesn't Exist or currently running"
        );
        require(
            !electionValidVoters[hashedKey][_electionId],
            "Already Registered to participate"
        );
        electionValidVoters[hashedKey][_electionId] = true;
        voterKey[msg.sender] = hashedKey;

        election.validVoters.push(hashedKey);
        emit VoterRegistered(msg.sender, _electionId);
    }

    function Vote(uint _electionId, uint _candidateId) external {
        Election storage election = elections[_electionId];

        require(election.status == ElectionStatus.running, "Inactive Election");
        require(_candidateId < election.candidates.length, "Invalid Candidate");
        address _candidate = election.candidates[_candidateId];
        bytes12 userKey = voterKey[msg.sender];
        require(
            electionValidVoters[userKey][_electionId],
            "Not Allowed To Vote"
        );
        require(!hasVoted[userKey][_electionId], "Already Voted");

        hasVoted[userKey][_electionId] = true;
        candidateVotes[_electionId][_candidate]++;

        emit UserVoted(msg.sender, _electionId);
    }

    function CreateElection(
        string memory _electionName,
        string memory _electionDesc,
        address[] memory _candidates
    ) external {
        electionId++;
        Election storage election = elections[electionId];
        election.name = _electionName;
        election.description = _electionDesc;
        for (uint i = 0; i < _candidates.length; i++) {
            //checks to make sure that none of the addresses
            //is a zero address
            if (_candidates[i] == address(0)) {
                revert InvalidAddress(i + 1);
            }
        }
        election.candidates = _candidates;
        election.status = ElectionStatus.inactive;
        election.admin = msg.sender;
    }

    function startElection(uint _electionId) external {
        Election storage election = elections[_electionId];
        _OnlyAdmin(election.admin);
        require(
            election.status == ElectionStatus.inactive,
            "Election already Running or has Ended"
        );
        election.status = ElectionStatus.running;
    }

    function endElection(uint _electionId) external {
        Election storage election = elections[_electionId];
        _OnlyAdmin(election.admin);
        require(
            election.status == ElectionStatus.running,
            "Election not running"
        );
        election.status = ElectionStatus.ended;
    }

    function _OnlyAdmin(address _admin) internal view {
        require(_admin == msg.sender, "Unauthorized Access");
    }

    function getTotalVote(
        uint _electionId
    ) external view returns (ElectionDetails[] memory) {
        Election memory election = elections[electionId];
        ElectionDetails[] memory _electionResults = new ElectionDetails[](
            election.candidates.length
        );

        for (uint i = 0; i < election.candidates.length; i++) {
            address _candidate = election.candidates[i];
            uint counts = candidateVotes[_electionId][_candidate];
            _electionResults[i] = (ElectionDetails(_candidate, counts));
        }

        return _electionResults;
    }
}
