# GrabNGo
This application consists of an online convenient store. It is based on a c# dotnet backend API, and a React frontend. 
This application has:

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

+----------------+        +----------------+        +----------------+
|    Products    |        |    Suppliers   |        |     Orders     |
+----------------+        +----------------+        +----------------+
| product_id     |        | supplier_id    |        | order_id       |
| product_name   |        | supplier_name  |        | customer_id    |
| category_id    |        | contact_name   |        | order_date     |
| price          |        | contact_email  |        | total_amount   |
| quantity_in_stock |     | phone_number   |        | status         |
| supplier_id    |        | address        |        | shipping_address |
| description    |        +----------------+        | billing_address |
| image_url      |                                 | payment_id      |
+----------------+                                 +----------------+

+----------------+        +----------------+        +----------------+
|     Cart       |        |   OrderDetails |        |    Payments    |
+----------------+        +----------------+        +----------------+
| cart_id        |        | order_detail_id|        | payment_id     |
| customer_id    |        | order_id       |        | customer_id    |
+----------------+        | product_id     |        | payment_date   |
                          | quantity       |        | payment_method |
+----------------+        | unit_price     |        | amount         |
|   CartItems    |        +----------------+        | transaction_id |
+----------------+                                 | status         |
| cart_item_id   |                                 +----------------+
| cart_id        |
| product_id     |
| quantity       |
+----------------+
