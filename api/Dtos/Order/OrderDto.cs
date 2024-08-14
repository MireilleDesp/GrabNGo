using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Order
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public int Status { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public string AppUserName { get; set; }
    }
}