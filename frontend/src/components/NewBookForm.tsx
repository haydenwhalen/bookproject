import { useState } from 'react';
import { Book } from '../types/Books';
import { addBook } from '../api/BooksAPI';

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    category: '',
    classification: '',
    price: 0,
    pageCount: 0,
    isbn: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "pageCount" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h2>Add New Book</h2>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Author:
        <input type="text" name="author" value={formData.author} onChange={handleChange} />
      </label>
      <label>
        Publisher:
        <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleChange} />
      </label>
      <label>
        Classification:
        <input type="text" name="classification" value={formData.classification} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </label>
      <label>
        Page Count:
        <input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} />
      </label>
      <label>
        ISBN:
        <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} />
      </label>
      <div className="mt-2">
        <button type="submit" className="btn btn-primary me-2">Add Book</button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default NewBookForm;
