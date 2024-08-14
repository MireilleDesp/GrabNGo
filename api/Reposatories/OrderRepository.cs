using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace api.Reposatories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDBContext _context;
        public OrderRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Order>> GetAllAsync()
        {
            return await _context.Orders.Include(c => c.AppUser).ToListAsync();
        }

        public async Task<Order?> GetByIdAsync(int id)
        {
            return await _context.Orders.Include(c => c.AppUser).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Order> CreateAsync(Order orderModel)
        {
            await _context.Orders.AddAsync(orderModel);
            orderModel.Status = 1;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                orderModel.Status = 2;

                Console.WriteLine(ex);
            }
            return orderModel;
        }

        public async Task<Order?> UpdateAsync(int id, Order orderModel)
        {
            var existingOrder = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
            if (existingOrder == null)
                return null;

            existingOrder.PaymentMethod = orderModel.PaymentMethod;
            existingOrder.Amount = orderModel.Amount;
            existingOrder.Status = orderModel.Status;
            existingOrder.ShippingAddress = orderModel.ShippingAddress;

            await _context.SaveChangesAsync();
            return existingOrder;
        }

        public async Task<Order?> DeleteAsync(int id)
        {
            var orderModel = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
            if (orderModel == null)
            {
                return null;
            }
            _context.Orders.Remove(orderModel);
            await _context.SaveChangesAsync();
            return orderModel;
        }

        public async Task<bool> OrderExists(int id)
        {
            return await _context.Orders.AnyAsync(p => p.Id == id);
        }

        public async Task<List<Order>?> GetByappUserNameAsync(string appUserName)
        {
            return await _context.Orders.Include(c => c.AppUser).Where(u => u.AppUser.UserName.Contains(appUserName)).ToListAsync();

        }

        public async Task<List<Order>?> GetUserOrdersAsync(string appUserId)
        {
            return await _context.Orders.Include(c => c.AppUser).Where(u => u.AppUser.Id == appUserId).ToListAsync();


        }
    }
}