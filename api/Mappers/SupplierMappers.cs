using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Product;
using api.Dtos.Supplier;
using api.Models;

namespace api.Mappers
{
    public static class SupplierMappers
    {
        public static SupplierDto ToSupplierDto(this Supplier supplier)
        {
            return new SupplierDto
            {
                Id = supplier.Id,
                Name = supplier.Name,
                ContactName = supplier.ContactName,
                PhoneNumber = supplier.PhoneNumber,
                Email = supplier.Email,
                Address = supplier.Address,
            };
        }

        public static Supplier ToSupplierFromCreateDto(this SupplierCreateDto supplierDto)
        {
            return new Supplier
            {
                Name = supplierDto.Name,
                ContactName = supplierDto.ContactName,
                PhoneNumber = supplierDto.PhoneNumber,
                Email = supplierDto.Email,
                Address = supplierDto.Address,
            };
        }

        public static Supplier ToSupplierFromUpdateDto(this SupplierUpdateDto supplierDto)
        {
            return new Supplier
            {
                Name = supplierDto.Name,
                ContactName = supplierDto.ContactName,
                PhoneNumber = supplierDto.PhoneNumber,
                Email = supplierDto.Email,
                Address = supplierDto.Address,
            };
        }
    }
}