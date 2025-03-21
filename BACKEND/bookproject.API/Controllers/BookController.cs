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
        
        public IEnumerable<Book> GetBooks()
        {
            var something = _context.Books.ToList();
            return something;
        }
        
    } 
}



