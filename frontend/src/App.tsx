import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import vote from './Voting.json';

function App() {
  const [candidate1, setCandidate1] = useState('');
  const [candidate2, setCandidate2] = useState('');
  const[votingStarted, setVotingStarted] = useState(false);
  const [winner, setWinner] = useState('');
  const [account, setCurrentAccount] = useState<string>("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const contractAddress = "0x6E6587b9751Dd8f0db64FcaddA228d362F635b8b";
  let signer;

  useEffect(() => {
    console.log("Updated winner:", winner);
  }, [winner]);

  const start_voting = () => {
    if (account === '') { 
      alert('Please connect to MetaMask');
      return;
    }

    if (candidate1 === '' || candidate2 === '') {
      alert('Please enter names for both candidates');
      return;
    }

    if (contract) {
      contract.start_voting(candidate1, candidate2);
    } else {
      alert('Contract is not defined');
      return;
    }
    console.log('Voting has started');
    setVotingStarted(true);
  }

  const voteForCandidate = (candidate: string) => {
    if (contract) {
      contract.vote(candidate);
    } else {
      console.error('Contract is not defined');
    }
    console.log('Voted for ' + candidate);
  }

  const declareWinner = async () => {
    if (contract) {
      try {
        const end = await contract.endVoting();
        await end.wait();
        console.log("Voting has ended:", end);
        const winnerName = await contract.declareWinner();
        const name = winnerName.toString();
        setWinner(name);
        console.log("Winner declared:", name);
        

      } 
      catch (error) {
        console.error("Error is" + error);
      }
    }
  };

  const onClickConnect = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }
  
    // Connect to MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      // Request account access
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) setCurrentAccount(accounts[0]);
  
      // Get the signer
      signer = provider.getSigner();
  
      // Create a new contract instance using the ABI and address from Foundry
      const contract = new ethers.Contract(contractAddress, vote.abi, signer);
      setContract(contract);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <div className="container">         
        <h1 className='text-center custom-header'> Voting App! </h1>
        {!votingStarted && (
          <>
        <p className='text-center'> Welcome to the voting app! <br /> To get started, please enter the names of Candidate 1 and Candidate 2 in your application below. Then, hit start to begin the vote! </p>
        <form className='d-flex justify-content-center gap-3 mb-4'>
        <input type='text' value={candidate1} placeholder="Candidate1" onChange={(e) => setCandidate1(e.target.value) } className="form-control rounded"  />
        <input type='text' value={candidate2} placeholder="Candidate2" onChange={(e) => setCandidate2(e.target.value)} className="form-control rounded"  />
        </form> 
          <button onClick={() => {start_voting()}}> Start Voting! </button>
          </>
        )}
        {votingStarted && (
          <>
        <div className='d-flex flex-column justify-content-center gap-3 space-y-4'>
        <h2 className='text-center mt-4'> Voting for {candidate1} and {candidate2} </h2>
        {winner == '' && (
          <>
        <div className='d-flex justify-content-center gap-3'>
        <button onClick={() => {voteForCandidate(candidate1)}}> Vote for {candidate1} </button>
        <button onClick={() => {voteForCandidate(candidate2)}}> Vote for {candidate2} </button>
        </div>
        <button onClick={declareWinner}> End Voting </button> 
        </>
        )} 
        {winner !== '' && (
          console.log("updaing winner", winner),
          <h3 className='text-center'>
          {winner !== "Tie" ? `Winner: ${winner}` : "It's a tie!"}
          </h3>
        )}
        </div>
        </> )} 

        <div className='d-flex justify-content-center gap-3 mt-4'>
        {account ? <p>Connected: {account}</p> : 
        <button onClick={onClickConnect}>Connect to MetaMask</button>}         
         </div>

        
      </div>
        
    </>
  )
}

export default App
