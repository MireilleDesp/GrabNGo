using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Order;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [Route("[controller]")]
    public class OrderController : Controller
    {
        private readonly ILogger<OrderController> _logger;
        private readonly IOrderRepository _orderRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly ICartItemRepository _cartItemRepo;


        public OrderController(ILogger<OrderController> logger,
        IOrderRepository orderRepo,
        UserManager<AppUser> userManager,
        ICartItemRepository cartItemRepo)
        {
            _logger = logger;
            _orderRepo = orderRepo;
            _userManager = userManager;
            _cartItemRepo = cartItemRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserOrders()
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);

            var isAdmin = await _userManager.IsInRoleAsync(appUser, "Admin");

            var orders = isAdmin ? await _orderRepo.GetAllAsync() :
            await _orderRepo.GetUserOrdersAsync(appUser.Id);
            var orderDto = orders.Select(s => s.ToOrderDto());
            return Ok(orderDto);
        }

        [HttpGet("{id:int}/{search?}")]
        [Authorize]
        public async Task<IActionResult> GetOrderDetails([FromRoute] int id, [FromRoute] string search)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);
            var order = await _orderRepo.GetByIdAsync(id);
            if (order.AppUserId != appUser.Id || order == null)
                return NotFound();
            order.AppUser = appUser;

            var orderCartItems = await _cartItemRepo.OrderDetails(id, search);
            var cartItemDto = orderCartItems.Select(s => s.ToCartItemDto());
            return Ok(cartItemDto);
        }

        // [HttpGet("{id:int}")]
        // [Authorize]
        // public async Task<IActionResult> GetById([FromRoute] int id)
        // {
        //     var userName = User.GetUserName();
        //     var appUser = await _userManager.FindByNameAsync(userName);
        //     var order = await _orderRepo.GetByIdAsync(id);
        //     if (order.AppUserId != appUser.Id || order == null)
        //         return NotFound();
        //     order.AppUser = appUser;
        //     return Ok(order.ToOrderDto());
        // }

        [HttpGet]
        [Route("{appUserName}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> GetByappUserName([FromRoute] string appUserName)
        {
            var orders = await _orderRepo.GetByappUserNameAsync(appUserName);
            if (orders == null)
                return NotFound();

            var ordersDto = orders.Select(s => s.ToOrderDto());
            return Ok(ordersDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] OrderCreateDto orderDto)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);
            var orderModel = orderDto.ToOrderFromCreateDto(appUser.Id);
            await _orderRepo.CreateAsync(orderModel);
            // after order creation, cartItems now belog to this order:
            var cartItems = await _cartItemRepo.JoinToOrderAsync(orderModel.Id, appUser.Id);
            var cartItemDto = cartItems.Select(s => s.ToCartItemDto());

            // Return an anonymous object with the order and cart items
            return Ok(new
            {
                Order = orderModel.ToOrderDto(),
                CartItems = cartItemDto
            });
        }

        [HttpPut]
        [Route("{id:int}/{appUserId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromRoute] string appUserId, [FromBody] OrderUpdateDto orderDto)
        {
            if (await _userManager.FindByIdAsync(appUserId) != null)
                return BadRequest("User does not exist");

            var orderModel = await _orderRepo.UpdateAsync(id, orderDto.ToOrderFromUpdateDto(appUserId));
            if (orderModel == null)
                return NotFound();

            return Ok(orderModel.ToOrderDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var order = await _orderRepo.DeleteAsync(id);
            if (order == null)
                return NotFound();

            return NoContent();
        }
    }
}