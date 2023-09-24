import DashBoardLayout from "@/components/Layouts/DashboardLayout";
import Image from "next/image";
import iDReg from "@/assets/login/amico.svg";
import { useAccount, useContractWrite } from "wagmi";
import { ChangeEventHandler, useState } from "react";


// string memory _name,
// uint256 _dateOfBirth,
// uint256 _nationalID,
// string memory _phrase

const IDMS = () => {
  const { address } = useAccount();
  const [userInput, setUserInput] = useState({
    name: "",
    dob: "",
    nationalID: "",
    phrase: "",
  });
  const inputClass =
    "w-full p-6 rounded-lg bg-card-blue bg-opacity-50 border border-[#fff4] mt-2";

   // const writer = useContractWrite({
   //    address: 
   // })

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

  const handleInputUpdate: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let hashPhrase;
    fetch("/api/hash", {
      method: "POST",
      body: JSON.stringify(userInput.phrase),
    })
      .then((res) => res.json())
      .then((data) => {
        hashPhrase = data.hash;

        const userInfo = {
          ...userInput,
          phrase: hashPhrase,
        };
      });
  };

  return (
    <DashBoardLayout>
      <div className="flex gap-10 justify-center">
        <Image
          src={iDReg}
          alt="Illustration of man with a key in fr"
          className="w-full sm:w-[40%]"
        />
        <div className="artboard-demo w-[60%] bg-light-morph text-white p-8">
          <h2 className="font-mono font-bold text-[40px]">Register Identity</h2>
          <div className="w-full">
            {[
              ["name", "dob"],
              ["nationalID", "phrase"],
            ].map((row, i) => (
              <div className="flex gap-8 my-6" key={i}>
                {row.map((input) => {
                  const _input = input as
                    | "name"
                    | "dob"
                    | "nationalID"
                    | "phrase";

                  return (
                    <label
                      htmlFor={input}
                      className="w-full text-2xl"
                      key={input}
                    >
                      {getLabel(input)}
                      <br />
                      <input
                        type={input == "phrase" ? "password" : "text"}
                        name={input}
                        id={input}
                        className={inputClass}
                        value={userInput[_input]}
                        onChange={handleInputUpdate}
                      />
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="my-4 btn bg-light px-8 py-4 h-max text-lg text-card-blue hover:text-light w-max"
          >
            Register
          </button>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default IDMS;
