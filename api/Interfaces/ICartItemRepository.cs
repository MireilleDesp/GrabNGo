using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ICartItemRepository
    {
        Task<List<CartItem>> GetAllAsync();
        Task<CartItem?> GetByIdAsync(int id);
        Task<List<CartItem>> GetByProdNameAsync(string cartItemProdName);
        Task<List<CartItem>> GetByUserAsync(string appUserId);
        Task<List<CartItem>> JoinToOrderAsync(int orderId, string appUserId);
        Task<List<CartItem>> OrderDetails(int orderId, string search);
        Task<List<CartItem>> GetByCartIdAsync(int cartId);
        Task<List<CartItem>> GetByOrderIdAsync(int orderId);
        Task<CartItem> CreateAsync(CartItem CartItemModel);
        Task<CartItem?> UpdateAsync(int id, CartItem cartItemModel);
        Task<CartItem?> DeleteAsync(int id);
        Task<bool> CartItemExists(int id);
    }
}