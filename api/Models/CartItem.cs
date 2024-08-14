using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int? CartId { get; set; }
        public Cart? Cart { get; set; }
        public int? ProductId { get; set; }
        public Product? Product { get; set; }

        public int? OrderId { get; set; }
        public Order? Order { get; set; }
        public int status { get; set; }
    }
}