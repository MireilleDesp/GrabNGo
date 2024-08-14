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
    public class SupplierRepository : ISupplierRepository
    {

        private readonly ApplicationDBContext _context;
        public SupplierRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Supplier>> GetAllAsync()
        {
            return await _context.Suppliers.Include(c => c.Products).ToListAsync();
        }

        public async Task<Supplier?> GetByIdAsync(int id)
        {
            return await _context.Suppliers.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Supplier> CreateAsync(Supplier supplierModel)
        {
            await _context.Suppliers.AddAsync(supplierModel);
            await _context.SaveChangesAsync();
            return supplierModel;
        }

        public async Task<Supplier?> UpdateAsync(int id, Supplier supplierModel)
        {
            var existingSupplier = await _context.Suppliers.FirstOrDefaultAsync(x => x.Id == id);
            if (existingSupplier == null)
                return null;

            existingSupplier.Name = supplierModel.Name;
            existingSupplier.ContactName = supplierModel.ContactName;
            existingSupplier.PhoneNumber = supplierModel.PhoneNumber;
            existingSupplier.Email = supplierModel.Email;
            existingSupplier.Address = supplierModel.Address;

            await _context.SaveChangesAsync();
            return existingSupplier;
        }

        public async Task<Supplier?> DeleteAsync(int id)
        {
            var supplierModel = await _context.Suppliers.FirstOrDefaultAsync(x => x.Id == id);
            if (supplierModel == null)
            {
                return null;
            }
            _context.Suppliers.Remove(supplierModel);
            await _context.SaveChangesAsync();
            return supplierModel;
        }

        public async Task<bool> SupplierExists(int id)
        {
            return await _context.Suppliers.AnyAsync(c => c.Id == id);
        }

        public async Task<List<Supplier>> GetByappSupplierNameAsync(string supplierName)
        {
            return await _context.Suppliers.Where(s => s.Name.Contains(supplierName) || s.ContactName.Contains(supplierName)).ToListAsync();

        }
    }
}