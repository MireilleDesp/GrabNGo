# GrabNGo

**GrabNGo** is an online convenience store application. It features a **C# .NET** backend API and a **React** frontend.

## Inspiration

This application is inspired by the tutorial from Teddy Smith titled **"Finance Project"**. You can watch the tutorial on [YouTube](https://youtu.be/XSLm9PHnkxI?si=nzB360_g7GmGd1b0).

---

## Setup (Ubuntu)

To manage your Docker containers:

```bash
# Choose the latest stable version from the Compose release page. Replace v2.15.1 with the latest version
sudo curl -L "https://github.com/docker/compose/releases/download/v2.15.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make the Docker Compose binary executable
sudo chmod +x /usr/local/bin/docker-compose

# Check if Docker Compose is installed correctly
docker-compose --version

# Build and start your containers for api
sudo docker-compose up --build
```

---

## Local Development
### Backend for local development (if not using docker):
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

### frontend for local development (if not using docker): 
To set up the frontend, install the necessary libraries:
1. Navigate to the frontend directory:
```bash
cd frontend/
```

2. Install the dependencies:
```bash
# Install the basic project dependencies
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
