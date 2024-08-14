using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Product;
using api.Dtos.CartItem;
using api.Models;

namespace api.Mappers
{
    public static class CartItemMappers
    {
        public static CartItemDto ToCartItemDto(this CartItem cartItem)
        {
            return new CartItemDto
            {
                Id = cartItem.Id,
                Quantity = cartItem.Quantity,
                CartId = cartItem.CartId,
                ProductId = cartItem.ProductId,
                ProductName = cartItem.Product.Name,
                productImage = cartItem.Product.Image,
                Price = cartItem.Product.Price
            };
        }

        public static CartItem ToCartItemFromCreateDto(this CartItemCreateDto cartItemDto, int cartId, int productId)
        {
            return new CartItem
            {
                Quantity = cartItemDto.Quantity,
                CartId = cartId,
                ProductId = productId
            };
        }

        public static CartItem ToCartItemFromUpdateDto(this CartItemUpdateDto cartItemDto, int cartId, int productId)
        {
            return new CartItem
            {
                Quantity = cartItemDto.Quantity,
                CartId = cartId,
                ProductId = productId
            };
        }
    }
}