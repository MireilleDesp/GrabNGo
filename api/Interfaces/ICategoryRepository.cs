using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task<List<Category>> GetBySearchAsync(string search);
        Task<Category> CreateAsync(Category categoryModel);
        Task<Category?> UpdateAsync(int id, Category categoryModel);
        Task<Category?> DeleteAsync(int id);
        Task<bool> CategoryExists(int id);
    }
}