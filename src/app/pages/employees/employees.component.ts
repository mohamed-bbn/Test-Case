import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { HeaderService } from '../../services/header.service';

interface Employee {
  id: number;
  name: string;
  department: string;
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
    HeaderComponent,
    FormsModule
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/employees';

  // State variables
  isUnactive = false;
  employees: Employee[] = [];
  allEmployees: Employee[] = [];
  isEditMode = false;
  editForm!: FormGroup;
  isPopupOpen: boolean = false;
  currentEmployeeId: number | null = null;
  submitted = false;

  // Filter variables
  searchTerm: string = '';
  statusFilter: string = 'all';

  constructor(
    private headerService: HeaderService,
    private fb: FormBuilder, 
    private http: HttpClient
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      status: ['Active', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.headerService.isUnactive$.subscribe(state => {
      this.isUnactive = state;
    });
    
    this.getEmployees();
  }

  getEmployees() {
    this.http.get<Employee[]>(this.apiUrl).subscribe({
      next: data => {
        this.allEmployees = Array.isArray(data) ? data : [];
        this.applyFilters(); // Apply filters after loading data
      },
      error: err => console.error('Failed to fetch employees', err)
    });
  }

  // Apply both search and status filters
  applyFilters() {
    let filtered = [...this.allEmployees];

    // Apply search filter
    if (this.searchTerm && this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(emp => {
        const name = (emp.name || '').toLowerCase();
        const dept = (emp.department || '').toLowerCase();
        const date = (emp.date || '').toLowerCase();
        return name.includes(search) || 
               dept.includes(search) || 
               date.includes(search);
      });
    }

    // Apply status filter
    if (this.statusFilter && this.statusFilter !== 'all') {
      filtered = filtered.filter(emp => emp.status === this.statusFilter);
    }

    this.employees = filtered;
  }

  // Clear all filters and show all employees
  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.applyFilters();
  }

   // Delete employee
  deleteEmployee(id: number) {
      if (confirm('Are you sure you want to delete?')) {
          this.employees = this.employees.filter(emp => emp.id !== id);
      }
  }
 
 
  // Open popup to edit existing employee
  openEditPopup(employee: Employee) {
    this.isEditMode = true;
    this.currentEmployeeId = employee.id;
    this.editForm.patchValue({
      name: employee.name,
      department: employee.department,
      status: employee.status,
      date: employee.date
    });
    this.isPopupOpen = true;
  }

  // Open popup to add new employee
  openAddPopup() {
    this.isEditMode = false;
    this.currentEmployeeId = null;  
    this.editForm.reset({
      status: 'Active' // Default value
    });
    this.submitted = false;
    this.isPopupOpen = true;
  }

  // Save employee (add or edit)
  saveEdit() {
      if (this.editForm.invalid) {
        this.editForm.markAllAsTouched();
        return;
      }

      if (this.currentEmployeeId !== null) {
        //Edit employee
        const index = this.employees.findIndex(emp => emp.id === this.currentEmployeeId);
        if (index !== -1) {
          this.employees[index] = { id: this.currentEmployeeId, ...this.editForm.value };
        }
      } else {
        // Add  new employee
        const newId = this.employees.length > 0 ? Math.max(...this.employees.map(e => e.id)) + 1 : 1;
        this.employees.push({ id: newId, ...this.editForm.value });
      }

      this.isPopupOpen = false;
      this.currentEmployeeId = null;
       this.isEditMode = true,
      // Optional: Reset the form after adding
      this.editForm.reset();
  }

  // Close popup and reset form
  closePopup() {
    this.isPopupOpen = false;
    this.currentEmployeeId = null;
    this.isEditMode = false;
    this.submitted = false;
    this.editForm.reset();
  }
}