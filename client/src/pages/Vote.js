import { useState } from "react";
import { ethers } from "ethers";
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "../contracts/VotingABI";

function Vote() {
  const [candidateId, setCandidateId] = useState("");

  const voteCandidate = async () => {
    try {
      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(
        window.ethereum
      );

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.vote(candidateId);

      await tx.wait();

      alert("Vote submitted successfully");
    } catch (err) {
      console.error(err);
      alert("Voting failed");
    }
  };

  return (
    <div>
      <h2>Vote</h2>

      <input
        type="number"
        placeholder="Candidate ID"
        value={candidateId}
        onChange={(e) =>
          setCandidateId(e.target.value)
        }
      />

      <button onClick={voteCandidate}>
        Vote
      </button>
    </div>
  );
}

export default Vote;