import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Вернуть список новостей (пример)
    res.status(200).json({ news: [{ id: 1, title: 'Новость 1' }, { id: 2, title: 'Новость 2' }] });
  } else if (req.method === 'POST') {
    // Создать новость (пример)
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    // Тут добавь логику сохранения в БД
    res.status(201).json({ message: `News '${title}' created!` });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
