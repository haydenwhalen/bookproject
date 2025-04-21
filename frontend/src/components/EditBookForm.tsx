import { useState, useEffect } from 'react';
import { Book } from '../types/Books';
import { updateBook } from '../api/BooksAPI';

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>(book);

  useEffect(() => {
    setFormData(book); // in case book changes after mount
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' || name === 'pageCount' ? parseFloat(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(formData.bookID, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
      <h3 className="mb-3">Edit Book</h3>

      <label>Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" />
      </label>

      <label>Author:
        <input type="text" name="author" value={formData.author} onChange={handleChange} className="form-control" />
      </label>

      <label>Publisher:
        <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} className="form-control" />
      </label>

      <label>Category:
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="form-control" />
      </label>

      <label>Classification:
        <input type="text" name="classification" value={formData.classification} onChange={handleChange} className="form-control" />
      </label>

      <label>Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" />
      </label>

      <label>Page Count:
        <input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} className="form-control" />
      </label>

      <label>ISBN:
        <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} className="form-control" />
      </label>

      <div className="mt-3">
        <button type="submit" className="btn btn-primary me-2">Save Changes</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditBookForm;
