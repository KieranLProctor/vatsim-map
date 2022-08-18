import axios from 'axios';
import type { NextApiResponse } from 'next';

const handler = async (res: NextApiResponse) => {
  await axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_VATSIM_ROOT_URL}/v3/vatsim-data.json`,
    })
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

export default handler;
