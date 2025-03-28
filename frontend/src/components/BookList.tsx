import { useEffect, useState } from "react";
import { Book } from "../types/Books";
import { useNavigate } from "react-router-dom";

function BookList({selectedCategories} : {selectedCategories : string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {

      const categoryParams = selectedCategories
      .map((cat) => `booksTypes=${encodeURIComponent(cat)}`)
      .join('&');


      const response = await fetch(
        `http://localhost:5274/api/Book?pageSize=${pageSize}&pageNumber=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ``}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

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

      {/* Pagination Buttons */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button key={i + 1} onClick={() => setPageNum(i + 1)}>
          {i + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      
      {/* Results per page dropdown */}
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">15</option>
        </select>
      </label>
    </>
  );
}

export default BookList;

