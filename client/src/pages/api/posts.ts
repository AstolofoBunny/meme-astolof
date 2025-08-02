import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Вернуть список постов (пример)
    res.status(200).json({ posts: [{ id: 1, title: 'Пост 1' }, { id: 2, title: 'Пост 2' }] });
  } else if (req.method === 'POST') {
    // Создать пост (пример)
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    // Тут добавь логику сохранения в БД
    res.status(201).json({ message: `Post '${title}' created!` });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
