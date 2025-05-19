import { useEffect, useState } from "react";
import Link from 'next/link';
import { getBooks, deleteBook as apiDeleteBook } from '@/lib/api/books';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  const deleteBook = async (id) => {
    try {
      await apiDeleteBook(id);
      setBooks(prevBooks => prevBooks.filter(b => b.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8 tracking-tight">
          Koleksi Buku
        </h1>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
            {books?.map((b) => (
              <div
                key={b.id}
                className="min-w-[300px] bg-white border border-gray-200 rounded-2xl shadow-md p-5 flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={`/books/${b.id}`}
                    className="text-xl font-semibold text-blue-600 hover:underline"
                  >
                    {b.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">Penulis: {b.author}</p>
                </div>
                <div className="flex justify-between mt-4 text-sm">
                  <Link
                    href={`/books/${b.id}`}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteBook(b.id)}
                    className="text-red-500 hover:underline font-medium"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-start">
          <Link
            href="/books/add"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-xl shadow-lg transition duration-200"
          >
            + Tambah Buku Baru
          </Link>
        </div>
      </div>
    </div>
  );
}
