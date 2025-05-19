import { useState } from "react";
import { useRouter } from "next/router";
import { createBook } from "../../lib/api/books";

export default function AddBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await createBook(title, author);
            router.push("/books");
        } catch (err) {
            setError(err.message || "Gagal menambahkan buku");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-8 font-sans text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">📚 Tambah Buku</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-2xl shadow-lg">
                <div>
                    <label className="block font-semibold mb-2 text-gray-700">Judul Buku</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-200"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-2 text-gray-700">Penulis</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-200"
                        required
                    />
                </div>

                {error && <p className="text-red-600 font-semibold">{error}</p>}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}
