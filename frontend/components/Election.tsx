import Image from 'next/image'
import React from 'react'
import electionJPG from "../assets/election.jpeg";

interface Election {
  key: number;
  election: any;
  setOpenRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
  setVoteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Election = ({ key, election, setOpenRegisterModal, setVoteModal }: Election) => {

  const vote = () => {

  }

  return (
    <div key={key} className="card max-w-sm bg-base-100 flex-1 shadow-xl image-full">
      <figure>
        <Image src={electionJPG} className="w-full" alt="Election" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{election.name}</h2>
        <p>{election.description}</p>
        <span>{election?.candidates?.length}{" "}{"Candidates"}</span>
        <span>{election?.validVotes?.length ?? "No"}{" "}{"Voters"}</span>
        <div className="card-actions flex">
          <button className="bt rounded-md border-transparent p-2 border text-black border-[#cdcfde] bg-[#cdcfde] hoverBtn hover:text-white" onClick={() => setOpenRegisterModal(true)}>Register</button>
          <button onClick={() => setVoteModal(true)} className="bt rounded-md border-transparent p-2 border text-black border-[#cdcfde] bg-[#cdcfde] hoverBtn hover:text-white">Vote</button>
        </div>
      </div>
    </div>
  )
}

export default Election