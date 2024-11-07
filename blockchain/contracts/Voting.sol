// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";



contract Voting {
    bool public votingStarted = false;
    string public candidate1;
    string public candidate2;

    uint public votesCandidate1= 0;
    uint public votesCandidate2 = 0;

    event VotingStarted(string candidate1, string candidate2);

    event Voted(string candidate);

    event VotingEnded();


    constructor() {
    }

    function start_voting(string memory c1, string memory c2) public {
        require(!votingStarted, "Voting has already started");
        votingStarted = true;
        candidate1 = c1;
        candidate2 = c2;
        votesCandidate1 = 0;
        votesCandidate2 = 0;

        emit VotingStarted(c1, c2);
    }

    function vote(string memory candidate) public {
        require(keccak256(abi.encodePacked(candidate)) == keccak256(abi.encodePacked(candidate1)) || keccak256(abi.encodePacked(candidate)) == keccak256(abi.encodePacked(candidate2)), "Invalid candidate");
        require(votingStarted, "Voting has not started");
        if (keccak256(abi.encodePacked(candidate)) == keccak256(abi.encodePacked(candidate1))) {
            votesCandidate1++;
        } else {
            votesCandidate2++;
        }
        emit Voted(candidate);
    }

    function endVoting() public {
        require(votingStarted, "Voting has not started");
        votingStarted = false;
        emit VotingEnded();
    }

    function declareWinner() public view returns (string memory) {
        console.log(votesCandidate1);
        console.log(votesCandidate2);
        if (votesCandidate1 > votesCandidate2) {
            return candidate1;
        } else if (votesCandidate1 == votesCandidate2) {
            return "Tie!";
        }
        else {
            return candidate2;
        }
        }

    }