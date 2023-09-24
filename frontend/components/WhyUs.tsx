import React from "react";
import { why_us } from "../utils/constant";
// import FlowCard from "./Flow";
import Link from "next/link";
import Image from "next/image";

const WhyUs = () => {
  return (
    <div id="apps" className="app_cards_bg sm:py-10 px-6 sm:px-16 py-4">
      <div className="text-white">
        <h3
          className="text-center leading-normal mb-16 sm:text-start block font-normal tracing-[-0.128px] text-[#CDCFDE] sm:text-[48px] text-[32px]"
          style={{ textAlign: "center" }}
        >
          Why Vote With Us
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-20 text-white">
        {why_us.map((why, index) => (
          <div
            key={index}
            className="p-4 py-12 flex flex-col gap-5 border border-white text-center rounded-[36px] max-w-[400px] "
          >
            <h3 className="text-xl sm:text-3xl block text-center">
              {why?.title}
            </h3>
            <p className="text-xl sm:text-xl grotesk font-normal leading-[25.5px] sm:leading-10 tracking-[0.085px] px-6 mt-4">
              {why.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
