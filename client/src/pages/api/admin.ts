import type { NextApiRequest, NextApiResponse } from 'next';

type Data = 
  | { success: boolean; data?: any }
  | { error: string };

const categories = ['Warcraft 3', 'Minecraft', 'Books', '3D', 'Other'];
const posts = [
  { id: 1, title: 'Первый пост' },
  { id: 2, title: 'Второй пост' },
];
const articles = [
  { id: 1, headline: 'Статья 1' },
  { id: 2, headline: 'Статья 2' },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query, body } = req;
  const resource = query.resource as string;

  if (!resource) {
    res.status(400).json({ error: 'Resource parameter is required' });
    return;
  }

  switch (resource) {
    case 'categories':
      if (method === 'GET') {
        res.status(200).json({ success: true, data: categories });
      } else if (method === 'POST') {
        const { name } = body;
        if (!name) {
          res.status(400).json({ error: 'Category name is required' });
          return;
        }
        categories.push(name);
        res.status(201).json({ success: true, data: categories });
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
      break;

    case 'posts':
      if (method === 'GET') {
        res.status(200).json({ success: true, data: posts });
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
      break;

    case 'articles':
      if (method === 'GET') {
        res.status(200).json({ success: true, data: articles });
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
      break;

    default:
      res.status(404).json({ error: 'Resource not found' });
  }
}
