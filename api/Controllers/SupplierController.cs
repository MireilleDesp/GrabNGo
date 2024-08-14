using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Supplier;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [Route("[controller]")]
    public class SupplierController : Controller
    {
        private readonly ILogger<SupplierController> _logger;
        private readonly ISupplierRepository _supplierRepo;

        public SupplierController(ILogger<SupplierController> logger, ISupplierRepository supplierRepo)
        {
            _logger = logger;
            _supplierRepo = supplierRepo;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var suppliers = await _supplierRepo.GetAllAsync();
            var supplierDto = suppliers.Select(s => s.ToSupplierDto());
            return Ok(supplierDto);
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var supplier = await _supplierRepo.GetByIdAsync(id);
            if (supplier == null)
                return NotFound();

            return Ok(supplier.ToSupplierDto());
        }

        [HttpGet]
        [Route("{supplierName}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetByappSupplierName([FromRoute] string supplierName)
        {
            var suppliers = await _supplierRepo.GetByappSupplierNameAsync(supplierName);
            if (suppliers == null)
                return NotFound();

            var suppliersDto = suppliers.Select(s => s.ToSupplierDto());
            return Ok(suppliersDto);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] SupplierCreateDto supplierDto)
        {
            var supplierModel = await _supplierRepo.CreateAsync(supplierDto.ToSupplierFromCreateDto());
            return CreatedAtAction(nameof(GetById), new { id = supplierModel.Id }, supplierModel.ToSupplierDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] SupplierUpdateDto supplierDto)
        {
            var supplierModel = await _supplierRepo.UpdateAsync(id, supplierDto.ToSupplierFromUpdateDto());
            if (supplierModel == null)
            {
                return NotFound();
            }

            return Ok(supplierModel.ToSupplierDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var supplier = await _supplierRepo.DeleteAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }
            var suppliers = await _supplierRepo.GetAllAsync();
            var supplierDto = suppliers.Select(s => s.ToSupplierDto());
            return Ok(supplierDto);
        }
    }
}