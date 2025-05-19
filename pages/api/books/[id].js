const BACKEND_URL = 'http://localhost:3333';

export default async function handler(req, res) {
    const { method, query: { id } } = req;

    switch (method) {
        case 'GET': {
            const fetchRes = await fetch(`${BACKEND_URL}/books/${id}`);
            const data = await fetchRes.json();
            return res.status(fetchRes.status).json(data);
        }

        case 'PUT': {
            const { title, author } = req.body;
            const fetchRes = await fetch(`${BACKEND_URL}/books/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, author }),
            });
            const data = await fetchRes.json();
            return res.status(fetchRes.status).json(data);
        }

        case 'DELETE': {
            const fetchRes = await fetch(`${BACKEND_URL}/books/${id}`, {
                method: 'DELETE',
            });
            // Kalau backend tidak mengirim json di response, jangan paksa json()
            if (fetchRes.status === 204) {
                return res.status(204).end();
            }
            const data = await fetchRes.json();
            return res.status(fetchRes.status).json(data);
        }

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
