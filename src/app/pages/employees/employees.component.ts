import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { HeaderService } from '../../services/header.service';

interface Employee {
  department: any;
  id: number;
  name: string;
  status: string;
  date: string;
}

 
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule, 
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

 
 isUnactive = false;

  employees: any[] = [];
  isEditMode = false;
   editForm!: FormGroup;

  isPopupOpen: boolean = false;
  currentEmployeeId: number | null = null;

  constructor(private headerService: HeaderService,private fb: FormBuilder, private http: HttpClient) {
     this.editForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      status: ['', Validators.required],
      date: ['', Validators.required]
    })
  }

  ngOnInit() {
      this.headerService.isUnactive$.subscribe(state => {
        this.isUnactive = state;
      });
      
     this.getEmployees();
  }

 
  getEmployees() {
    this.http.get<any[]>('http://localhost:3000/employees').subscribe({
      next: data => this.employees = data,
      error: err => console.error('Failed to fetch employees', err)
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete?')) {
       this.employees = this.employees.filter(emp => emp.id !== id);
    }
  }
  // delete

   openEditPopup(employee: Employee) {
    this.currentEmployeeId = employee.id;
    this.editForm.patchValue({
      name: employee.name,
      department: employee.department,
      status: employee.status,
      date: employee.date
    });
    this.isPopupOpen = true;
  }

   openAddPopup() {
      this.currentEmployeeId = null;  
      this.editForm.reset();         
      this.isPopupOpen = true;
    }

  saveEdit() {
    if (this.editForm.valid) {
      if (this.currentEmployeeId !== null) {
        // Edit
        const index = this.employees.findIndex(emp => emp.id === this.currentEmployeeId);
        if (index !== -1) {
          this.employees[index] = { id: this.currentEmployeeId, ...this.editForm.value };
        }
      } else {
        // Add a new employee
        const newId = this.employees.length > 0 ? Math.max(...this.employees.map(e => e.id)) + 1 : 1;
        this.employees.push({ id: newId, ...this.editForm.value });
      }
      this.isPopupOpen = false;
      this.currentEmployeeId = null;
    }
  }
  
  closePopup() {
    this.isPopupOpen = false;
    this.currentEmployeeId = null;
  }
}


 

  
 