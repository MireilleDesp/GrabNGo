using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Product;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly ILogger<ProductController> _logger;
        private readonly IProductRepository _productRepo;
        private readonly ICategoryRepository _categoryRepo;
        private readonly ISupplierRepository _supplierRepo;

        public ProductController(ILogger<ProductController> logger, IProductRepository productRepo,
         ICategoryRepository categoryRepo, ISupplierRepository supplierRepo)
        {
            _logger = logger;
            _productRepo = productRepo;
            _categoryRepo = categoryRepo;
            _supplierRepo = supplierRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productRepo.GetAllAsync();
            var productsDto = products.Select(s => s.ToProductDto());
            return Ok(productsDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null)
                return NotFound();

            return Ok(product.ToProductDto());
        }

        [HttpGet("{search}")]
        [Authorize]
        public async Task<IActionResult> GetBySearch([FromRoute] string search)
        {
            var products = await _productRepo.GetBySearchAsync(search);
            var productsDto = products.Select(s => s.ToProductDto());

            return Ok(productsDto);
        }

        [HttpPost("{categoryId}/{supplierId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromRoute] int categoryId, [FromRoute] int supplierId, [FromBody] ProductCreateDto productDto)
        {
            if (!await _categoryRepo.CategoryExists(categoryId))
            {
                return BadRequest("Category does not exist");
            }
            var productModel = productDto.ToProductFromCreateDto(categoryId, supplierId);
            productModel.Category = await _categoryRepo.GetByIdAsync(categoryId);
            productModel.Supplier = await _supplierRepo.GetByIdAsync(supplierId);
            await _productRepo.CreateAsync(productModel);
            return CreatedAtAction(nameof(GetById), new { id = productModel.Id }, productModel.ToProductDto());
        }

        [HttpPut]
        [Route("{id:int}/{categoryId}/{supplierId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromRoute] int categoryId, [FromRoute] int supplierId, [FromBody] ProductUpdateDto product)
        {
            var productModel = await _productRepo.UpdateAsync(id, product.ToProductFromUpdateDto(categoryId, supplierId));
            if (productModel == null)
            {
                return NotFound();
            }

            return Ok(productModel.ToProductDto());

        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var product = await _productRepo.DeleteAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            var products = await _productRepo.GetAllAsync();
            var productsDto = products.Select(s => s.ToProductDto());
            return Ok(productsDto);
        }
    }
}