using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Cart
{
    public class CartDto
    {
        public int Id { get; set; }
        public List<api.Models.CartItem> CartItems { get; set; } = new List<api.Models.CartItem>();
    }
}