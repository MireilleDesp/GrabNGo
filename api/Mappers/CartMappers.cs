using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Product;
using api.Dtos.Cart;
using api.Models;

namespace api.Mappers
{
    public static class CartMappers
    {
        public static CartDto ToCartDto(this Cart cart)
        {
            return new CartDto
            {
                Id = cart.Id,
            };
        }

        public static Cart ToCartFromCreateDto(this CartCreateDto cartDto, string appUserId)
        {
            return new Cart
            {
               AppUserId = appUserId
            };
        }
    }
}