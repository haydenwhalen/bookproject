import { useEffect, useState } from "react";
import { Book } from "../types/Books";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({selectedCategories} : {selectedCategories : string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } 
      catch (error)
      {
        setError((error as Error).message);
      }
      finally {
        setLoading(false);
      }
    
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading Projects...</p>
  if (error) return <p className="text-red-500">Error {error}</p>

  // Sort the books array by title in ascending or descending order
  const sortedBooks = [...books].sort((a, b) => {
    return sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  return (
    <>
      {/* Sorting Dropdown */}
      <div>
        <label>
          Sort by Title:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      
      <br />
      
      {/* Render Sorted Books */}
      {sortedBooks.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Book Author:</strong> {b.author}
              </li>
              <li>
                <strong>Book Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>Book ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Book Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Book Category:</strong> {b.category}
              </li>
              <li>
                {b.pageCount} <strong>Pages</strong>
              </li>
            </ul>
            <button className="btn btn-primary btn-sm mt-2 shadow rounded-pill" 
            // ✅ Change it to:
            onClick={() => navigate(`/buy/${b.title}/${b.bookID}`)}>Buy Book</button>
 
          </div>

        </div>
      ))}
      
      <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPageNum(1);
            }}
          />
    </>
  );
}

export default BookList;

