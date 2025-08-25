import type { NextApiRequest, NextApiResponse } from "next";
import getOrCreateDB from "../../models/server/dbSetup";
import getOrCreateStorage from "../../models/server/storageSetup";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await getOrCreateDB();
    await getOrCreateStorage();
    res.status(200).json({ message: "Setup complete" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
