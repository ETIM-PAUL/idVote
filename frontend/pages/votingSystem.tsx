import React, { useEffect, useState } from "react";
// import AppHeadNav  from '../components/AppNav'
import Image from "next/image";
import electionJPG from "../assets/election.jpeg";
import votingSystem from "../ABI/votingABI";
import DashBoardLayout from "@/components/Layouts/DashboardLayout";
import { MoonLoader } from "react-spinners";
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { toast } from "react-toastify";
import CreateElection from "@/components/Createelection";

const votingSystemApp = () => {
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
  const [registerLoading, setRegisterLoading] = useState(false);
  const [allElections, setElections] = useState([]);

  const register = () => {
    setRegisterLoading(true);
    try {
    } catch (error) {
      console.log(error);
    }
    setRegisterLoading(false);
  };

  // const { data, isError, isLoading } = useCon({
  //   address: '0xA100d72A7F214D669AC3deCEb07E6b35C001fE7F',
  //   abi: votingSystem.abi,
  //   functionName: 'CreateElection',
  // })

  return (
    <DashBoardLayout>
      <div className="mb-8">
        <span className="text-3xl text-center w-full block">Elections</span>
      </div>

      <div className="py-2 sm:py-5 sm:px-16 px-4">
        <div className="flex flex-wrap gap-6">
          {elections.map((election, index) => (
            <div
              key={index}
              className="card max-w-sm bg-base-100 flex-1 shadow-xl image-full"
            >
              <figure>
                <Image src={electionJPG} className="w-full" alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{election.name}</h2>
                <p>{election.description}</p>
                <div className="card-actions flex">
                  <button
                    className="bt rounded-md border-transparent p-2 border text-black border-[#cdcfde] bg-[#cdcfde] hoverBtn hover:text-white"
                    onClick={() => setOpenRegisterModal(true)}
                  >
                    Register
                  </button>
                  <button className="bt rounded-md border-transparent p-2 border text-black border-[#cdcfde] bg-[#cdcfde] hoverBtn hover:text-white">
                    Vote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateElection />

      {openRegisterModal && (
        <>
          <input
            type="checkbox"
            checked={true}
            id="my_modal_6"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                This will verify your identity on our IDMS!
              </p>
              <div className="modal-action flex">
                <button
                  className="btn"
                  disabled={registerLoading}
                  onClick={() => setOpenRegisterModal(false)}
                >
                  Cancel
                </button>
                {registerLoading ? (
                  <button className="btn-border bg-[#cdcfde] px-8 rounded w-full flex justify-center items-center w-[220px] mx-auto gap-4">
                    <MoonLoader size={20} className="it" />
                    <span>Registering</span>
                  </button>
                ) : (
                  <div className="capitalized">
                    <button
                      onClick={() => register()}
                      type="submit"
                      className={"btn bg-[#cdcfde] px-8 rounded w-full"}
                    >
                      Proceed
                    </button>
                  </div>
                )}
                {/* <label htmlFor="my_modal_6" className="btn">Proceed</label> */}
              </div>
            </div>
          </div>
        </>
      )}
    </DashBoardLayout>
  );
};

export default votingSystemApp;
