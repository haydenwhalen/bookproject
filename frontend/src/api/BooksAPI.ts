// this page is to make calls to the backend

import { Book } from "../types/Books";

const API_URL = "https://bookprojectwhalenbackend.azurewebsites.net/api/Book";

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `booksTypes=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}?pageSize=${pageSize}&pageNumber=${pageNum}${
        selectedCategories.length ? `&${categoryParams}` : ''
      }`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();

    return {
      books: data.books,
      totalNumBooks: data.totalNumBooks,
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// add
export const addBook = async (book: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book', error);
    throw error;
  }
};

// update
export const updateBook = async (bookID: number, updatedBook: Book): Promise<Book> => {
  const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) {
    throw new Error('Failed to update book');
  }

  return await response.json();
};

// delete
export const deleteBook = async (bookID: number): Promise<void> => {
  const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
};

