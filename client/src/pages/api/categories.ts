import type { NextApiRequest, NextApiResponse } from 'next';

type Category = {
  id: number;
  name: string;
};

let categories: Category[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(categories);
  } else if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const newCategory = { id: categories.length + 1, name };
    categories.push(newCategory);
    res.status(201).json(newCategory);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
