import { useEffect, useState } from "react";

import { Book } from "./types/Books";

function BookList()
{

    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        const fetchBooks = async () => {
          const response = await fetch('http://localhost:5274/api/Book');

          const data = await response.json();
          setBooks(data)
        };

        fetchBooks();
    }, []);

    return (
      <>
        <h1>Books</h1>
        <br/>
        {books.map((b) => (
          <div id="bookCard" key={b.bookID}>
            <h3>{b.title}</h3>
            <ul>
              <li>Book Author: {b.author}</li>
              <li>Book Publisher: {b.publisher}</li>
              <li>Book ISBN: {b.isbn}</li>
              <li>Book Classification: {b.classification}</li>
              <li>Book Category: {b.category}</li>
              <li>{b.pageCount} Pages</li>
            </ul>
          </div>
        ))}
      </>
    );
    
      
}

export default BookList;