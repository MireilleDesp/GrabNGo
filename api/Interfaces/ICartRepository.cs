using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ICartRepository
    {
        Task<List<Cart>> GetUserCartsAsync(AppUser appUser);
        Task<Cart?> GetUserCartAsync(string appUserId);
        Task<Cart?> GetByIdAsync(int id);
        Task<Cart> CreateAsync(Cart cartModel);
        Task<Cart?> DeleteAsync(int id);
        Task<bool> CartExists(int id);
    }
}