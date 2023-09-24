import React, { useEffect, useState } from "react";
import votingSystem from "../ABI/votingABI";
import DashBoardLayout from "@/components/Layouts/DashboardLayout";
import { MoonLoader } from "react-spinners";
import {
  Address,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import CreateElection from "@/components/Createelection";
import dynamic from "next/dynamic";
type Props = {};
interface IElection {
  name: string;
  description: string;
  admin: Address;
  candidates: Address[];
  status: number;
  electionType: number;
}

const ElectionNoSSR = dynamic(() => import("@/components/Election"), {
  ssr: false,
});

const MyElection = () => {
  const elections = [
    {
      name: "National Election",
      description: "Presidential election of the Nigerian Government",
      creator: "0x09927276",
      candidates: ["0x", "0x1", "0x2", "0x3", "0x4"],
      status: true,
    },
    {
      name: "State Election",
      description: "State election of the Ghanian Government",
      creator: "0x72388726",
      candidates: ["0x", "0x1", "0x2", "0x3", "0x4"],
      status: true,
    },
    {
      name: "Ministerial Election",
      description: "Ministerial election of the Mexican Government",
      creator: "0x7266276",
      candidates: ["0x", "0x1", "0x2", "0x3"],
      status: true,
    },
    {
      name: "National Election",
      description: "Presidential election of the Canadian Government",
      creator: "0x72889273",
      candidates: ["0x", "0x1", "0x2", "0x3", "0x4", "0x5"],
      status: true,
    },
  ];

  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openVoteModal, setVoteModal] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [allElections, setElections] = useState<IElection[]>([]);

  const register = () => {
    setRegisterLoading(true);
    try {
    } catch (error) {
      console.log(error);
    }
    setRegisterLoading(false);
  };
  const vote = () => {
    setVoteLoading(true);
    try {
    } catch (error) {
      console.log(error);
    }
    setVoteLoading(false);
  };

  const { data, isError, isLoading } = useContractRead({
    address: "0xA100d72A7F214D669AC3deCEb07E6b35C001fE7F",
    abi: votingSystem.abi,
    functionName: "getAllElections",
    onSuccess(data) {
      const electionData = data as unknown as IElection[];
      // User's address (you can replace this with the actual user's address)
      const userAddress = "0xC76F962e24F4345301296Bf111529047ec3cA96E";

      // Filter elections owned by the user
      const myElections = electionData.filter(
        (election) => election.admin === userAddress
      );

      setElections(myElections);
    },
  });

  return (
    <div className="mb-8 flex gap-10 ml-14 items-center justify-center">
      {/* <span className="text-3xl text-center">Elections</span>
      <button
        className="border bg-[#cdcfde] rounded-2xl p-4 p- mono_font text-black text-xl transition duration-200 hover:ease-in-out motion-reduce:transition-none md:px-2"
        data-te-nav-link-ref
        onClick={() => {
          // Display only the user's elections
          // setElections(myElections);
        }}
      >
        My Election(s)
      </button> */}
    </div>
  );
};

export default MyElection;
