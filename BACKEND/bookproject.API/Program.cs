using BookProject.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Configure DB Context
builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

// ✅ CORS Policy (include deployed static frontend URL!)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
    "http://localhost:5173",
    "https://white-mushroom-080632d1e.6.azurestaticapps.net",
  // https://white-mushroom-080632d1e.6.azurestaticapps.net // ✅ your deployed frontend
    "https://bookprojectwhalenbackend.azurewebsites.net"       // ✅ your backend URL for Azure to call itself
)
.AllowAnyMethod()
.AllowAnyHeader();


    });
});


var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ✅ Apply CORS before authorization
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();


