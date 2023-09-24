// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;
import "../VotingSystem.sol"; // Update the import path to match your contract location

interface IVotingSystem {
    function registerVoter(bytes12 hashedKey, uint _electionId) external;

    function Vote(uint _electionId, uint _candidateId) external;

    function CreateElection(
        string memory _electionName,
        address[] memory _candidates
    ) external;

    function startElection(uint _electionId) external;

    function endElection(uint _electionId) external;

    function getTotalVote(
        uint _electionId
    ) external view returns (VotingSystem.ElectionDetails[] memory);
}
