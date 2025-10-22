# Employee Management System

A simple Angular project for managing employees — including displaying, searching, editing, and deleting employee data.  
Built using **Angular 19** and **JSON Server** for mock API data.

---

#  How to Run the Project

# Install dependencies
Run this command to install all required packages:
```bash
npm install
```

# Start the mock API (JSON Server)
To run the fake API locally, use:
```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

The API will now be available at:
`http://localhost:3000/employees`

---

 Start the Angular app
Now start your Angular development server:
```bash
ng serve
```

Then open your browser at:
 `http://localhost:4200/`

---

 
# Example Employee Data (db.json)
```json
{
  "employees": [
    {
      "id": 1,
      "fullName": "Mohamed Ahmed",
      "department": "IT",
      "hireDate": "2021-03-15",
      "status": "Active"
    },
    {
      "id": 2,
      "fullName": "Sara Ali",
      "department": "HR",
      "hireDate": "2020-06-20",
      "status": "Suspended"
    }
  ]
}
```

---

# Technologies Used
- **Angular 19**
- **TypeScript**
- **RxJS**
- **JSON Server**
- **SASS (SCSS)** for styling

---

## 📋 Features
 Display all employees in a responsive grid  
 Search by name or department  
 Add / Edit / Delete employees  
 Status badge (Active / Suspended)  
 Mock backend using JSON Server  

---

##  Author
**Mohamed Ahmed**  
Front-End Developer   
