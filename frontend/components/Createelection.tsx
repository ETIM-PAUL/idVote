import { GlobalContext } from '@/globalContext'
import React, { useContext, useState } from 'react'
import { MoonLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TagsInput } from 'react-tag-input-component'
import votingSystemABI from '@/ABI/votingABI'

type Props = {}

const CreateElection = (props: Props) => {
  const [createLoading, setCreateLoading] = useState(false)
  const { state: { createElectionModal }, dispatch } = useContext(GlobalContext)
  const [candidates, setCandidates] = useState<string[]>([]);

  const schema = yup
    .object({
      name: yup.string().required().label("Election Name"),
      candidates: yup.string().notRequired().label("Election Candidates"),
      type: yup.number().required("Election type is required").label("Election Type"),
      description: yup.string().required().label("Election Description"),
    })
    .required();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: cwriteData, isLoading: cwriteLoading, write: cwriteWrite, isSuccess, isError: errorMessage } = useContractWrite({
    address: "0xA100d72A7F214D669AC3deCEb07E6b35C001fE7F",
    //@ts-ignore
    abi: votingSystemABI?.abi,
    functionName: 'CreateElection',
    args: [getValues("name"), getValues("description"), candidates, getValues("type") ?? 0]
  })

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: cwriteData?.hash,
    onSuccess(data) {
      toast.success(`Election Added`);
      dispatch({
        type: "CLOSE_CREATE_ELECTION_MODAL",
      })
      reset();
    },
  })

  const onSubmit = (data: any) => {
    setCreateLoading(true)
    if (data?.type === null || data?.type === undefined) {
      setError("type", {
        type: "manual",
        message: "Election Category is required"
      });
      return;
    }
    if (candidates.length === 0) {
      setError("candidates", {
        type: "manual",
        message: "Candidates must at least exceed 2"
      });
      return;
    }
    try {
      const result = cwriteWrite()
    } catch (error) {
      console.log(error)
    }
    setCreateLoading(false)

  }

  return (
    <div>
      {createElectionModal &&
        <>
          <input type="checkbox" checked={true} id="my_modal_6" className="modal-toggle" /><div className="modal">
            <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">This will create your Election Poll with valid candidates!</p>

              <div>
                <div className="inline-grid w-full mb-4 sm:mb-6">
                  <label className='text-sm mb-3'>Name</label>
                  <input {...register("name")} type="text" placeholder="What is your Election Name" className="input border border-solid border-[white] rounded-sm bg-[rgba(255, 255, 255, 0.03)] shadow-[0px_4px_0px_rgba(0,0,0,0.25)]" />
                  <p className="text-red-500 text-xs italic pt-1">{errors.name?.message}</p>
                </div>

                <div className="inline-grid w-full mb-4 sm:mb-6">
                  <label className='text-sm mb-3'>Description</label>
                  <input {...register("description")} type="text" max={100} placeholder="Give a description of your Election" className="input border border-solid border-[white] rounded-sm bg-[rgba(255, 255, 255, 0.03)] shadow-[0px_4px_0px_rgba(0,0,0,0.25)]" />
                  <p className="text-red-500 text-xs italic pt-1">{errors.description?.message}</p>
                </div>

                <div className="inline-grid w-full mb-4 sm:mb-6">
                  <label className='text-sm mb-3'>Description</label>
                  <select  {...register("type")} className="select select-bordered  border border-solid border-[white] rounded-sm bg-[rgba(255, 255, 255, 0.03)] shadow-[0px_4px_0px_rgba(0,0,0,0.25)]">
                    <option value={undefined} disabled selected>Choose category?</option>
                    <option value={0}>Presidential</option>
                    <option value={1}>State</option>
                    <option value={2}>Local</option>
                  </select>
                  <p className="text-red-500 text-xs italic pt-1">{errors.type?.message}</p>
                </div>

                <div className="inline-grid w-full mb-4 sm:mb-6">
                  <label className='text-sm mb-3'>Candidates</label>
                  <TagsInput
                    value={candidates}
                    onChange={setCandidates}
                    classNames={{ tag: 'border rounded-sm bg-[#cdcfde] p-2', input: 'border rounded-md p-3' }}
                    name="candidates"
                    placeHolder="Enter Candidates"
                  />
                  <p className="text-red-500 text-xs italic pt-1">{errors.candidates?.message}</p>
                </div>

              </div>

              <div className="modal-action flex">
                <button className="btn" disabled={createLoading} onClick={() => dispatch({ type: "CLOSE_CREATE_ELECTION_MODAL" })}>Cancel</button>
                {createLoading ?
                  <button className='btn-border bg-[#cdcfde] px-8 rounded w-full flex justify-center items-center w-[220px] mx-auto gap-4'>
                    <MoonLoader size={20} className='it' />
                    <span>Creating</span>
                  </button>
                  :
                  <div className='capitalized'>
                    <button disabled={createLoading} type="submit" className={"btn bg-[#cdcfde] px-8 rounded w-full"}>
                      Proceed
                    </button>
                  </div>

                }
                {/* <label htmlFor="my_modal_6" className="btn">Proceed</label> */}
              </div>
            </form>
          </div>
        </>
      }
    </div>
  )
}

export default CreateElection;