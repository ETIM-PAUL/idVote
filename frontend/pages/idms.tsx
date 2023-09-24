import DashBoardLayout from "@/components/Layouts/DashboardLayout";
import Image from "next/image";
import iDReg from "@/assets/login/amico.svg";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { ChangeEventHandler, useMemo, useState } from "react";
import idms from "@/ABI/idms";
import MoonLoader from "react-spinners/MoonLoader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

// string memory _name,
// uint256 _dateOfBirth,
// uint256 _nationalID,
// string memory _phrase

const IDMS = () => {
  const { address } = useAccount();

  const schema = yup
    .object({
      name: yup.string().required().label("Full Name"),
      dob: yup.string().required().label("Date of Birth"),
      nationalID: yup
        .number()
        .required("National ID not specified")
        .label("National ID"),
      phrase: yup.string().required().label("Password"),
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
  const [passPhrase, setPassPhrase] = useState("");
  const [parsedDate, setParsedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const createUser = useContractWrite({
    address: "0xdb6dd400d81f48970c16b6a726439e5c13e59dc9",
    abi: idms.abi,
    functionName: "createUser",
    args: [
      getValues("name"),
      getValues("dob"),
      getValues("nationalID"),
      passPhrase,
    ],
    onError(err) {
      toast.error(`${err}`);
      setLoading(false);
    },
  });

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: createUser.data?.hash,
    onSuccess(data) {
      toast.success(`Election Added`);
      reset();
      setLoading(false);
    },
    onError(err) {
      toast.error(`${err}`);
      setLoading(false);
    },
  });

  const inputClass =
    "w-full py-2 px-6 rounded-lg bg-card-blue bg-opacity-50 border border-[#fff4] mt-2";

  const getLabel = (input: string): string => {
    switch (input) {
      case "name":
        return "Full Name";
      case "dob":
        return "Date Of Birth";
      case "nationalID":
        return "Country";
      case "phrase":
        return "Password";
      default:
        return "";
    }
  };

  const submit = async () => {
    setLoading(true);
    let hashPhrase: string;

    fetch("/api/hash", {
      method: "POST",
      body: JSON.stringify(getValues("phrase")),
    })
      .then((res) => res.json())
      .then(async (data) => {
        hashPhrase = data.hash;
        //   setParsedDate(() => parseDate(getValues("dob")));
        setPassPhrase(() => hashPhrase);
        createUser.write();
      });
  };

  const parseDate = (date: string): string => {
    const _date = new Date(date);
    console.log(_date);
    return _date.toString();
  };

  return (
    <DashBoardLayout>
      <div className="md:px-8 flex gap-10 justify-center items-center flex-col md:flex-row relative lg:px-16 max-w-6xl mx-auto">
        <Image
          src={iDReg}
          alt="Illustration of man with a key in fr"
          className="w-1/2 xl:w-[40%]"
        />

        <form
          onSubmit={handleSubmit(submit)}
          className="artboard-demo w-full md:w-1/2  xl:w-[60%] bg-light-morph text-white p-8"
        >
          <h2 className="font-mono font-bold text-xl lg:text-2xl">
            Register Identity
          </h2>
          <div className="w-full">
            {[
              ["name", "dob"],
              ["nationalID", "phrase"],
            ].map((row, i) => (
              <div className="flex md:flex-col lg:flex-row gap-8 my-6" key={i}>
                {row.map((inp) => {
                  const _input = inp as
                    | "name"
                    | "dob"
                    | "nationalID"
                    | "phrase";

                  return (
                    <label htmlFor={_input} className="w-full" key={_input}>
                      {getLabel(_input)}
                      <br />
                      <input
                        type={
                          _input == "phrase"
                            ? "password"
                            : // : _input == "dob"? "date"
                              "text"
                        }
                        id={_input}
                        className={`${inputClass} ${
                          errors[_input]?.message && "border-red-400"
                        }`}
                        {...register(_input)}
                      />
                      <p className="text-red-500 text-xs italic pt-1">
                        {errors[_input]?.message}
                      </p>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="md:my-4 btn bg-light px-8 py-2 h-max text-lg text-card-blue hover:text-light w-max"
            disabled={isLoading}
          >
            <MoonLoader size={20} loading={loading} className="it" />
            <span>{loading ? "Registering" : "Register"}</span>
          </button>
        </form>
      </div>
    </DashBoardLayout>
  );
};

export default IDMS;
// function dispatch(arg0: {type: string;}) {
//    throw new Error("Function not implemented.");
// }
