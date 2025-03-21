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
        
        public IActionResult GetBooks(int pageSize = 5, int pageNumber = 1) // = 5 makes it so it takes five even if nothing is passed thru, =1 for first page
        {
            var something = _context.Books
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            
            var totalBooks = _context.Books.Count(); // will store number of books so we can send to react to make page numbers
            
            var someBook = new
            {
                Books = something,
                totalNumBooks = totalBooks,
                
            };
            return Ok(someBook); 
        }
        
    } 
}



