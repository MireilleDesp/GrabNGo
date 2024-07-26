# GrabNGo
This application consists of an online convenient store. It is based on a c# dotnet backend API, and a React frontend. 
This application has:

### AppUsers, who are AspNetUsers and have all their properties:
- UserName
- NormalizedUserName
- etc..
### Products:
- Id
- Name
- Price
- QuantityInStock
- Description
- Image
- CategoryId (foreign key)
- SupplierId (foreign key)

+----------------+        +----------------+        +----------------+
|    Customers   |        |   Employees    |        |   Categories   |
+----------------+        +----------------+        +----------------+
| customer_id    |        | employee_id    |        | category_id    |
| first_name     |        | first_name     |        | category_name  |
| last_name      |        | last_name      |        +----------------+
| email          |        | email          |
| phone_number   |        | phone_number   |
| address        |        | position       |
| password_hash  |        | hire_date      |
| created_at     |        +----------------+
+----------------+

+----------------+        +----------------+                          
|    Products    |        |    Suppliers   |        
+----------------+        +----------------+                          
| product_id     |        | supplier_id    |                          
| product_name   |        | supplier_name  |                          
| category_id    |        | contact_name   |                          
| price          |        | contact_email  |                          
| quantity_in_stock |     | phone_number   |                          
| supplier_id    |        | address        |        
| description    |        +----------------+                          
| image_url      |                                                    
+----------------+                                                    

+----------------+                                  +----------------+
|     Cart       |                                  |     Orders     |
+----------------+                                  +----------------+
| cart_id        |                                  | payment_id     |
| customer_id    |                                  | customer_id    |
+----------------+                                  | payment_date   |
                                                    | payment_method |
+----------------+                                  | amount         |
|   CartItems    |                                  | shippingAddress |
+----------------+                                  | status         |
| cart_item_id   |                                  +----------------+
| cart_id        |
| product_id     |
| quantity       |
+----------------+
