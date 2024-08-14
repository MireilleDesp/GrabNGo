# GrabNGo

**GrabNGo** is an online convenience store application. It features a **C# .NET** backend API and a **React** frontend.

---

## Azure Data Studio (Ubuntu)

To manage your Docker containers for the database:

### Check Running Docker Containers
```bash
sudo docker ps -a
```
### Create a New Docker Container
```bash
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YOUR_PASSWORD!" -p 1433:1433 --name sql1 --hostname sql1 -d mcr.microsoft.com/mssql/server:2022-latest
```
### Check if the Container is Running
```bash
sudo docker ps -a
```
#### If the container is not running, start it
```bash
sudo docker start sql1
```
Next, open Azure Data Studio, connect to `localhost`, and create a database named `GrabNGoDB`. If you wish to use a different name, remember to update the connection string in `appsettings.json`.

### Create the Database
```sql
 CREATE DATABASE GrabNGoDB;
```

## Backend:
The backend of this application is a .NET API. To run the API, use the following commands:
1. Navigate to the API directory:
```bash
cd api/
```
2. Install the .NET EF tool globally:
```bash
dotnet tool install -g dotnet-ef
```
3. Add the MySQL Data package:
```bash
dotnet add package MySql.Data
```
4. Create a migration:
```bash
dotnet ef migrations add init
```
5. Update the database:
```bash
dotnet ef database update
```
6. Run the API:
```bash
dotnet watch run
```

## frontend: 
To set up the frontend, install the necessary libraries:
1. Navigate to the frontend directory:
```bash
cd frontend/
```
2. Install the dependencies:
```bash
npm install
```
3. Start the frontend server:
```bash
npm start
```



## The Database Tables:
### Tables

*AppUsers* (AspNetUsers)
- UserName
- NormalizedUserName
- (and other relevant properties)

*Products*
- Id (Primary Key)
- Name
- Description
- Image
- Price
- CategoryId (Foreign Key)
- QuantityInStock
- SupplierId (Foreign Key)

*Categories*
- Id (Primary Key)
- Name

*Suppliers*
- Id (Primary Key)
- Name
- Email
- PhoneNumber
- ContactName
- Address

*Cart*
- Id (Primary Key)
- AppUserId (Foreign Key)

*CartItems*
- Id (Primary Key)
- ProductId (Foreign Key)
- CartId (Foreign Key)
- Quantity

*Orders*
- Id (Primary Key)
- AppUserId (Foreign Key)
- ShippingAddress
- Amount
- CreatedOn (DateTime)
- Status
- PaymentMethod
