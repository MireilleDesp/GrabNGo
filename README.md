# GrabNGo
This application consists of an online convenient store. It is based on a c# dotnet backend API, and a React frontend. 
This application has:
### AppUsers, who are AspNetUsers and have all their properties:
- UserName
- NormalizedUserName
- etc..
### Products:
- Id                - Description
- Name              - Image
- Price             - CategoryId (foreign key)
- QuantityInStock   - SupplierId (foreign key)
### Categories
- Id
- Name
### Suppliers
- Id                - Email
- Name              - PhoneNumber
- ContactName       -Address
### Cart
- Id
- AppUserId (foreign key)
#### CartItems
- Id                    - ProductId (foreign key)
- CartId (foreign key)  - Quantity
### Orders
- Id                        - Amount
- AppUserId (foreign key)   - ShippingAddress
- CreatedOn (DateTime)      - Status
- PaymentMethod
