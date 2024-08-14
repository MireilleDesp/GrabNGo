using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Cart;
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
    public class CartController : Controller
    {
        private readonly ILogger<CartController> _logger;
        private readonly UserManager<AppUser> _userManager;
        private readonly ICartRepository _cartRepo;

        public CartController(ILogger<CartController> logger, ICartRepository cartRepo, UserManager<AppUser> userManager)
        {
            _logger = logger;
            _cartRepo = cartRepo;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);
            var carts = await _cartRepo.GetUserCartsAsync(appUser);
            var cartDto = carts.Select(s => s.ToCartDto());
            return Ok(cartDto);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var cart = await _cartRepo.GetByIdAsync(id);
            if (cart == null)
                return NotFound();

            return Ok(cart.ToCartDto());
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CartCreateDto cartDto)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);
            var cartModel = await _cartRepo.CreateAsync(cartDto.ToCartFromCreateDto(appUser.Id));
            return CreatedAtAction(nameof(GetById), new { id = cartModel.Id }, cartModel.ToCartDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var cart = await _cartRepo.DeleteAsync(id);
            if (cart == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}