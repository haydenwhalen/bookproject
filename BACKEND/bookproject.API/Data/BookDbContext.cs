using Microsoft.EntityFrameworkCore;

namespace BookProject.API.Data;

public class BookDbContext: DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Book> Books { get; set; } // sets up your table name to be connected with the database
}