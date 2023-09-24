import React from "react";
import Social from "./Social";
import discord from "../assets/discord.svg";
import github from "../assets/github.svg";
import twitter from "../assets/twitter.svg";

const Footer = () => {
  return (
    <div className="py-8 px-6 sm:px-16 bg-[#02051F]">
      <div>
        <h2 className="text-[#F5F6FF] text-3xl uppercase geostar_font">
          IDVOTE
        </h2>
        <div className="sm:flex justify-between items-start text-[#C5CBFD] w-full ">
          <div className="w-full sm:w-[50%] pt-5 sm:py-10">
            <span className="grotesk block max-w-[350px]">
              Step into a new era of democracy identity, where Web3 technology
              ensures security.
            </span>
            <div className="sm:flex sm:space-x-4 items-center space-y-3 sm:space-y-0 mt-10">
              <Social name="Github" icon={github} />
              <Social name="Discord" icon={discord} />
              <Social name="Twitter" icon={twitter} />
            </div>
          </div>

          <div className="sm:flex sm:space-x-12 py-5 sm:py-10">
            <div className="block mb-3">
              <ul className="ont-normal text-xs tracking-[0.12px]">
                <li className="side text-base font-bold tracking-[1.4px] mb-3 sm:mb-5">
                  Register
                </li>
              </ul>
            </div>
            <div className="grid mb-4">
              <ul className="font-normal text-xs tracking-[0.12px]">
                <li className="side text-base font-bold tracking-[1.4px] mb-3 sm:mb-5">
                  Voting
                </li>
              </ul>
            </div>
            <div className="grid mb-3">
              <ul className="font-normal text-xs tracking-[0.12px]">
                <li className="side text-base font-bold tracking-[1.4px] mb-3 sm:mb-5">
                  About
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-6 sm:mt-24" />
      <div className="px-6 grotesk text-xs mt-2 text-[#C5CBFD] sm:flex justify-between">
        <div className="space-x-3 block text-center sm:text-start w-full my-3">
          <span className="pb-2">Privacy Policy</span>
          <span className="pb-2">Terms of Use</span>
        </div>
        <p className=" block text-center sm:text-end w-full mt-2">
          &copy; 2023 <span className="pl-2"> All rights reserved</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
