using BookProject.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class BookController : Controller
    {
        private BookDbContext _context;
        
        public BookController(BookDbContext temp)
        {
            _context = temp;    
        }
        
        [HttpGet] 
        public IActionResult GetBooks(int pageSize = 5, int pageNumber = 1, [FromQuery] List<string>? booksTypes = null) // = 5 makes it so it takes five even if nothing is passed thru, =1 for first page
        {
            var query = _context.Books.AsQueryable();

            if (booksTypes != null && booksTypes.Any())
            {
                query = query.Where(b => booksTypes.Contains(b.Category));
            }

            var totalBooks = query.Count(); // will store number of books so we can send to react to make page numbers
            
            var something = query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            
            var someBook = new
            {
                Books = something,
                totalNumBooks = totalBooks,
                
            };
            return Ok(someBook); 
        }

        [HttpGet("GetBookCategory")]
        public IActionResult GetBookCategory()
        {
            var bookCategories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            
            return Ok(bookCategories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(bookId);

            if (existingBook == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.Category = updatedBook.Category;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Price = updatedBook.Price;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.ISBN = updatedBook.ISBN;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _context.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }

                
    } 
}



