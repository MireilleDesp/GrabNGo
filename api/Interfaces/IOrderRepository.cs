using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAllAsync();
        Task<List<Order>?> GetByappUserNameAsync(string appUserName);
        Task<List<Order>?> GetUserOrdersAsync(string appUserId);
        Task<Order?> GetByIdAsync(int id);
        Task<Order> CreateAsync(Order orderModel);
        Task<Order?> UpdateAsync(int id, Order orderModel);
        Task<Order?> DeleteAsync(int id);
    }
}