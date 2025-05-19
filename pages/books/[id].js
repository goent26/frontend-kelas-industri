import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getBook, updateBook } from "../../lib/api/books";

export default function EditBook() {
    const router = useRouter();
    const { id } = router.query;

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function fetchBook() {
            setLoading(true);
            setError(null);
            try {
                const data = await getBook(id);
                setTitle(data.title || "");
                setAuthor(data.author || "");
            } catch (err) {
                setError("Gagal memuat data buku");
            } finally {
                setLoading(false);
            }
        }

        fetchBook();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSaving(true);

        try {
            await updateBook(id, title, author);
            router.push("/books");
        } catch (err) {
            setError("Gagal menyimpan perubahan");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-8 font-sans text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">✏️ Edit Buku</h1>

            {loading ? (
                <div className="bg-gray-50 p-6 rounded-2xl shadow-lg text-center text-gray-500">
                    Memuat data buku...
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-2xl shadow-lg">
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Judul Buku</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-200"
                            required
                            disabled={saving}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Penulis</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-200"
                            required
                            disabled={saving}
                        />
                    </div>

                    {error && <p className="text-red-600 font-semibold">{error}</p>}

                    <div className="text-right">
                        <button
                            type="submit"
                            disabled={saving}
                            className={`bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-200 ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {saving ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
