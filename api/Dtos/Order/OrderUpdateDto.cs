using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Order
{
    public class OrderUpdateDto
    {
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public int Status { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public string AppUserId { get; set; }
    }
}