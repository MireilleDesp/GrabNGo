using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Category;
using api.Models;

namespace api.Mappers
{
    public static class CategoryMappers
    {
        public static CategoryDto ToCategoryDto(this Category category)
        {
            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
            };
        }

        public static Category ToCategoryFromCreateDto(this CategoryCreateDto categoryDto)
        {
            return new Category
            {
                Name = categoryDto.Name,
            };
        }

        public static Category ToCategoryFromUpdateDto(this CategoryUpdateDto categoryDto)
        {
            return new Category
            {
                Name = categoryDto.Name,
            };
        }
    }
}