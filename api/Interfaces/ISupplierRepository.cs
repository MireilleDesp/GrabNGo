using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ISupplierRepository
    {
        Task<List<Supplier>> GetAllAsync();
        Task<List<Supplier>> GetByappSupplierNameAsync(string supplierName);
        Task<Supplier?> GetByIdAsync(int id);
        Task<Supplier> CreateAsync(Supplier supplierModel);
        Task<Supplier?> UpdateAsync(int id, Supplier supplierModel);
        Task<Supplier?> DeleteAsync(int id);
        Task<bool> SupplierExists(int id);
    }
}