// client/src/pages/api/categories.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Вернуть список категорий (пример)
    res.status(200).json({ categories: ['Warcraft 3', 'Minecraft', 'Books', '3D', 'Other'] });
  } else if (req.method === 'POST') {
    // Создать новую категорию (пример)
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    // Тут добавь логику сохранения в БД
    res.status(201).json({ message: `Category '${name}' created!` });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
