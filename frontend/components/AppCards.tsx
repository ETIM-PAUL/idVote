import React from "react";
import { app_cards } from "../utils/constant";
import Link from "next/link";
import Image from "next/image";

const AppCards = () => {
  return (
    <div id="apps" className="app_cards_bg sm:py-10 px-6 sm:px-16 py-4">
      <div className="flex flex-wrap justify-center gap-20 text-white">
        {app_cards.map((card, index) => (
          <div
            key={index}
            className="p-4 py-10 w-3/4 flex flex-col gap-5 bg-card-blue border border-white text-center rounded-[36px] max-w-[400px] "
          >
            <h3 className="text-xl sm:text-2xl block text-center">
              {card?.name}
            </h3>
            <p className="text-base grotesk font-normal leading-[25.5px] tracking-[0.085px] px-6 mt-4">
              {card.content}
            </p>
            <div className="w-9/12 mx-auto my-5">
              <Image src={card.img} alt="hero_img" className="" />
            </div>
            <Link href={`${card?.href}`}>
              <button className="bg-[#CDCFDE] inline-fle py-4 px-9 rounded-2xl justify-center mx-auto text-black">
                {card?.cta}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppCards;
