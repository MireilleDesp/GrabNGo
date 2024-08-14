using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Category;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        private readonly ILogger<CategoryController> _logger;
        private readonly ICategoryRepository _categoryRepo;


        public CategoryController(ILogger<CategoryController> logger, ICategoryRepository categoryRepo)
        {
            _logger = logger;
            _categoryRepo = categoryRepo;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryRepo.GetAllAsync();
            var categryDto = categories.Select(s => s.ToCategoryDto());
            return Ok(categryDto);
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var category = await _categoryRepo.GetByIdAsync(id);
            if (category == null)
                return NotFound();

            return Ok(category.ToCategoryDto());
        }

        [HttpGet("{search}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> GetBySearch([FromRoute] string search)
        {
            var categories = await _categoryRepo.GetBySearchAsync(search);
            var categoriesDto = categories.Select(s => s.ToCategoryDto());

            return Ok(categoriesDto);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CategoryCreateDto categoryDto)
        {
            var categoryModel = categoryDto.ToCategoryFromCreateDto();
            await _categoryRepo.CreateAsync(categoryModel);
            return CreatedAtAction(nameof(GetById), new { id = categoryModel.Id }, categoryModel.ToCategoryDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CategoryUpdateDto categoryDto)
        {
            var categoryModel = await _categoryRepo.UpdateAsync(id, categoryDto.ToCategoryFromUpdateDto());
            if (categoryModel == null)
            {
                return NotFound();
            }

            return Ok(categoryModel.ToCategoryDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var category = await _categoryRepo.DeleteAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            var categories = await _categoryRepo.GetAllAsync();
            var categryDto = categories.Select(s => s.ToCategoryDto());
            return Ok(categryDto);
        }
    }
}