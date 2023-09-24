import React, { useState } from 'react'
// import AppHeadNav  from '../components/AppNav'
import Image from 'next/image'
import electionJPG from "../assets/election.jpeg";
import DashBoardLayout from "@/components/Layouts/DashboardLayout";

const votingSystem = () => {
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
    }
  ]

  const [openRegisterModal, setOpenRegisterModal] = useState(false)

  return (
    <DashBoardLayout>
      <div className="my-20">
        <div className="mb-8">
          <span className="text-3xl text-center w-full block">Elections</span>
        </div>

        <div className="py-2 sm:py-5 sm:px-16 px-4">
          <div className="flex gap-6">
            {elections.map((election) => (
              <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure>
                  <Image src={electionJPG} className="w-full" alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{election.name}</h2>
                  <p>{election.description}</p>
                  <div className="card-actions flex">
                    <button className="btn btn-primary" onClick={() => setOpenRegisterModal(true)}>Register</button>
                    <button className="btn btn-primary">Vote</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {openRegisterModal &&
          <>
            <input type="checkbox" checked={true} id="my_modal_6" className="modal-toggle" /><div className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">This will verify your identity on our IDMS!</p>
                <div className="modal-action flex">
                  <label htmlFor="my_modal_6" className="btn" onClick={() => setOpenRegisterModal(false)}>Cancel</label>
                  <label htmlFor="my_modal_6" className="btn">Proceed</label>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </DashBoardLayout>
  );
}

export default votingSystem;