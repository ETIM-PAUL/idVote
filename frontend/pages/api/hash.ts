import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  hash: string;
};

export default function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    const rawHash = req.body;
    hashPass(rawHash).then(hash => res.status(200).json({hash}))
  }
}

const hashPass = (rawPass: string) =>
  bcrypt.hash(rawPass, 10).then((hash) => hash);
