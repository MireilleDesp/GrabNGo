using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.CartItem;
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
    public class CartItemController : Controller
    {
        private readonly ILogger<CartItemController> _logger;
        private readonly ICartItemRepository _cartItemRepo;
        private readonly ICartRepository _cartRepo;
        private readonly IOrderRepository _orderRepo;
        private readonly IProductRepository _productRepo;

        private readonly UserManager<AppUser> _userManager;
        public CartItemController(ILogger<CartItemController> logger,
        ICartItemRepository cartItemRepo,
        ICartRepository cartRepo,
        IProductRepository productRepo,
        UserManager<AppUser> userManager, 
        IOrderRepository orderRepo)
        {
            _logger = logger;
            _cartItemRepo = cartItemRepo;
            _cartRepo = cartRepo;
            _productRepo = productRepo;
            _userManager = userManager;
            _orderRepo = orderRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {

            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);
            var cartItems = await _cartItemRepo.GetByUserAsync(appUser.Id);
            var cartItemDto = cartItems.Select(s => s.ToCartItemDto());
            return Ok(cartItemDto);
        }

        // [HttpGet("{cartId:int}")]
        // [Authorize]
        // public async Task<IActionResult> GetByCartId([FromRoute] int cartId)
        // {
        //     var userName = User.GetUserName();
        //     var appUser = await _userManager.FindByNameAsync(userName);

        //     if (!await _cartRepo.CartExists(cartId))
        //         return BadRequest("Bad cart Id");

        //     var cart = await _cartRepo.GetByIdAsync(cartId);
        //     if (cart.AppUserId != appUser.Id || cart == null)
        //         return Unauthorized("Bad cart Id");

        //     var cartItem = await _cartItemRepo.GetByCartIdAsync(cartId);

        //     if (cartItem == null)
        //         return NotFound();

        //     return Ok(cartItem.Select(c => c.ToCartItemDto()));
        // }

        [HttpGet("{orderId:int}")]
        [Authorize]
        public async Task<IActionResult> GetByOrderId([FromRoute] int orderId)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);

            // if (!await _orderRepo.order(cartId))
            //     return BadRequest("Bad cart Id");

            // var cart = await _cartRepo.GetByIdAsync(cartId);
            // if (cart.AppUserId != appUser.Id || cart == null)
            //     return Unauthorized("Bad cart Id");

            var cartItems = await _cartItemRepo.GetByOrderIdAsync(orderId);

            if (cartItems == null)
                return NotFound();

            return Ok(cartItems.Select(c => c.ToCartItemDto()));
        }

        [HttpGet("{cartItemName}")]
        [Authorize]
        public async Task<IActionResult> GetByName([FromRoute] string cartItemName)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);

            var cartItems = await _cartItemRepo.GetByProdNameAsync(cartItemName);

            if (cartItems == null)
                return NotFound();

            return Ok(cartItems.Select(c => c.ToCartItemDto()));
        }
        [HttpPost]
        [Route("{productId}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int productId, [FromBody] CartItemCreateDto cartItemDto)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);

            if (!await _productRepo.ProductExists(productId))
                return BadRequest("Bad cart or product Id");

            var cart = await _cartRepo.GetUserCartAsync(appUser.Id);
            var product = await _productRepo.GetByIdAsync(productId);

            var cartItemModel = cartItemDto.ToCartItemFromCreateDto(cart.Id, productId);

            cartItemModel.Cart = cart;
            cartItemModel.Product = product;
            await _cartItemRepo.CreateAsync(cartItemModel);

            return Ok(cartItemModel.ToCartItemDto());
        }

        [HttpPost]
        [Route("{cartId}/{productId}")]
        [Authorize]
        public async Task<IActionResult> CreateInCart([FromRoute] int cartId, [FromRoute] int productId, [FromBody] CartItemCreateDto cartItemDto)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);

            if (!await _productRepo.ProductExists(productId) || !await _cartRepo.CartExists(cartId))
                return BadRequest("Bad cart or product Id");

            var cart = await _cartRepo.GetByIdAsync(cartId);

            if (cart.AppUserId != appUser.Id)
                return Unauthorized("Bad cart Id");

            var cartItemModel = cartItemDto.ToCartItemFromCreateDto(cartId, productId);

            await _cartItemRepo.CreateAsync(cartItemModel);
            return Ok(cartItemModel.ToCartItemDto());
        }

        [HttpPut]
        [Route("{id:int}/{cartId}/{productId}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromRoute] int cartId, [FromRoute] int productId, [FromBody] CartItemUpdateDto cartItemDto)
        {
            if (!await _cartRepo.CartExists(cartId))
                return BadRequest("Cart does not exist");

            if (!await _productRepo.ProductExists(productId))
                return BadRequest("Product does not exist");

            var cartItemModel = await _cartItemRepo.UpdateAsync(id, cartItemDto.ToCartItemFromUpdateDto(cartId, productId));
            if (cartItemModel == null)
                return NotFound();

            return Ok(cartItemModel.ToCartItemDto());
        }


        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var cartItem = await _cartItemRepo.DeleteAsync(id);
            if (cartItem == null)
                return NotFound();

            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);

            var cartItems = await _cartItemRepo.GetByUserAsync(appUser.Id);

            if (cartItems == null)
                return NotFound();

            // cartItemModel.Product = await _productRepo.GetByIdAsync(productId);
            return Ok(cartItems.Select(c => c.ToCartItemDto()));
        }
    }
}