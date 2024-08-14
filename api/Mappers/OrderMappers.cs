using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Order;
using api.Models;

namespace api.Mappers
{
    public static class OrderMappers
    {
        public static OrderDto ToOrderDto(this Order order)
        {
            return new OrderDto
            {
                Id = order.Id,
                PaymentMethod = order.PaymentMethod,
                Amount = order.Amount,
                Status = order.Status,
                ShippingAddress = order.ShippingAddress,
                AppUserName = order.AppUser.UserName
            };
        }

        public static Order ToOrderFromCreateDto(this OrderCreateDto orderDto, string appUserId)
        {
            return new Order
            {
                PaymentMethod = orderDto.PaymentMethod,
                Amount = orderDto.Amount,
                ShippingAddress = orderDto.ShippingAddress,
                AppUserId = appUserId
            };
        }

        public static Order ToOrderFromUpdateDto(this OrderUpdateDto orderDto, string appUserId)
        {
            return new Order
            {
                PaymentMethod = orderDto.PaymentMethod,
                Amount = orderDto.Amount,
                Status = orderDto.Status,
                ShippingAddress = orderDto.ShippingAddress,
                AppUserId = appUserId
            };
        }
    }
}