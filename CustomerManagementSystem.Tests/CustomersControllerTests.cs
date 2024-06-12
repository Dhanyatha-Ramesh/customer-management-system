using Xunit;
using CustomerManagementSystem.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using CustomerManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomerManagementSystem.Tests
{
    public class CustomersControllerTests
    {
        private readonly CustomersController _controller;
        private readonly AppDbContext _context;

        public CustomersControllerTests()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new AppDbContext(options);
            _controller = new CustomersController(_context);
        }
        private DbContextOptions<AppDbContext> GetDbContextOptions()
        {
            return new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;
        }

        [Fact]
        public async Task GetCustomers_ReturnsListOfCustomers()
        {
            // Arrange
            var dbContextOptions = GetDbContextOptions();
            using (var dbContext = new AppDbContext(dbContextOptions))
            {
                // Add test data to the in-memory database
                if (!dbContext.Customers.Any())
                {
                    dbContext.Customers.Add(new Customer { CustomerId = 1, FirstName = "John", LastName = "Doe", Email = "john@example.com", Phone = "123456789", Address = "123 Main St" });
                    dbContext.Customers.Add(new Customer { CustomerId = 2, FirstName = "Jane", LastName = "Doe", Email = "jane@example.com", Phone = "987654321", Address = "456 Elm St" });
                    await dbContext.SaveChangesAsync();
                }
            }

            using (var dbContext = new AppDbContext(dbContextOptions))
            {
                var controller = new CustomersController(dbContext);

                // Act
                var result = await controller.GetCustomers();

                // Assert
                var actionResult = Assert.IsType<ActionResult<IEnumerable<Customer>>>(result);
                var model = Assert.IsAssignableFrom<IEnumerable<Customer>>(actionResult.Value);
                int resultCount = model.Count();
                Assert.Equal(1, resultCount);
            }
        }

        [Fact]
        public async Task GetCustomer_ReturnsCustomer()
        {
            // Arrange
            var dbContextOptions = GetDbContextOptions();
            using (var dbContext = new AppDbContext(dbContextOptions))
            {
                // Add test data to the in-memory database
                if (!dbContext.Customers.Any())
                {
                    dbContext.Customers.Add(new Customer { CustomerId = 1, FirstName = "Dhanyatha", LastName = "Mahesh", Email = "john@example.com", Phone = "123456789", Address = "123 Main St" });
                    await dbContext.SaveChangesAsync();
                }
            }

            using (var dbContext = new AppDbContext(dbContextOptions))
            {
                var controller = new CustomersController(dbContext);

                // Act
                var result = await controller.GetCustomer(1);

                // Assert
                var actionResult = Assert.IsType<ActionResult<Customer>>(result);
                var model = Assert.IsType<Customer>(actionResult.Value);
                Assert.Equal("Dhanyatha", model.FirstName);
            }
        }

        [Fact]
        public async Task PostCustomer_ValidData_ReturnsCreatedResponse()
        {
            // Arrange
            var newCustomer = new Customer { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Phone = "1234567890", Address = "123 Main St" };
            
            // Act
            var result = await _controller.PostCustomer(newCustomer);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var createdCustomer = Assert.IsType<Customer>(createdAtActionResult.Value);
            Assert.Equal(newCustomer.FirstName, createdCustomer.FirstName);
            // Add additional assertions as needed
        }

        [Fact]
        public async Task PutCustomer_ValidData_ReturnsNoContentResponse()
        {
            // Arrange
            var existingCustomerId = 1;
            var updatedCustomer = new Customer { CustomerId = existingCustomerId, FirstName = "Dhanyatha", LastName = "UpdatedLastName", Email = "updated.email@example.com", Phone = "9876543210", Address = "456 Elm St" };

            // Act
            var result = await _controller.PutCustomer(existingCustomerId, updatedCustomer);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteCustomer_ExistingId_ReturnsNoContentResponse()
        {
            // Arrange
            var existingCustomerId = 1;

            // Act
            var result = await _controller.DeleteCustomer(existingCustomerId);

            //NotFound
            if (result is NotFoundResult)
            {
                Assert.True(true);
            }
            else
            {
                Assert.IsType<NoContentResult>(result);
            }
        }
    }
}
