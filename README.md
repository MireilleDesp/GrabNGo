# GrabNGo

**GrabNGo** is a dummy online convenience store application I created to refresh my skills in C# .NET after completing my PhD in Computer Science (with a focus on Spiking Neural Networks). It features a **C# .NET** backend API and a **React** frontend.

---

## Setup (Ubuntu)

Build and start Docker containers:

```bash
sudo docker-compose up --build
```
Open http://localhost:3000/ in your browser.

---
Start by logging in as an Admin using the default seeded Admin account:
- **Username**: defaultadmin
- **Password**: Admin123!

As an Admin, you can add categories, suppliers, and products. The application has different functionalities for Admins and regular users. As an Admin, you have full CRUD (Create, Read, Update, Delete) capabilities. Create some suppliers, categories and products. 
Then, sign up as a regular user to add items to the cart and create orders.

---
## Inspiration

This application is inspired by the tutorial from Teddy Smith titled **"Finance Project"**. You can watch the tutorial on [YouTube](https://youtu.be/XSLm9PHnkxI?si=nzB360_g7GmGd1b0).
