using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Product;
using api.Models;

namespace api.Mappers
{
    public static class ProductMappers
    {
        public static ProductDto ToProductDto(this Product product)
        {
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                QuatityInStock = product.QuatityInStock,
                Image = product.Image,
                SupplierId = product.SupplierId,
                CategoryId = product.CategoryId
            };
        }

        public static Product ToProductFromCreateDto(this ProductCreateDto productDto, int categoryId, int SupplierId)
        {
            return new Product
            {
                Name = productDto.Name,
                Price = productDto.Price,
                Description = productDto.Description,
                QuatityInStock = productDto.QuatityInStock,
                Image = productDto.Image,
                CategoryId = categoryId,
                SupplierId = SupplierId
            };
        }

        public static Product ToProductFromUpdateDto(this ProductUpdateDto productDto, int categoryId, int SupplierId)
        {
            return new Product
            {
                Name = productDto.Name,
                Price = productDto.Price,
                Description = productDto.Description,
                QuatityInStock = productDto.QuatityInStock,
                Image = productDto.Image,
                CategoryId = categoryId,
                SupplierId = SupplierId
            };
        }

        public static List<ProductDto> ToProductsDto(this List<Product> products)
        {
            List<ProductDto> productDtos = new List<ProductDto>();

            foreach (Product product in products)
            {
                ProductDto _prodDto = new ProductDto();
                _prodDto.Id = product.Id;
                _prodDto.Name = product.Name;
                _prodDto.Price = product.Price;
                _prodDto.Description = product.Description;
                _prodDto.QuatityInStock = product.QuatityInStock;
                _prodDto.Image = product.Image;
                _prodDto.SupplierId = product.SupplierId;
                _prodDto.CategoryId = product.CategoryId;
                productDtos.Add(_prodDto);
            }
            return productDtos;
        }
    }
}