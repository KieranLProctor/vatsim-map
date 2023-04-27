import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  await axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_SIMAWARE_ROOT_URL}/api/livedata/firs.json`,
    })
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

export default handler;
