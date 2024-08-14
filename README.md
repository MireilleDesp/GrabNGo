# GrabNGo

**GrabNGo** is an online convenience store application. It features a **C# .NET** backend API and a **React** frontend.

## Inspiration

This application is inspired by the tutorial from Teddy Smith titled **"Finance Project"**. You can watch the tutorial on [YouTube](https://youtu.be/XSLm9PHnkxI?si=nzB360_g7GmGd1b0).

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

2. Install the dependencies:
```bash
# Install the .NET EF tool globally:
dotnet tool install -g dotnet-ef

# Add the MySQL Data package:
dotnet add package MySql.Data

# Create a migration:
dotnet ef migrations add init

# Update the database:
dotnet ef database update

# Run the API:
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
# Install the basic project dependencies
npm install

# Install Axios for making HTTP requests
npm install axios --save

# Install TypeScript types for Axios
npm install --save-dev @types/axios

# Install dotenv to manage environment variables
npm install dotenv --save

# Install React Toastify for notifications
npm install react-toastify

# Install React Hook Form for form management, and Yup for schema validation
npm install react-hook-form yup @hookform/resolvers

# Install Tailwind CSS for styling and initialize it
npm install -D tailwindcss
npx tailwindcss init

# Install React Router for routing
npm install --save react-router
npm install --save react-router-dom

# Install TypeScript types for React Router
npm install --save @types/react-router
npm install --save @types/react-router-dom

# Install React Icons for icon components
npm install react-icons

# Install React Spinners for loading spinners
npm i react-spinners

# Install ReactJS Popup for modals and popups
npm i reactjs-popup

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
