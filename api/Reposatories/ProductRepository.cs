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
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDBContext _context;
        public ProductRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await _context.Products.Include(c => c.Category).Include(c => c.Supplier).ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products.Include(c => c.Category).Include(c => c.Supplier).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<List<Product>> GetBySearchAsync(string search)
        {
            return await _context.Products.Include(c => c.Category).Include(c => c.Supplier).Where(p => p.Name.Contains(search)).ToListAsync();
        }

        public async Task<Product> CreateAsync(Product productModel)
        {
            await _context.Products.AddAsync(productModel);
            await _context.SaveChangesAsync();
            return productModel;
        }

        public async Task<Product?> UpdateAsync(int id, Product productModel)
        {
            var existingProduct = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (existingProduct == null)
                return null;

            existingProduct.Name = productModel.Name;
            existingProduct.Price = productModel.Price;
            existingProduct.Image = productModel.Image;
            existingProduct.Description = productModel.Description;
            existingProduct.QuatityInStock = productModel.QuatityInStock;
            existingProduct.Category = productModel.Category;
            existingProduct.Supplier = productModel.Supplier;

            await _context.SaveChangesAsync();
            return existingProduct;
        }

        public async Task<Product?> DeleteAsync(int id)
        {
            var productModel = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (productModel == null)
            {
                return null;
            }
            _context.Products.Remove(productModel);
            await _context.SaveChangesAsync();
            return productModel;
        }

        public async Task<bool> ProductExists(int id)
        {
            return await _context.Products.AnyAsync(p => p.Id == id);
        }

    }
}