const BACKEND_URL = 'http://localhost:3333';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET': {
            // Fetch semua buku dari backend
            const fetchRes = await fetch(`${BACKEND_URL}/books`);
            const data = await fetchRes.json();
            return res.status(fetchRes.status).json(data);
        }

        case 'POST': {
            // Teruskan body ke backend
            const { title, author } = req.body;
            console.log(title, author)
            const fetchRes = await fetch(`${BACKEND_URL}/books`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    author: author
                })
            });
            const data = await fetchRes.json();
            return res.status(fetchRes.status).json(data);
        }

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
