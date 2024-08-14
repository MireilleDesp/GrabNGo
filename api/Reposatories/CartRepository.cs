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
    public class CartRepository : ICartRepository
    {

        private readonly ApplicationDBContext _context;
        public CartRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Cart>> GetUserCartsAsync(AppUser appUser)
        {
            return await _context.Carts.Where(c => c.AppUserId == appUser.Id).ToListAsync();
        }

        public async Task<Cart?> GetByIdAsync(int id)
        {
            return await _context.Carts.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Cart> CreateAsync(Cart cartModel)
        {
            await _context.Carts.AddAsync(cartModel);
            await _context.SaveChangesAsync();
            return cartModel;
        }


        public async Task<Cart?> DeleteAsync(int id)
        {
            var cartModel = await _context.Carts.FirstOrDefaultAsync(x => x.Id == id);
            if (cartModel == null)
            {
                return null;
            }
            _context.Carts.Remove(cartModel);
            await _context.SaveChangesAsync();
            return cartModel;
        }

        public async Task<bool> CartExists(int id)
        {
            return await _context.Carts.AnyAsync(c => c.Id == id);
        }

        public async Task<Cart?> GetUserCartAsync(string appUserId)
        {
            var cartModel = await _context.Carts.FirstOrDefaultAsync(x => x.AppUserId == appUserId);
            if (cartModel == null)
            {
                return null;
            }
            return cartModel;
        }
    }
}