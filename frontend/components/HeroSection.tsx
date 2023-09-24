import Image from "next/image";
import React from "react";
import vote from "../assets/vote.png";
import RowWords from "@/components/RowWords";

const HeroSection = () => {
  return (
    <div className="hero_bg py-10 sm:py-16">
      <div className="md:flex items-start justify-between px-6 sm:px-16 grid">
        <div className="md:w-[60%] w-full">
          <h3 className="leading-normal text-center sm:text-start block font-normal tracing-[-0.128px] text-[#CDCFDE] sm:text-[64px] text-[48px]">
            Empowering <span className="fin_bg">Secure, Transparent</span>{" "}
            <span>with</span> <span className="base_bg">Web3</span>
          </h3>
          <span className="text-base sm:text-2xl sm:text-start text-center mt-5 sm:mt-10 text-[#CDCFDE] tracking-[0.08px] max-w-[640px] block">
            Step into a new era of democractic identity, where Web3 technology
            ensures security, transparency, and decentralization, giving power
            back to the people and amplifying their voices.
          </span>
        </div>
        <div className="md:w-[40%] w-full md:mt-0 mt-10 flex md:justify-end">
          <Image src={vote} alt="hero_img" className="" />
        </div>
      </div>
      <RowWords />
    </div>
  );
};

export default HeroSection;
