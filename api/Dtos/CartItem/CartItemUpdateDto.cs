using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.CartItem
{
    public class CartItemUpdateDto
    {
         public int Id { get; set; }
        public int Quantity { get; set; }
    }
}