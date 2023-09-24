import DashBoardLayout from "@/components/Layouts/DashboardLayout";
import { useAccount } from "wagmi";

const IDMS = () => {
  const { address } = useAccount();

  return <DashBoardLayout>IDMS</DashBoardLayout>;
};

export default IDMS;
