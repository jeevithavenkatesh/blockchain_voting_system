// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/*
 Voting Smart Contract
 Stores candidates and votes securely
*/

contract Voting {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;

    uint public candidatesCount;

    constructor() {
        addCandidate("Candidate A");
        addCandidate("Candidate B");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;

        candidates[candidatesCount] = Candidate(
            candidatesCount,
            _name,
            0
        );
    }

    function vote(uint _candidateId) public {

        require(!voters[msg.sender],
        "Already voted");

        require(
            _candidateId > 0 &&
            _candidateId <= candidatesCount,
            "Invalid candidate"
        );

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount++;
    }
}