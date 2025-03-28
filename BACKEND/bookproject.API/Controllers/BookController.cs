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
        
    } 
}



