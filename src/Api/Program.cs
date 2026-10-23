using ContractManagement.Api.Endpoints;
using ContractManagement.Application;
using ContractManagement.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI();

// app.MapControllers();
app.MapContractEndpoints();

app.Run();

// Tilføjet til gavn for testprojektet
public partial class Program { }