# Banking Microservices Application

This project is a modern banking application built with a microservices architecture using **Spring Boot** and **Spring Cloud** for the backend, and **React.js** with **TypeScript** for the frontend. The application manages clients and their bank accounts (current and savings) through RESTful APIs and provides a responsive user interface for administration.

---

## 📂 Project Structure
```
backend
 ├─ account-service
 ├─ config-service 
 ├─ customer-service 
 ├─ discovery-service 
 └─ gateway-service 
frontend 
 └─ bank (React.js with TypeScript) 
UML
 ├─ Diagramme des classes 
 └─ Diagrammes de cas d'utilisation 
 
README.md
```

---

## Architecture Microservices 

![Architecture Microservices ](https://raw.githubusercontent.com/BelhajMokhlis/bank-microservices/refs/heads/main/UML/ArchitectureMicroservices%20.png)


## 🚀 Technologies Used

### Backend
- **Spring Boot** (Microservices)
- **Spring Data JPA** (Database Management)
- **Spring Cloud** (Eureka, Config, Gateway)
- **RestTemplate** (Inter-service communication)
- **Database**: PostgreSQL
- **Testing**: JUnit, Mockito
- **Design Patterns**: Repository, DTO, Service Layer

### Frontend
- **React.js** with **TypeScript**
- **React Router** (Routing)
- **Axios** (API Communication)
- **UI Library**: (e.g., **Material-UI** or **Styled-components**)
---

## 🎯 Key Features

### Backend (Microservices)
- **Customer Service**:
  - Add a new client
  - List all clients
  - Search for a client by ID
  
- **Account Service**:
  - Create a new account (current/savings)
  - View account details
  - List all accounts for a specific client
  - Inter-service communication via `RestTemplate`

- **Gateway Service**:
  - Central entry point for all API requests
  - Routing and load balancing using **Spring Cloud Gateway**

- **Discovery Service**:
  - Service registry with **Eureka**

- **Config Service**:
  - Centralized configuration management
  - Connects to a Git repository for externalized configuration

### Frontend (React.js)
- **Dashboard** with an overview of clients and accounts
- **Client Management**:
  - Add, list, and search for clients
- **Account Management**:
  - Add, view, and list accounts per client
- **Forms**:
  - Form validation and error display
- **Routing**:
  - Seamless navigation using **React Router**

---

## 🛠️ Installation and Setup

### Prerequisites
- **Java 17**
- **Node.js** & **npm**
- **PostgreSQL**
- **Git**

### Backend Setup
```bash
# Navigate to backend folder
cd backend

# Start Config Service
cd config-service
mvn spring-boot:run

# Start Discovery Service
cd ../discovery-service
mvn spring-boot:run

# Start Customer Service
cd ../customer-service
mvn spring-boot:run

# Start Account Service
cd ../account-service
mvn spring-boot:run

# Start Gateway Service
cd ../gateway-service
mvn spring-boot:run
```

### Frontend Setup
```bash

# Navigate to frontend/bank
cd frontend/bank

# Install dependencies
npm install

# Start the application
npm start
```
## 🔗 API Endpoints

### 🚪 **Gateway URL Base:** `http://localhost:8080`

### Customer Service
- `POST /customer-service/customers` - **Ajouter un client**  
  `http://localhost:8080/customer-service/customers`

- `GET /customer-service/customers` - **Lister tous les clients**  
  `http://localhost:8080/customer-service/customers`

- `GET /customer-service/customers/{id}` - **Obtenir un client par ID**  
  `http://localhost:8080/customer-service/customers/{id}`

---

### Account Service
- `POST /account-service/accounts` - **Créer un nouveau compte**  
  `http://localhost:8080/account-service/accounts`

- `GET /account-service/accounts/{id}` - **Obtenir les détails d'un compte**  
  `http://localhost:8080/account-service/accounts/{id}`

- `GET /account-service/customers/{customerId}/accounts` - **Lister les comptes d'un client**  
  `http://localhost:8080/account-service/customers/{customerId}/accounts`


  ### 📝 Explication 

- **`http://localhost:8080` :** Adresse de base du **gateway-service**.

- **Routing avec Spring Cloud Gateway :**  
  Le **gateway-service** redirige automatiquement les requêtes vers les microservices appropriés :  
  - **Customer Service :** `/customer-service/...`  
  - **Account Service :** `/account-service/...`

- **Avantage :**  
  Fournit un **point d'accès unique** pour toutes les API, améliorant ainsi :  
  - ✅ La **sécurité** grâce à la gestion centralisée des accès.  
  - ✅ La **flexibilité** en permettant des règles de routage dynamiques.  
  - ✅ Une **meilleure gestion** des requêtes entrantes.



## 📸 Screenshots


---

##  📊 UML Diagrams


### 🎯 Use Case Diagram

![use case diagram](https://raw.githubusercontent.com/BelhajMokhlis/bank-microservices/refs/heads/main/UML/Diagrammes%20de%20cas%20d'utilisation.png)

### 📦 Class Diagram
![class diagram](https://raw.githubusercontent.com/BelhajMokhlis/bank-microservices/refs/heads/main/UML/Diagramme%20des%20classes.png)

---

## 💡 Future Improvements
- Implement authentication and authorization
- Add advanced filtering and search functionalities
- Improve UI/UX with additional animations and transitions

---

## 👥 Contributors
- Mokhlis Belhaj

---


