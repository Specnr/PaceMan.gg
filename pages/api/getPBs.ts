import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uuids } = req.query;

  if (!uuids) {
    return res.status(400).json({ error: 'Missing uuids parameter' });
  }

  try {
    const response = await fetch(`https://paceman.gg/stats/api/getPBs/?uuids=${uuids}`);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching PB data:', error);
    return res.status(500).json({ error: 'Failed to fetch PB data' });
  }
} 