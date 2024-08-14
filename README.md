# GrabNGo
This application consists of an online convenient store. It is based on a c# dotnet backend API, and a React frontend.



## Azure Data studio (I'm using Ubuntu):
To check the already running  docker containers:
sudo docker ps -a
To create a new docker container:
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YOUR_PASSWORD!" -p 1433:1433 --name sql1 --hostname sql1 -d  mcr.microsoft.com/mssql/server:2022-latest
Check is the container is running:
sudo docker ps -a
If not, start it:
sudo docker start sql1

Than go into your Azure data studio, connect to localhost, and create a database called GrabNGoDB (if you want to change it, you have to also change it in the connection string in appsettings.json):
Runa new Query: CREATE DATABASE GrabNGoDB; 

## Backend:
The backend of this app consists of a dotnet API.
To run this api, the following commands are needed:
cd api/
dotnet tool install -g dotnet-ef
dotnet add package MySql.Data
dotnet ef migrations add init
dotnet ef database update
dotnet watch run

## frontend: 
cd frontend/



# The Database Tables:
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
