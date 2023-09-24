import React from 'react'
// import AppHeadNav  from '../components/AppNav'
import Image from 'next/image'
import electionJPG from "../assets/election.jpeg";
import dynamic from 'next/dynamic';
const AppNoSSR = dynamic(() => import('../components/AppNav'), { ssr: false });

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


  return (
    <div className='bgCol min-h-screen'>
      <AppNoSSR />

      <div className="my-20">
        <div className='mb-8'>
          <span className="text-3xl text-center w-full block">Elections</span>
        </div>

        <div className="py-2 sm:py-5 sm:px-16 px-4">
          <div className='flex gap-6'>
            {elections.map((election) => (
              <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure><Image src={electionJPG} className='w-full' alt="Shoes" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{election.name}</h2>
                  <p>{election.description}</p>
                  <div className="card-actions flex">
                    <button className="btn btn-primary">Register</button>
                    <button className="btn btn-primary">Vote</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* <button className="btn" onClick={() => document?.getElementById('my_modal_1').showModal()}>open modal</button> */}
        <div id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default votingSystem;