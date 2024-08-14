using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Reposatories
{
    public class CartItemRepository : ICartItemRepository
    {

        private readonly ApplicationDBContext _context;
        private readonly ILogger<CartItemRepository> _logger;
        public CartItemRepository(ApplicationDBContext context, ILogger<CartItemRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<CartItem>> GetAllAsync()
        {
            return await _context.CartItems.Include(c => c.Product).ToListAsync();
        }

        public async Task<CartItem?> GetByIdAsync(int id)
        {
            return await _context.CartItems.FirstOrDefaultAsync(i => i.Id == id);
        }
        public async Task<List<CartItem>> GetByCartIdAsync(int cartId)
        {
            return await _context.CartItems.Where(i => i.CartId == cartId).ToListAsync();
        }

        public async Task<CartItem> CreateAsync(CartItem cartItemModel)
        {
            // Null checks for cartItemModel and its properties
            if (cartItemModel == null || cartItemModel.Cart == null || cartItemModel.Product == null)
            {
                throw new ArgumentNullException(nameof(cartItemModel), "CartItem or its related properties cannot be null");
            }

            var alreadyExistingItem = _context.CartItems.Include(c => c.Cart).Include(p => p.Product)
                .Where(x => x.CartId == cartItemModel.CartId
                        && x.ProductId == cartItemModel.ProductId
                        && x.Product.Price == cartItemModel.Product.Price
                        && x.Cart.AppUserId == cartItemModel.Cart.AppUserId)
                .FirstOrDefault();

            if (alreadyExistingItem == null)
            {
                await _context.CartItems.AddAsync(cartItemModel);
            }
            else
            {
                alreadyExistingItem.Quantity += cartItemModel.Quantity;
            }

            await _context.SaveChangesAsync();
            return cartItemModel;
        }

        public async Task<CartItem?> UpdateAsync(int id, CartItem cartItemModel)
        {
            var existingCartItem = await _context.CartItems.FirstOrDefaultAsync(x => x.Id == id);
            if (existingCartItem == null)
                return null;

            existingCartItem.Quantity = cartItemModel.Quantity;
            existingCartItem.CartId = cartItemModel.CartId;
            existingCartItem.ProductId = cartItemModel.ProductId;

            await _context.SaveChangesAsync();
            return existingCartItem;
        }

        public async Task<CartItem?> DeleteAsync(int id)
        {
            var cartItemModel = await _context.CartItems.FirstOrDefaultAsync(x => x.Id == id);
            if (cartItemModel == null)
            {
                return null;
            }
            _context.CartItems.Remove(cartItemModel);
            await _context.SaveChangesAsync();
            return cartItemModel;
        }

        public async Task<bool> CartItemExists(int id)
        {
            return await _context.CartItems.AnyAsync(c => c.Id == id);
        }

        public async Task<List<CartItem>> GetByProdNameAsync(string cartItemProdName)
        {
            return await _context.CartItems.Include(c => c.Product).Where(p => p.Product.Name.Contains(cartItemProdName)).ToListAsync();

        }

        public async Task<List<CartItem>> GetByUserAsync(string appUserId)
        {
            return await _context.CartItems.Include(p => p.Product).Include(c => c.Cart)
            .Where(c => c.Cart.AppUserId == appUserId && c.OrderId == null).ToListAsync();
        }

        public async Task<List<CartItem>> JoinToOrderAsync(int orderId, string appUserId)
        {
            // Fetch the cart items for the user with no associated order
            var cartItems = await _context.CartItems
                .Include(p => p.Product)
                .Include(c => c.Cart)
                .Where(c => c.Cart.AppUserId == appUserId && c.OrderId == null)
                .ToListAsync();

            // If no cart items were found, return null
            if (cartItems == null)
            {
                return null;
            }

            // Set the OrderId for each cart item
            foreach (var cartItem in cartItems)
            {
                cartItem.OrderId = orderId;
                cartItem.status = 1;
            }

            // Save the changes to the database
            await _context.SaveChangesAsync();

            // Return the updated list of cart items
            return cartItems;
        }

        public async Task<List<CartItem>> GetByOrderIdAsync(int orderId)
        {
            return await _context.CartItems.Include(c => c.Cart).Include(p => p.Product).Include(o => o.Order)
            .Where(i => i.OrderId == orderId).ToListAsync();

        }
    }
}