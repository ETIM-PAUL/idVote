import React from "react";
import { glasses } from "../utils/constant";
import bolt from "../assets/bolt.png";
// import { ethereum } from "../assets";
import Image from "next/image";

const RowWords = () => {
  return (
    <div className="flex scrollbar-hide overflow-x-scroll glass_bg sm:bg-transparent overflow-y-hidden gap-8 flex-nowrap items-en justify-between mt-8 text-[#fefefe] sm:mt-10 px-6 sm:px-16 pt-4 sm:pt-0">
      {glasses?.map((card, index) => (
        <div
          key={index}
          className="class flex items-center w-6/12 gap-2 rounded-2xl py-3 px-6 min-w-[215px] text-center flex"
        >
          <Image
            src={bolt}
            alt={`chain_img + ${index}`}
            className="w-6 sm:w-3 h-12 sm:h-5"
          />
          {card}
        </div>
      ))}
    </div>
  );
};

export default RowWords;
