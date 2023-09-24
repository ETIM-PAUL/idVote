import Image from "next/image";

const FlowCard = ({ image, title, content }) => (
  <div className="block text-white side min-w-[340px] w-[382px] w-full h-[200px] rounded-[20px]">
    <Image src={image} alt="user_photo" className="w-12 object-cover" />
    <div className="grid  font-bold tracking-[0.156px]">
      <span className="text-2xl sm:text-lg my-5">{title}</span>
      <p className="text-xs gotesk font-normal tracking-[0.085] min-w-[300px]">
        {content}
      </p>
    </div>
  </div>
);

export default FlowCard;
